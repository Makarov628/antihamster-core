import Market from '../../../../domain/entities/market.entity';
import Trade, { TradeType } from '../../../../domain/entities/trade.entity';
import Timeframe from '../../../../domain/enums/timeframe.enum';
import Monitor from '../../../../infrastructure/market/monitoring/monitor'

const TradingView = require('@mathieuc/tradingview')


class TradingViewRealtimeMonitor extends Monitor {

    private currentTrade: Trade | null = null
    private lastTrade: Trade | null = null
    private chart: any

    private monitorIsWorking: boolean = false

    constructor(
        private antihamsterIndicator: any,
        market: Market,
        private client: any
    ) {
        super(market)
    }

    setup() {
        this.chart = new this.client.Session.Chart()

        this.chart.setMarket(this.market.ticker, {
            timeframe: this.market.timeframe,
        })
    }

    start(): Promise<void> {
        try {
            this.setup()
        } catch (error) {
            console.log(error)
            this.stop()
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            const chartIndicator = new this.chart.Study(this.antihamsterIndicator);
            
            chartIndicator.onError(reject);
            chartIndicator.onReady(resolve);
            chartIndicator.onUpdate(this.onChartUpdate(chartIndicator));
        }).then(() => {
            this.onChartReady()()
        }).catch((...err: any[]) => {
            this.onChartError()(...err)
        })
    }

    isWorking(): boolean {
        return this.monitorIsWorking
    }

    stop(): Promise<void> {
        if (this.chart) {
            this.chart.delete()
        }
        this.monitorIsWorking = false
        this.chart = null
        return Promise.resolve();
    }

    private onChartError() {
        return (...err: any[]) => {
            console.log('indicator', err)
            this.stop()
        }
    }

    private onChartReady() {
        return () => {
            this.monitorIsWorking = true
            this.emitMarketEvent('new_market', { market: this.market })
        }
    }

    private onChartUpdate(chartIndicator: any) {
        return (changes: any): void => {

            if (!changes.includes('report.trades'))
                return

            const last = chartIndicator.strategyReport.trades[1]
            const current = chartIndicator.strategyReport.trades[0]

            if (this.currentTrade === null && this.lastTrade === null) {
                this.updateLastAndCurrentTrade(last, current)
                return
            }

            if (this.currentTrade?.price != current.entry.value && this.currentTrade?.type != current.entry.type) {
                this.updateLastAndCurrentTrade(last, current)
                this.emitMarketEvent('new_trade', { market: this.market, trade: { last: this.lastTrade, new: this.currentTrade! } })
            }
        }
    }

    private updateLastAndCurrentTrade(last: any, current: any) {
        this.lastTrade = last ? new Trade(
            `${this.market.id}_${last.entry.time}`,
            last.entry.type as TradeType,
            null,
            new Date(last.entry.time),
            this.market.id,
            last.entry.value
        ) : null

        this.currentTrade = current ? new Trade(
            `${this.market.id}_${current.entry.time}`,
            current.entry.type as TradeType,
            this.lastTrade ? this.lastTrade.id : null,
            new Date(current.entry.time),
            this.market.id,
            current.entry.value
        ) : null
    }

}

export { TradingViewRealtimeMonitor }


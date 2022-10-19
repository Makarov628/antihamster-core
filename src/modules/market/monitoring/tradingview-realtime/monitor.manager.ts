import Market from '../../../../domain/entities/market.entity';
import { DomainEventEmitter } from '../../../../domain/events/domainEventEmitter';
import Monitor from '../../../../infrastructure/market/monitoring/monitor';
import MonitorManager from '../../../../infrastructure/market/monitoring/monitor.manager'
import { TradingViewRealtimeMonitor } from './monitor';

const TradingView = require('@mathieuc/tradingview')


class TradingViewRealtimeMonitorManager extends MonitorManager {

    private client: any;
    private indicator: any;
    private lostConnectionTimer?: NodeJS.Timer

    constructor(
        private _antihamsterStrategyId: string
    ) {
        super()
        this.createClient()
    }

    private createClient(): void {
        delete this.client
        this.client = null
 
        try {
            this.restartLostConnectionTimer()
            this.client = new TradingView.Client()

            this.client.onConnected(() => {
                console.log("TradingView Client connected!");
                this.reloadAllMonitors()
            });

            this.client.onDisconnected(() => {
                console.log("TradingView Client disconnected!");
                this.createClient()
            });

            this.client.onError((err:any) => {
                console.log(err)
            })

            this.client.onPing(() => {
                this.restartLostConnectionTimer()
            })

        } catch (error) {
            console.log(`[${(new Date()).toLocaleTimeString()}]:`, 'Client is not connected. Reason:', error)
        }
    }

    private restartLostConnectionTimer(): void {
        clearInterval(this.lostConnectionTimer)
        this.lostConnectionTimer = setInterval(() => {
            console.log(`[${(new Date()).toLocaleTimeString()}]:`, 'Connection is lost! Restarting.....')
            this.createClient()
        }, 30000)
    }

    private async reloadAllMonitors(): Promise<void> {
        const markets = this.getMonitoringMarkets()
        await Promise.all(markets.map(market => this.stopAndRemove(market.id)))
        this.appendAndStartMultiple(markets)
    }

    private async loadIndicator(): Promise<any> {
        if (!this.indicator)
            this.indicator = await TradingView.getIndicator(this._antihamsterStrategyId)

        return this.indicator
    }

    protected async create(market: Market): Promise<Monitor> {
        const indicator = await this.loadIndicator()
        return Promise.resolve(new TradingViewRealtimeMonitor(indicator, market, this.client))
    }

}

export { TradingViewRealtimeMonitorManager }
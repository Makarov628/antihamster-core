"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingViewRealtimeMonitor = void 0;
const trade_entity_1 = __importDefault(require("../../../../domain/entities/trade.entity"));
const monitor_1 = __importDefault(require("../../../../infrastructure/market/monitoring/monitor"));
const TradingView = require('@mathieuc/tradingview');
class TradingViewRealtimeMonitor extends monitor_1.default {
    antihamsterIndicator;
    client;
    currentTrade = null;
    lastTrade = null;
    chart;
    monitorIsWorking = false;
    constructor(antihamsterIndicator, market, client) {
        super(market);
        this.antihamsterIndicator = antihamsterIndicator;
        this.client = client;
    }
    setup() {
        this.chart = new this.client.Session.Chart();
        this.chart.setMarket(this.market.ticker, {
            timeframe: this.market.timeframe,
        });
    }
    start() {
        try {
            this.setup();
        }
        catch (error) {
            console.log(error);
            this.stop();
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            const chartIndicator = new this.chart.Study(this.antihamsterIndicator);
            chartIndicator.onError(reject);
            chartIndicator.onReady(resolve);
            chartIndicator.onUpdate(this.onChartUpdate(chartIndicator));
        }).then(() => {
            this.onChartReady()();
        }).catch((...err) => {
            this.onChartError()(...err);
        });
    }
    isWorking() {
        return this.monitorIsWorking;
    }
    stop() {
        if (this.chart) {
            this.chart.delete();
        }
        this.monitorIsWorking = false;
        this.chart = null;
        return Promise.resolve();
    }
    onChartError() {
        return (...err) => {
            console.log('indicator', err);
            this.stop();
        };
    }
    onChartReady() {
        return () => {
            this.monitorIsWorking = true;
            this.emitMarketEvent('new_market', { market: this.market });
        };
    }
    onChartUpdate(chartIndicator) {
        return (changes) => {
            if (!changes.includes('report.trades'))
                return;
            const last = chartIndicator.strategyReport.trades[1];
            const current = chartIndicator.strategyReport.trades[0];
            if (this.currentTrade === null && this.lastTrade === null) {
                this.updateLastAndCurrentTrade(last, current);
                return;
            }
            if (this.currentTrade?.price != current.entry.value && this.currentTrade?.type != current.entry.type) {
                this.updateLastAndCurrentTrade(last, current);
                this.emitMarketEvent('new_trade', { market: this.market, trade: { last: this.lastTrade, new: this.currentTrade } });
            }
        };
    }
    updateLastAndCurrentTrade(last, current) {
        this.lastTrade = last ? new trade_entity_1.default(`${this.market.id}_${last.entry.time}`, last.entry.type, null, new Date(last.entry.time), this.market.id, last.entry.value) : null;
        this.currentTrade = current ? new trade_entity_1.default(`${this.market.id}_${current.entry.time}`, current.entry.type, this.lastTrade ? this.lastTrade.id : null, new Date(current.entry.time), this.market.id, current.entry.value) : null;
    }
}
exports.TradingViewRealtimeMonitor = TradingViewRealtimeMonitor;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingViewRealtimeMonitorManager = void 0;
const monitor_manager_1 = __importDefault(require("../../../../infrastructure/market/monitoring/monitor.manager"));
const monitor_1 = require("./monitor");
const TradingView = require('@mathieuc/tradingview');
class TradingViewRealtimeMonitorManager extends monitor_manager_1.default {
    _antihamsterStrategyId;
    client;
    indicator;
    lostConnectionTimer;
    constructor(_antihamsterStrategyId) {
        super();
        this._antihamsterStrategyId = _antihamsterStrategyId;
        this.createClient();
    }
    createClient() {
        delete this.client;
        this.client = null;
        try {
            this.restartLostConnectionTimer();
            this.client = new TradingView.Client();
            this.client.onConnected(() => {
                console.log("TradingView Client connected!");
                this.reloadAllMonitors();
            });
            this.client.onDisconnected(() => {
                console.log("TradingView Client disconnected!");
                this.createClient();
            });
            this.client.onError((err) => {
                console.log(err);
            });
            this.client.onPing(() => {
                this.restartLostConnectionTimer();
            });
        }
        catch (error) {
            console.log(`[${(new Date()).toLocaleTimeString()}]:`, 'Client is not connected. Reason:', error);
        }
    }
    restartLostConnectionTimer() {
        clearInterval(this.lostConnectionTimer);
        this.lostConnectionTimer = setInterval(() => {
            console.log(`[${(new Date()).toLocaleTimeString()}]:`, 'Connection is lost! Restarting.....');
            this.createClient();
        }, 30000);
    }
    async reloadAllMonitors() {
        const markets = this.getMonitoringMarkets();
        await Promise.all(markets.map(market => this.stopAndRemove(market.id)));
        this.appendAndStartMultiple(markets);
    }
    async loadIndicator() {
        if (!this.indicator)
            this.indicator = await TradingView.getIndicator(this._antihamsterStrategyId);
        return this.indicator;
    }
    async create(market) {
        const indicator = await this.loadIndicator();
        return Promise.resolve(new monitor_1.TradingViewRealtimeMonitor(indicator, market, this.client));
    }
}
exports.TradingViewRealtimeMonitorManager = TradingViewRealtimeMonitorManager;

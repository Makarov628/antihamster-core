"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
const market_repository_1 = require("./modules/storage/inmemory/market.repository");
const tradingview_1 = require("./modules/market/search/tradingview");
const monitor_manager_1 = require("./modules/market/monitoring/tradingview-realtime/monitor.manager");
const market_service_1 = require("./usecases/market.service");
const configure = (options) => {
    if (!options.antihamsterId)
        throw new Error('You need Antihamster strategy id for TradingView');
    const marketService = new market_service_1.MarketService(options.marketRepository ?? new market_repository_1.InMemoryMarketRepository(), options.marketMonitorManager ?? new monitor_manager_1.TradingViewRealtimeMonitorManager(options.antihamsterId), options.marketSearch ?? new tradingview_1.TradingViewMarketSearch());
    return {
        market: marketService
    };
};
exports.configure = configure;

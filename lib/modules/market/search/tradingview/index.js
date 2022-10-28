"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingViewMarketSearch = void 0;
const search_1 = require("../../../../infrastructure/market/search");
const TradingView = require('@mathieuc/tradingview');
class TradingViewMarketSearch extends search_1.MarketSearch {
    async findByTicker(query) {
        try {
            const markets = await TradingView.searchMarket(query);
            return markets.map((market) => ({
                ticker: market.id,
                description: market.description,
                exchangeName: market.exchange,
                symbol: market.symbol
            }));
        }
        catch (error) {
            return [];
        }
    }
}
exports.TradingViewMarketSearch = TradingViewMarketSearch;

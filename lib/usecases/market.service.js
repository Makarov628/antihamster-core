"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketService = void 0;
class MarketService {
    marketRepository;
    monitoringManager;
    marketSearch;
    constructor(marketRepository, monitoringManager, marketSearch) {
        this.marketRepository = marketRepository;
        this.monitoringManager = monitoringManager;
        this.marketSearch = marketSearch;
    }
    async launchMonitoring() {
        const markets = await this.marketRepository.getList();
        await this.monitoringManager.appendAndStartMultiple(markets);
    }
    async addToMonitoring(marketDto) {
        const existingMarket = await this.marketRepository.getBy(marketDto.ticker, marketDto.timeframe);
        if (!existingMarket) {
            const newMarket = await this.marketRepository.createAndAppend(marketDto);
            await this.monitoringManager.appendAndStart(newMarket);
            return Promise.resolve();
        }
    }
    async removeFromMonitoring(marketId) {
        await this.monitoringManager.stopAndRemove(marketId);
        await this.marketRepository.delete(marketId);
    }
    async getMonitoringMarkets() {
        return await this.monitoringManager.getMonitoringMarkets();
    }
    async searchMarket(query) {
        return await this.marketSearch.findByTicker(query);
    }
}
exports.MarketService = MarketService;

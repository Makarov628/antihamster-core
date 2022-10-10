import Market from "../domain/entities/market.entity";
import { ICreateMarketDto } from "../domain/repositories/dtos/market.dto";
import MarketRepository from "../domain/repositories/market.repository";
import MonitorManager from "../infrastructure/market/monitoring/monitor.manager";


class MarketService {
    constructor(
        private marketRepository: MarketRepository,
        private monitoringManager: MonitorManager
    ) { }

    async launchMonitoring(): Promise<void> {
        const markets = await this.marketRepository.getList()
        await this.monitoringManager.appendAndStartMultiple(markets)
    }

    async addToMonitoring(marketDto: ICreateMarketDto): Promise<void> {
        const existingMarket = await this.marketRepository.getBy(marketDto.ticker, marketDto.timeframe)
        if (!existingMarket) {
            const newMarket = await this.marketRepository.createAndAppend(marketDto)
            await this.monitoringManager.appendAndStart(newMarket)
            return Promise.resolve()
        }
    }

    async removeFromMonitoring(marketId: string): Promise<void> {
        await this.monitoringManager.stopAndRemove(marketId)
        await this.marketRepository.delete(marketId)
    }

    async getMonitoringMarkets(): Promise<Market[]> {
        return await this.monitoringManager.getMonitoringMarkets()
    }

}

export { MarketService }
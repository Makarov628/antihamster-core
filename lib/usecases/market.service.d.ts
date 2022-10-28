import Market from "../domain/entities/market.entity";
import { ICreateMarketDto } from "../domain/repositories/dtos/market.dto";
import MarketRepository from "../domain/repositories/market.repository";
import MonitorManager from "../infrastructure/market/monitoring/monitor.manager";
import { MarketSearch, IMarketSearchResult } from '../infrastructure/market/search';
declare class MarketService {
    private marketRepository;
    private monitoringManager;
    private marketSearch;
    constructor(marketRepository: MarketRepository, monitoringManager: MonitorManager, marketSearch: MarketSearch);
    launchMonitoring(): Promise<void>;
    addToMonitoring(marketDto: ICreateMarketDto): Promise<void>;
    removeFromMonitoring(marketId: string): Promise<void>;
    getMonitoringMarkets(): Promise<Market[]>;
    searchMarket(query: string): Promise<IMarketSearchResult[]>;
}
export { MarketService };
//# sourceMappingURL=market.service.d.ts.map
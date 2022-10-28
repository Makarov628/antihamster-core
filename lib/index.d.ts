import MonitorManager from "./infrastructure/market/monitoring/monitor.manager";
import { MarketSearch } from "./infrastructure/market/search";
import { MarketService } from "./usecases/market.service";
import MarketRepository from "./domain/repositories/market.repository";
import TradeRepository from "./domain/repositories/trade.repository";
interface IAntihamsterApp {
    market: MarketService;
}
interface IConfigureOptions {
    antihamsterId: string;
    marketRepository?: MarketRepository;
    tradeRepository?: TradeRepository;
    marketMonitorManager?: MonitorManager;
    marketSearch?: MarketSearch;
}
declare const configure: (options: IConfigureOptions) => IAntihamsterApp;
export { configure };
//# sourceMappingURL=index.d.ts.map
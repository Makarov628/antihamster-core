import MonitorManager from "./infrastructure/market/monitoring/monitor.manager"
import { MarketSearch } from "./infrastructure/market/search"

import { InMemoryMarketRepository } from "./modules/storage/inmemory/market.repository"
import { TradingViewMarketSearch } from './modules/market/search/tradingview'
import { TradingViewRealtimeMonitorManager } from './modules/market/monitoring/tradingview-realtime/monitor.manager'


import { MarketService } from "./usecases/market.service"
import MarketRepository from "./domain/repositories/market.repository"
import TradeRepository from "./domain/repositories/trade.repository"
import { DomainEventEmitter } from "./domain/events/domainEventEmitter"

interface IAntihamsterApp {
    market: MarketService
}
interface IConfigureOptions {
    antihamsterId: string,
    marketRepository?: MarketRepository,
    tradeRepository?: TradeRepository,
    marketMonitorManager?: MonitorManager,
    marketSearch?: MarketSearch
}

const configure = (options: IConfigureOptions): IAntihamsterApp => {

    if (!options.antihamsterId) 
        throw new Error('You need Antihamster strategy id for TradingView')

    const marketService = new MarketService(
        options.marketRepository ?? new InMemoryMarketRepository(),
        options.marketMonitorManager ?? new TradingViewRealtimeMonitorManager(options.antihamsterId),
        options.marketSearch ?? new TradingViewMarketSearch()
    )

    return {
        market: marketService
    }
}

export { 
    configure
}
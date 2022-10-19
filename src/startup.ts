import Market from "./domain/entities/market.entity"

import Monitor from "./infrastructure/market/monitoring/monitor"
import MonitorManager from "./infrastructure/market/monitoring/monitor.manager"
import { MarketSearch } from "./infrastructure/market/search"

import { InMemoryMarketRepository } from "./modules/storage/inmemory/market.repository"
import { TradingViewMarketSearch } from './modules/market/search/tradingview'
import { TradingViewRealtimeMonitorManager } from './modules/market/monitoring/tradingview-realtime/monitor.manager'


import { MarketService } from "./usecases/market.service"


interface IAntihamsterApp {
    market: MarketService
}



const configureDefault = (): IAntihamsterApp => {
    const marketRepository = new InMemoryMarketRepository()
    const marketMonitoringManager = new TradingViewRealtimeMonitorManager("PUB;fbf6b90f012c4d7a90fd678223cc9f40")
    const marketSearch = new TradingViewMarketSearch()
    
    const marketService = new MarketService(
        marketRepository, 
        marketMonitoringManager,
        marketSearch
    )

    return {
        market: marketService
    }
}

export { configureDefault }
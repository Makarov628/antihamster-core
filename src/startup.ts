import Market from "./domain/entities/market.entity"
import Monitor from "./infrastructure/market/monitoring/monitor"
import MonitorManager from "./infrastructure/market/monitoring/monitor.manager"
import { InMemoryMarketRepository } from "./modules/storage/inmemory/market.repository"
import { MarketService } from "./usecases/market.service"

interface IAntihamsterApp {
    market: MarketService
}


class MockTradingViewMonitor extends Monitor {

    private isMonitorWorking: boolean = false

    constructor(market: Market) {
        super(market)
    }

    start(): Promise<void> {
        console.log(`Started ${this.market.ticker} for ${this.market.timeframe}`)
        this.isMonitorWorking = true
        return Promise.resolve()
    }
    isWorking(): boolean {
        return this.isMonitorWorking
    }
    stop(): Promise<void> {
        console.log(`Stoped ${this.market.ticker} for ${this.market.timeframe}`)
        this.isMonitorWorking = false
        return Promise.resolve()
    }

}

class TradingViewMonitorManager extends MonitorManager {
    protected create(market: Market): Promise<Monitor> {
        return Promise.resolve(new MockTradingViewMonitor(market));
    }
}

const configureDefault = (): IAntihamsterApp => {
    const marketRepository = new InMemoryMarketRepository()
    const marketMonitoringManager = new TradingViewMonitorManager()
    const marketService = new MarketService(marketRepository, marketMonitoringManager)

    return {
        market: marketService
    }
}

export { configureDefault }
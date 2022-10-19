import Market from "../../../domain/entities/market.entity"
import Trade from "../../../domain/entities/trade.entity"
import { DomainEventEmitter, MarketEvents } from "../../../domain/events/domainEventEmitter"

abstract class Monitor {
    
    constructor(
        public market: Market
    ) {}

    protected trades: Trade[] = []

    abstract start(): Promise<void>
    abstract isWorking(): boolean
    abstract stop(): Promise<void>
    
    // FIXME: not good type mapping
    protected emitMarketEvent(eventName: keyof MarketEvents, value: MarketEvents[keyof MarketEvents]) { 
        DomainEventEmitter.instance.emit(eventName, value)
    }

}
export default Monitor
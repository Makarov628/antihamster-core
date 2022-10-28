import Market from "../../../domain/entities/market.entity";
import Trade from "../../../domain/entities/trade.entity";
import { MarketEvents } from "../../../domain/events/domainEventEmitter";
declare abstract class Monitor {
    market: Market;
    constructor(market: Market);
    protected trades: Trade[];
    abstract start(): Promise<void>;
    abstract isWorking(): boolean;
    abstract stop(): Promise<void>;
    protected emitMarketEvent(eventName: keyof MarketEvents, value: MarketEvents[keyof MarketEvents]): void;
}
export default Monitor;
//# sourceMappingURL=monitor.d.ts.map
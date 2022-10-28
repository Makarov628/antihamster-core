import Market from '../entities/market.entity';
import Trade from '../entities/trade.entity';
import { TypeSafeEventEmitter } from '../utils/typeSafeEventEmitter';
declare type ExchangeEvents = {
    'deal_closed': number;
};
declare type MarketEvents = {
    'new_trade': {
        market: Market;
        trade: {
            last: Trade | null;
            new: Trade;
        };
    };
    'new_market': {
        market: Market;
    };
};
declare type Events = MarketEvents & ExchangeEvents;
declare class DomainEventEmitter {
    static readonly instance: TypeSafeEventEmitter<Events>;
}
export { DomainEventEmitter, MarketEvents, ExchangeEvents };
//# sourceMappingURL=domainEventEmitter.d.ts.map
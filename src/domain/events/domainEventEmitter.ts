import { EventEmitter } from 'node:events';
import Market from '../entities/market.entity';
import Trade from '../entities/trade.entity';
import { TypeSafeEventEmitter } from '../utils/typeSafeEventEmitter';

type ExchangeEvents = {
    'deal_closed': number
}

type MarketEvents = {
    'new_trade': { market: Market, trade: { last: Trade | null, new: Trade } }
    'new_market': { market: Market }
}

type Events = MarketEvents & ExchangeEvents

class DomainEventEmitter {
    public static readonly instance: TypeSafeEventEmitter<Events> = new EventEmitter();
}

export { DomainEventEmitter, MarketEvents, ExchangeEvents }
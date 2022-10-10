import { EventEmitter } from 'node:events';
import Trade from '../entities/trade.entity';
import { TypeSafeEventEmitter } from '../utils/typeSafeEventEmitter';

type ExchangeEvents = {
    'deal_closed': number
}

type MarketEvents = {
    'new_trade': { last: Trade | undefined, new: Trade }
    'test': string
    'test2': number
}

type Events = MarketEvents & ExchangeEvents

class DomainEventEmitter {
    private static _instance: TypeSafeEventEmitter<Events>;

    private constructor() { }

    public static get instance(): TypeSafeEventEmitter<Events> {
        if (!DomainEventEmitter._instance) {
            DomainEventEmitter._instance = new EventEmitter();
        }

        return DomainEventEmitter.instance;
    }
}

export { DomainEventEmitter, MarketEvents, ExchangeEvents }
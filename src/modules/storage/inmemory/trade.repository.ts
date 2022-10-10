import { table } from "console";
import Trade from "../../../domain/entities/trade.entity";
import TradeRepository from "../../../domain/repositories/trade.repository";

class InMemoryTradeRepository extends TradeRepository {

    private _trades: Trade[] = [];

    constructor() {
        super()
    }

    getCurrent(marketId: string): Promise<Trade | undefined> {
        return Promise.resolve(this._trades.filter(t => t.marketId == marketId).at(-1))
    }
    getLastAndCurrent(marketId: string): Promise<[Trade | undefined, Trade | undefined]> {
        const [last, current] = this._trades.filter(t => t.marketId == marketId).slice(-2)
        return Promise.resolve([last, current])
    }
    getList(marketId: string): Promise<Trade[]> {
        return Promise.resolve(this._trades.filter(t => t.marketId == marketId))
    }
    append(newTrade: Trade): Promise<void> {
        this._trades.push(newTrade)
        return Promise.resolve()
    }
    appendBulk(trades: Trade[]): Promise<void> {
        this._trades.push(...trades)
        return Promise.resolve()
    }
    delete(trade: Trade): Promise<void> {
        this._trades = this._trades.filter(t => trade.id === t.id)
        return Promise.resolve()
    }

}

export { InMemoryTradeRepository };
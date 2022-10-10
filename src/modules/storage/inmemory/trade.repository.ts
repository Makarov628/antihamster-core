import Trade from "../../../domain/entities/trade.entity";
import TradeRepository from "../../../domain/repositories/trade.repository";

class InMemoryTradeRepository extends TradeRepository {

    private _trades: Trade[] = [];

    constructor() {
        super()
    }

    getCurrent(marketId: string): Promise<Trade | null> {
        return new Promise((resolve, reject) => {
            const trade = this._trades.filter(t => t.marketId == marketId).at(-1)
            resolve(trade ?? null)
        })
    }
    getLastAndCurrent(marketId: string): Promise<[Trade, Trade]> {
        return new Promise((resolve, reject) => {
           const [last, current] = this._trades.filter(t => t.marketId == marketId).slice(-2)
           resolve([last ?? null, current ?? null])
        })
    }
    getList(marketId: string): Promise<Trade[]> {
        return new Promise((resolve, reject) => {
            resolve(this._trades.filter(t => t.marketId == marketId))
        })
    }
    append(newTrade: Trade): Promise<void> {
        return new Promise((resolve, reject) => {
            this._trades.push(newTrade)
            resolve()
        })
    }
    appendBulk(trades: Trade[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this._trades.push(...trades)
            resolve();
        })
    }
    delete(trade: Trade): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export default InMemoryTradeRepository;
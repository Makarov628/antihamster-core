import Trade from "../../../domain/entities/trade.entity";
import TradeRepository from "../../../domain/repositories/trade.repository";
declare class InMemoryTradeRepository extends TradeRepository {
    private _trades;
    constructor();
    getCurrent(marketId: string): Promise<Trade | undefined>;
    getLastAndCurrent(marketId: string): Promise<[Trade | undefined, Trade | undefined]>;
    getList(marketId: string): Promise<Trade[]>;
    append(newTrade: Trade): Promise<void>;
    appendBulk(trades: Trade[]): Promise<void>;
    delete(trade: Trade): Promise<void>;
}
export { InMemoryTradeRepository };
//# sourceMappingURL=trade.repository.d.ts.map
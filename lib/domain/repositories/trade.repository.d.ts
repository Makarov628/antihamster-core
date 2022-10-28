import Trade from "../entities/trade.entity";
declare abstract class TradeRepository {
    abstract getCurrent(marketId: string): Promise<Trade | undefined>;
    abstract getLastAndCurrent(marketId: string): Promise<[Trade | undefined, Trade | undefined]>;
    abstract getList(marketId: string): Promise<Trade[]>;
    abstract append(newTrade: Trade): Promise<void>;
    abstract appendBulk(trades: Trade[]): Promise<void>;
    abstract delete(trade: Trade): Promise<void>;
}
export default TradeRepository;
//# sourceMappingURL=trade.repository.d.ts.map
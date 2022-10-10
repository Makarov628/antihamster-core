import Market from "../entities/market.entity";

abstract class MarketRepository {
    abstract getList(): Promise<Market[]>;
    abstract get(marketId: number): Promise<Market | undefined>;
    abstract append(market: Market): Promise<void>;
    abstract delete(marketId: number): Promise<void>;
}

export default MarketRepository;
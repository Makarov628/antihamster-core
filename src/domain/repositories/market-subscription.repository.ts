import MarketSubscription from "../entities/market-subscription.entity";


abstract class MarketSubscriptionRepository {

    abstract getListByUser(userId: string): Promise<MarketSubscription[]>;
    abstract getListByMarket(marketId: string): Promise<MarketSubscription[]>;
    abstract get(userId: string, marketId: string): Promise<MarketSubscription | undefined>

    abstract create(userId: string, marketId: string): Promise<void>;
    abstract update(subscription: MarketSubscription): Promise<void>;
    abstract delete(marketSubscriptionId: string): Promise<void>;

}

export default MarketSubscriptionRepository
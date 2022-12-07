import Market from "../entities/market.entity";
import Timeframe from "../enums/timeframe.enum";
import { ICreateMarketDto } from "./dtos/market.dto";

abstract class MarketRepository {
    abstract getList(): Promise<Market[]>;
    abstract get(marketId: string): Promise<Market | undefined>;
    abstract getBy(ticker: string, timeframe: Timeframe): Promise<Market | undefined>;
    
    abstract createAndAppend(market: ICreateMarketDto): Promise<Market>;
    abstract delete(marketId: string): Promise<void>;
}

export default MarketRepository;
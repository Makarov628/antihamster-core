
import { time } from "console";
import Market from "../../../domain/entities/market.entity";
import Timeframe from "../../../domain/enums/timeframe.enum";
import { ICreateMarketDto } from "../../../domain/repositories/dtos/market.dto";
import MarketRepository from "../../../domain/repositories/market.repository";

class InMemoryMarketRepository extends MarketRepository {
    
    private _markets: Market[] = [];
    
    constructor() {
        super()
    }
    
    getList(): Promise<Market[]> {
        return Promise.resolve(this._markets)
    }
    get(marketId: string): Promise<Market | undefined> {
        return Promise.resolve(this._markets.find(market => market.id === marketId))
    }
    getBy(ticker: string, timeframe: Timeframe): Promise<Market | undefined> {
        return Promise.resolve(this._markets.find(market => market.ticker === ticker && market.timeframe === timeframe))
    }
    createAndAppend(marketDto: ICreateMarketDto): Promise<Market> {
        const newMarket = new Market(
            '', 
            marketDto.ticker, 
            marketDto.symbol,
            marketDto.exchangeName, 
            marketDto.description, 
            marketDto.timeframe
        )
        this._markets.push(newMarket)
        return Promise.resolve(newMarket)
    }
    delete(marketId: string): Promise<void> {
        this._markets = this._markets.filter(market => market.id == marketId)
        return Promise.resolve()
    }

}

export { InMemoryMarketRepository }
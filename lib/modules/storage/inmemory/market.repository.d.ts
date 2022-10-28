import Market from "../../../domain/entities/market.entity";
import Timeframe from "../../../domain/enums/timeframe.enum";
import { ICreateMarketDto } from "../../../domain/repositories/dtos/market.dto";
import MarketRepository from "../../../domain/repositories/market.repository";
declare class InMemoryMarketRepository extends MarketRepository {
    private _markets;
    constructor();
    getList(): Promise<Market[]>;
    get(marketId: string): Promise<Market | undefined>;
    getBy(ticker: string, timeframe: Timeframe): Promise<Market | undefined>;
    createAndAppend(marketDto: ICreateMarketDto): Promise<Market>;
    delete(marketId: string): Promise<void>;
}
export { InMemoryMarketRepository };
//# sourceMappingURL=market.repository.d.ts.map
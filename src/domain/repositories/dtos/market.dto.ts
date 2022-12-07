import Risk from "../../enums/risk.enum";
import Timeframe from "../../enums/timeframe.enum";

interface ICreateMarketDto {
    ticker: string,
    symbol: string,
    exchangeName: string | null,
    description: string,
    timeframe: Timeframe,
    risk: Risk | null
}

export {
    ICreateMarketDto
}
import Timeframe from "../../enums/timeframe.enum";

interface ICreateMarketDto {
    ticker: string,
    symbol: string,
    exchangeName: string | null,
    description: string,
    timeframe: Timeframe
}

export {
    ICreateMarketDto
}
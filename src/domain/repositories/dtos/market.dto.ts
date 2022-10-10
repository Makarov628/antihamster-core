import Timeframe from "../../enums/timeframe.enum";

interface ICreateMarketDto {
    ticker: string,
    name: string,
    timeframe: Timeframe
}

export {
    ICreateMarketDto
}
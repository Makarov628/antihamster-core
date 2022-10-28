import Timeframe from "../enums/timeframe.enum";
declare class Market {
    readonly id: string;
    readonly ticker: string;
    readonly symbol: string;
    readonly exchangeName: string | null;
    readonly description: string;
    readonly timeframe: Timeframe;
    constructor(_id: string, _ticker: string, _symbol: string, _exchangeName: string | null, _description: string, _timeframe: Timeframe);
}
export default Market;
//# sourceMappingURL=market.entity.d.ts.map
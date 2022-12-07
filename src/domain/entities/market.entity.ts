import Risk from "../enums/risk.enum";
import Timeframe from "../enums/timeframe.enum";

class Market {

    public readonly id: string
    public readonly ticker: string;
    public readonly symbol: string;
    public readonly exchangeName: string | null;
    public readonly description: string;
    public readonly timeframe: Timeframe;
    public readonly risk: Risk | null;

    constructor(
        _id: string,
        _ticker: string,
        _symbol: string,
        _exchangeName: string | null,
        _description: string,
        _timeframe: Timeframe,
        _risk: Risk | null
    ) {
        this.id = _id == '' ? `${_ticker}_${_timeframe}` : _id;
        this.ticker = _ticker
        this.symbol = _symbol
        this.exchangeName = _exchangeName
        this.description = _description
        this.timeframe = _timeframe
        this.risk = _risk
    }

}

export default Market;
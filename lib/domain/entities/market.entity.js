"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Market {
    id;
    ticker;
    symbol;
    exchangeName;
    description;
    timeframe;
    constructor(_id, _ticker, _symbol, _exchangeName, _description, _timeframe) {
        this.id = _id == '' ? `${_ticker}_${_timeframe}` : _id;
        this.ticker = _ticker;
        this.symbol = _symbol;
        this.exchangeName = _exchangeName;
        this.description = _description;
        this.timeframe = _timeframe;
    }
}
exports.default = Market;

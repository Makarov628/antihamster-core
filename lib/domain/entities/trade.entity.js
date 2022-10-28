"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trade = void 0;
class Trade {
    _id;
    _type;
    _lastTradeId;
    _date;
    _marketId;
    _price;
    get id() {
        return this._id === '' ? `${this._marketId}_${this._price}_${this._date.getTime()}` : this._id;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get lastTradeId() {
        return this._lastTradeId;
    }
    set lastTradeId(value) {
        this._lastTradeId = value;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }
    get marketId() {
        return this._marketId;
    }
    set marketId(value) {
        this._marketId = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    constructor(_id, _type, _lastTradeId, _date, _marketId, _price) {
        this._id = _id;
        this._type = _type;
        this._lastTradeId = _lastTradeId;
        this._date = _date;
        this._marketId = _marketId;
        this._price = _price;
    }
}
exports.Trade = Trade;
exports.default = Trade;

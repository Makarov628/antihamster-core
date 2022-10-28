"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryTradeRepository = void 0;
const trade_repository_1 = __importDefault(require("../../../domain/repositories/trade.repository"));
class InMemoryTradeRepository extends trade_repository_1.default {
    _trades = [];
    constructor() {
        super();
    }
    getCurrent(marketId) {
        return Promise.resolve(this._trades.filter(t => t.marketId == marketId).at(-1));
    }
    getLastAndCurrent(marketId) {
        const [last, current] = this._trades.filter(t => t.marketId == marketId).slice(-2);
        return Promise.resolve([last, current]);
    }
    getList(marketId) {
        return Promise.resolve(this._trades.filter(t => t.marketId == marketId));
    }
    append(newTrade) {
        this._trades.push(newTrade);
        return Promise.resolve();
    }
    appendBulk(trades) {
        this._trades.push(...trades);
        return Promise.resolve();
    }
    delete(trade) {
        this._trades = this._trades.filter(t => trade.id === t.id);
        return Promise.resolve();
    }
}
exports.InMemoryTradeRepository = InMemoryTradeRepository;

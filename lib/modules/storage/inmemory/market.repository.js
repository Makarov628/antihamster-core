"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryMarketRepository = void 0;
const market_entity_1 = __importDefault(require("../../../domain/entities/market.entity"));
const market_repository_1 = __importDefault(require("../../../domain/repositories/market.repository"));
class InMemoryMarketRepository extends market_repository_1.default {
    _markets = [];
    constructor() {
        super();
    }
    getList() {
        return Promise.resolve(this._markets);
    }
    get(marketId) {
        return Promise.resolve(this._markets.find(market => market.id === marketId));
    }
    getBy(ticker, timeframe) {
        return Promise.resolve(this._markets.find(market => market.ticker === ticker && market.timeframe === timeframe));
    }
    createAndAppend(marketDto) {
        const newMarket = new market_entity_1.default('', marketDto.ticker, marketDto.symbol, marketDto.exchangeName, marketDto.description, marketDto.timeframe);
        this._markets.push(newMarket);
        return Promise.resolve(newMarket);
    }
    delete(marketId) {
        this._markets = this._markets.filter(market => market.id == marketId);
        return Promise.resolve();
    }
}
exports.InMemoryMarketRepository = InMemoryMarketRepository;

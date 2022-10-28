declare type TradeType = 'long' | 'short';
declare class Trade {
    private _id;
    private _type;
    private _lastTradeId;
    private _date;
    private _marketId;
    private _price;
    get id(): string;
    get type(): TradeType;
    set type(value: TradeType);
    get lastTradeId(): string | null;
    set lastTradeId(value: string | null);
    get date(): Date;
    set date(value: Date);
    get marketId(): string;
    set marketId(value: string);
    get price(): number;
    set price(value: number);
    constructor(_id: string, _type: TradeType, _lastTradeId: string | null, _date: Date, _marketId: string, _price: number);
}
export default Trade;
export { Trade, TradeType };
//# sourceMappingURL=trade.entity.d.ts.map
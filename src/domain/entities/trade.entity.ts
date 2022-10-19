type TradeType = 'long' | 'short';

class Trade {
    
    public get id(): string {
        return this._id === '' ? `${this._marketId}_${this._price}_${this._date.getTime()}`: this._id;
    }
    
    public get type(): TradeType {
        return this._type;
    }
    public set type(value: TradeType) {
        this._type = value;
    }
    
    public get lastTradeId(): string | null {
        return this._lastTradeId;
    }
    public set lastTradeId(value: string | null) {
        this._lastTradeId = value;
    }

    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }

    public get marketId(): string {
        return this._marketId;
    }
    public set marketId(value: string) {
        this._marketId = value;
    }

    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }

    constructor(
        private _id: string,
        private _type: TradeType,
        private _lastTradeId: string | null,
        private _date: Date,
        private _marketId: string,
        private _price: number,
    ) {}
    
}

export default Trade
export { Trade, TradeType }
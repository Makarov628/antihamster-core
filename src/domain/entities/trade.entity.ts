type TradeType = 'long' | 'short';

class Trade {

    public get id(): string {
        return this._id ?? `${this._marketId}_${this._price}_${this._date.getTime()}`;
    }

    constructor(
        private _id: string | null,
        private _type: TradeType,
        private _lastTradeId: string | null,
        private _date: Date,
        private _marketId: string,
        private _price: number,
    ) {}
    
}

export default Trade
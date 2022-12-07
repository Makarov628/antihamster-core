
class MarketSubscription {

    public readonly id: string
    public readonly userId: string
    public readonly marketId: string

    constructor(
        _id: string,
        _userId: string,
        _marketId: string
    ) {
        this.id = _id == '' ? `${_userId}_${_marketId}` : _id
        this.userId = _userId
        this.marketId = _marketId
    }
}

export default MarketSubscription
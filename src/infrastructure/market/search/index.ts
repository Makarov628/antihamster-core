import { Url } from "url"

interface IMarketSearchResult {
    ticker: string,
    symbol: string,
    exchangeName: string | null,
    description: string,
    currencyLogoUrl?: Url,
    exchangeLogoUrl?: Url
}

abstract class MarketSearch {
    constructor() {}

    abstract findByTicker(query: string) : Promise<IMarketSearchResult[]>
}

export { MarketSearch, IMarketSearchResult }
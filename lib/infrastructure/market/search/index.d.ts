/// <reference types="node" />
import { Url } from "url";
interface IMarketSearchResult {
    ticker: string;
    symbol: string;
    exchangeName: string | null;
    description: string;
    currencyLogoUrl?: Url;
    exchangeLogoUrl?: Url;
}
declare abstract class MarketSearch {
    constructor();
    abstract findByTicker(query: string): Promise<IMarketSearchResult[]>;
}
export { MarketSearch, IMarketSearchResult };
//# sourceMappingURL=index.d.ts.map
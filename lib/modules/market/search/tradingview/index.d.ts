import { MarketSearch, IMarketSearchResult } from '../../../../infrastructure/market/search';
declare class TradingViewMarketSearch extends MarketSearch {
    findByTicker(query: string): Promise<IMarketSearchResult[]>;
}
export { TradingViewMarketSearch };
//# sourceMappingURL=index.d.ts.map
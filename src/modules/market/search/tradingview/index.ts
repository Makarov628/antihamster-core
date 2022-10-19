import { MarketSearch, IMarketSearchResult } from '../../../../infrastructure/market/search'
const TradingView = require('@mathieuc/tradingview')

class TradingViewMarketSearch extends MarketSearch {
    async findByTicker(query: string): Promise<IMarketSearchResult[]> {
        try {
            const markets = await TradingView.searchMarket(query); 
            return markets.map((market: any): IMarketSearchResult => ({
                ticker: market.id as string,
                description: market.description as string,
                exchangeName: market.exchange as string | null,
                symbol: market.symbol as string
            }));
            
        } catch (error) {
            return []
        }
    }
}

export { TradingViewMarketSearch }
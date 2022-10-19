import Timeframe from "./domain/enums/timeframe.enum";
import { DomainEventEmitter } from "./domain/events/domainEventEmitter";
import { configureDefault } from "./startup";

const app = configureDefault()

const start = async () => {


    DomainEventEmitter.instance.on('new_market', (args) => {
        console.log(`${args.market.ticker} on '${args.market.timeframe}' timeframe is connected!`)
    })

    DomainEventEmitter.instance.on('new_trade', (args) => {
        console.log()
        console.log(`${args.market.ticker} on ${args.market.timeframe}`)
        console.log(`New Trade: ${args.trade.new.type}_${args.trade.new.price}`)
        console.log(`Old Trade: ${args.trade.last?.type}_${args.trade.last?.price}`)
    })


    const findedMarkets = await app.market.searchMarket('BINANCE:')

    let counter = 0
    for (const timeframe of Object.values(Timeframe).filter(v => v != Timeframe["M"] &&  v != Timeframe["W"] &&  v != Timeframe["D"])) {
        for (let i = 0; i < findedMarkets.length; i++) {
            const findedMarket = findedMarkets[i];
            try {
                await app.market.addToMonitoring({
                    ticker: findedMarket.ticker,
                    symbol: findedMarket.symbol,
                    description: findedMarket.description,
                    exchangeName: findedMarket.exchangeName,
                    timeframe: timeframe
                })
                counter += 1
            } catch (error) {
                console.log(error)
            }
        }
    }
    console.log(counter)





}

start()

// TODO: 
// 
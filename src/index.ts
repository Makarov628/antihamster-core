import Timeframe from "./domain/enums/timeframe.enum";
import { configureDefault } from "./startup";


const app = configureDefault()

const start = async () => {
    await app.market.launchMonitoring()
    await app.market.addToMonitoring({ name: 'Test', ticker: 'BTCUSD', timeframe: Timeframe["4H"] })
}

start()
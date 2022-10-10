import Market from '../../domain/entities/market.entity'
import Monitor from './monitor'

abstract class MonitorManager {

    protected monitors: Monitor[] = []

    protected abstract create(market: Market): Promise<Monitor>

    protected get(marketId: number): Monitor | undefined {
        return this.monitors.find(monitor => monitor.market.id == marketId)
    }

    monitorExists(marketId: number): boolean {
        return this.monitors.some(monitor => monitor.market.id === marketId)
    }

    monitorIsWorking(marketId: number): boolean {
        return this.monitors.some(monitor => 
            monitor.market.id == marketId 
            && monitor.isWorking()
        )
    }

    getMonitoringMarkets(): Market[] {
        return this.monitors.filter(monitor => monitor.isWorking()).map(monitor => monitor.market);
    }

    async appendAndStart(market: Market): Promise<void> {
        if (this.monitorExists(market.id))  {
            return Promise.resolve();
        }

        const monitor = await this.create(market);
        this.monitors.push(monitor)
        await monitor.start()
    }

    async appendAndStartMultiple(markets: Market[]): Promise<void> {
        for (const market of markets) {
            await this.appendAndStart(market)
        }
    }

    async stopAndRemove(marketId: number): Promise<void> {
        if (!this.monitorExists(marketId)) {
            return Promise.resolve()
        }
         
        const monitor = this.get(marketId);
        if (monitor?.isWorking()) {
            monitor.stop()
        }

        this.monitors = this.monitors.filter(monitor => monitor.market.id != marketId)
    }

    async restart(marketId: number): Promise<void> {
        const monitor = this.get(marketId)
        if (monitor?.isWorking()) {
            await monitor.stop()
            await monitor.start()
        }
    }

}

export default MonitorManager
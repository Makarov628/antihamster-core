"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MonitorManager {
    monitors = [];
    get(marketId) {
        return this.monitors.find(monitor => monitor.market.id == marketId);
    }
    monitorExists(marketId) {
        return this.monitors.some(monitor => monitor.market.id === marketId);
    }
    monitorIsWorking(marketId) {
        return this.monitors.some(monitor => monitor.market.id == marketId
            && monitor.isWorking());
    }
    getMonitoringMarkets() {
        return this.monitors.filter(monitor => monitor.isWorking()).map(monitor => monitor.market);
    }
    async appendAndStart(market) {
        if (this.monitorExists(market.id)) {
            return Promise.resolve();
        }
        const monitor = await this.create(market);
        this.monitors.push(monitor);
        await monitor.start();
    }
    async appendAndStartMultiple(markets) {
        for (const market of markets) {
            await this.appendAndStart(market);
        }
    }
    async stopAndRemove(marketId) {
        if (!this.monitorExists(marketId)) {
            return Promise.resolve();
        }
        const monitor = this.get(marketId);
        if (monitor?.isWorking()) {
            monitor.stop();
        }
        this.monitors = this.monitors.filter(monitor => monitor.market.id != marketId);
    }
    async restart(marketId) {
        const monitor = this.get(marketId);
        if (monitor?.isWorking()) {
            await monitor.stop();
            await monitor.start();
        }
    }
}
exports.default = MonitorManager;

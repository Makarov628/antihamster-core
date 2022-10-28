import Market from '../../../domain/entities/market.entity';
import Monitor from './monitor';
declare abstract class MonitorManager {
    protected monitors: Monitor[];
    protected abstract create(market: Market): Promise<Monitor>;
    protected get(marketId: string): Monitor | undefined;
    monitorExists(marketId: string): boolean;
    monitorIsWorking(marketId: string): boolean;
    getMonitoringMarkets(): Market[];
    appendAndStart(market: Market): Promise<void>;
    appendAndStartMultiple(markets: Market[]): Promise<void>;
    stopAndRemove(marketId: string): Promise<void>;
    restart(marketId: string): Promise<void>;
}
export default MonitorManager;
//# sourceMappingURL=monitor.manager.d.ts.map
import Market from '../../../../domain/entities/market.entity';
import Monitor from '../../../../infrastructure/market/monitoring/monitor';
import MonitorManager from '../../../../infrastructure/market/monitoring/monitor.manager';
declare class TradingViewRealtimeMonitorManager extends MonitorManager {
    private _antihamsterStrategyId;
    private client;
    private indicator;
    private lostConnectionTimer?;
    constructor(_antihamsterStrategyId: string);
    private createClient;
    private restartLostConnectionTimer;
    private reloadAllMonitors;
    private loadIndicator;
    protected create(market: Market): Promise<Monitor>;
}
export { TradingViewRealtimeMonitorManager };
//# sourceMappingURL=monitor.manager.d.ts.map
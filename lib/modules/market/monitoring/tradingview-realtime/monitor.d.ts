import Market from '../../../../domain/entities/market.entity';
import Monitor from '../../../../infrastructure/market/monitoring/monitor';
declare class TradingViewRealtimeMonitor extends Monitor {
    private antihamsterIndicator;
    private client;
    private currentTrade;
    private lastTrade;
    private chart;
    private monitorIsWorking;
    constructor(antihamsterIndicator: any, market: Market, client: any);
    setup(): void;
    start(): Promise<void>;
    isWorking(): boolean;
    stop(): Promise<void>;
    private onChartError;
    private onChartReady;
    private onChartUpdate;
    private updateLastAndCurrentTrade;
}
export { TradingViewRealtimeMonitor };
//# sourceMappingURL=monitor.d.ts.map
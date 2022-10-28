"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domainEventEmitter_1 = require("../../../domain/events/domainEventEmitter");
class Monitor {
    market;
    constructor(market) {
        this.market = market;
    }
    trades = [];
    // FIXME: not good type mapping
    emitMarketEvent(eventName, value) {
        domainEventEmitter_1.DomainEventEmitter.instance.emit(eventName, value);
    }
}
exports.default = Monitor;

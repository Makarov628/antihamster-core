"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventEmitter = void 0;
const node_events_1 = require("node:events");
class DomainEventEmitter {
    static instance = new node_events_1.EventEmitter();
}
exports.DomainEventEmitter = DomainEventEmitter;

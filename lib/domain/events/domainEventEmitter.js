"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventEmitter = void 0;
const events_1 = require("events");
class DomainEventEmitter {
    static instance = new events_1.EventEmitter();
}
exports.DomainEventEmitter = DomainEventEmitter;

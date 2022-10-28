/// <reference types="node" />
import EventEmitter from "events";
interface StringKeyedObject {
    [key: string]: any;
}
export interface TypeSafeEventEmitter<C extends StringKeyedObject> extends EventEmitter {
    addListener<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this;
    on<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this;
    once<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this;
    removeListener<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this;
    off<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this;
    removeAllListeners<K extends Extract<keyof C, string>>(eventName?: K): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners<K extends Extract<keyof C, string>>(eventName: K): Function[];
    rawListeners<K extends Extract<keyof C, string>>(eventName: K): Function[];
    emit<K extends Extract<keyof C, string>>(eventName: K, arg: C[K]): boolean;
    listenerCount<K extends Extract<keyof C, string>>(eventName: K): number;
    prependListener<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this;
    prependOnceListener<K extends Extract<keyof C, string>>(eventName: K, listener: (arg: C[K]) => void): this;
}
export {};
//# sourceMappingURL=typeSafeEventEmitter.d.ts.map
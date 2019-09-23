export declare type EventSourceConstructor = new (url: string, eventSourceInitDict?: EventSourceInit) => EventSource;
export interface WebSocketConstructor {
    new (url: string, protocols?: string | string[], options?: any): WebSocket;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
}
declare type WebSocket = any;
declare type EventSource = any;
declare type EventSourceInit = any;
export {};

import { HttpClient } from "./HttpClient";
import { ILogger } from "./ILogger";
import { ITransport, TransferFormat } from "./ITransport";
export declare class WeChatWebSocketTransport implements ITransport {
    private readonly httpClient;
    private readonly accessTokenFactory;
    private readonly logger;
    private readonly logMessageContent;
    private webSocket;
    constructor(httpClient: HttpClient, accessTokenFactory: (() => string | Promise<string>) | undefined, logger: ILogger, logMessageContent: boolean);
    connect(url: string, transferFormat: TransferFormat): Promise<void>;
    onreceive: ((data: string | ArrayBuffer) => void) | null;
    onclose: ((error?: Error | undefined) => void) | null;
    send(data: any): Promise<void>;
    stop(): Promise<void>;
    private close;
}

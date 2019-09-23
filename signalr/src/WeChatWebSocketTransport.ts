import { HttpClient } from "./HttpClient";
import { ILogger, LogLevel } from "./ILogger";
import { ITransport, TransferFormat } from "./ITransport";
import { Arg, getDataDetail } from "./Utils";

export class WeChatWebSocketTransport implements ITransport {

    private webSocket: WechatMiniprogram.SocketTask | undefined;
    constructor(
        private readonly httpClient: HttpClient,
        private readonly accessTokenFactory: (() => string | Promise<string>) | undefined,
        private readonly logger: ILogger,
        private readonly logMessageContent: boolean) {

    }

    public async connect(url: string, transferFormat: TransferFormat): Promise<void> {
        Arg.isRequired(url, "url");
        Arg.isRequired(transferFormat, "transferFormat");
        Arg.isIn(transferFormat, TransferFormat, "transferFormat");
        this.logger.log(LogLevel.Trace, "(WebSockets transport) Connecting.");

        if (this.accessTokenFactory) {
            const token = await this.accessTokenFactory();
            if (token) {
                url += (url.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(token)}`;
            }
        }
        return new Promise<void>((resolve, reject) => {
            url = url.replace(/^http/, "ws");
            let webSocket: WechatMiniprogram.SocketTask | undefined;
            const cookies = this.httpClient.getCookieString(url);

            webSocket = wx.connectSocket({
                url,
                header: {
                    cookie: cookies ? `${cookies}` : undefined,
                }
            });

            // wechat doesn't support this kind of api
            // if (transferFormat === TransferFormat.Binary) {
            //     webSocket.binaryType = "arraybuffer";
            // }

            // tslint:disable-next-line:variable-name
            webSocket.onOpen(() => {
                this.logger.log(LogLevel.Information, `WebSocket connected to ${url}.`);
                this.webSocket = webSocket;
                resolve();
            });

            webSocket.onError((event) => {
                let error: any = null;
                // ErrorEvent is a browser only type we need to check if the type exists before using it
                error = event.errMsg;
                if (!error) {
                    error = new Error("There was an error with the transport.");
                }
                reject(error);
            });

            webSocket.onMessage((message) => {
                this.logger.log(LogLevel.Trace, `(WebSockets transport) data received. ${getDataDetail(message.data, this.logMessageContent)}.`);
                if (this.onreceive) {
                    this.onreceive(message.data);
                }
            });

            webSocket.onClose((event) => this.close(event));
        });

    }
    public onreceive: ((data: string | ArrayBuffer) => void) | null = null;
    public onclose: ((error?: Error | undefined) => void) | null = null;

    public send(data: any): Promise<void> {
        if (this.webSocket) {
            this.logger.log(LogLevel.Trace, `(WebSockets transport) sending data. ${getDataDetail(data, this.logMessageContent)}.`);
            this.webSocket.send({ data });
            return Promise.resolve();
        }

        return Promise.reject("WebSocket is not in the OPEN state");
    }

    public stop(): Promise<void> {
        if (this.webSocket) {
            // Clear websocket handlers because we are considering the socket closed now
            this.webSocket = undefined;

            // Manually invoke onclose callback inline so we know the HttpConnection was closed properly before returning
            // This also solves an issue where websocket.onclose could take 18+ seconds to trigger during network disconnects
            this.close(undefined);
        }

        return Promise.resolve();
    }

    private close(event?: WechatMiniprogram.SocketTaskOnCloseCallbackResult): void {
        // webSocket will be null if the transport did not start successfully
        this.logger.log(LogLevel.Trace, "(WebSockets transport) socket closed.");
        if (this.onclose) {
            if (event && event.code !== 1000) {
                this.onclose(new Error(`WebSocket closed with status code: ${event.code} (${event.reason}).`));
            } else {
                this.onclose();
            }
        }
    }
}

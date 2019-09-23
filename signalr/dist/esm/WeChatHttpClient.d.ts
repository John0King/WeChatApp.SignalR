import { HttpClient, HttpRequest, HttpResponse } from "./HttpClient";
import { ILogger } from "./ILogger";
export declare class WeChatHttpClient extends HttpClient {
    private readonly logger;
    constructor(logger: ILogger);
    /** @inheritdoc */
    send(request: HttpRequest): Promise<HttpResponse>;
    private knownStateTextMap;
    private mapStatusCode;
}

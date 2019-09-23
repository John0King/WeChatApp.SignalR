import { AbortError, HttpError } from "./Errors";
import { HttpClient, HttpRequest, HttpResponse } from "./HttpClient";
import { ILogger, LogLevel } from "./ILogger";

export class WeChatHttpClient extends HttpClient {

    constructor(private readonly logger: ILogger) {
        super();
    }

    /** @inheritdoc */
    public send(request: HttpRequest): Promise<HttpResponse> {
        // Check that abort was not signaled before calling send
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new AbortError());
        }

        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }

        return new Promise<HttpResponse>((resolve, reject) => {
            const xhr = wx.request({
                data: request.content,
                method: request.method as any,
                url: request.url!,
                header: {
                    ...request.headers,
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "text/plain;charset=UTF-8"
                },
                fail: (response) => {
                    this.logger.log(LogLevel.Warning, `Error from HTTP request. ${response.errMsg}.`);
                    reject(new HttpError(response.errMsg, 500)); // no status code
                },
                success: (response) => {
                    if (request.abortSignal) {
                        request.abortSignal.onabort = null;
                    }

                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        let content: string;
                        if (typeof response.data === "object") {
                            content = JSON.stringify(response.data);
                        } else {
                            content = response.data;
                        }
                        resolve(new HttpResponse(response.statusCode, this.mapStatusCode(response.statusCode), content));
                    } else {
                        reject(new HttpError(response.errMsg, response.statusCode));
                    }
                }
            });

            if (request.abortSignal) {
                request.abortSignal.onabort = () => {
                    xhr.abort();
                    reject(new AbortError());
                };
            }

            // timeout is not supported in wx.request()
            // if (request.timeout) {
            //     xhr.timeout = request.timeout;
            // }

            // timeout is not supported in wx.request()
            // xhr.ontimeout = () => {
            //     this.logger.log(LogLevel.Warning, `Timeout from HTTP request.`);
            //     reject(new TimeoutError());
            // };
        });
    }

    private knownStateTextMap = {
        [100]: "Continue",
        [101]: "Switching Protocols",
        [102]: "Processing",
        [200]: "Ok",
        [201]: "Created",
        [202]: "Accepted",
        [203]: "Non-Authoritative Information",
        [204]: "No Content",
        [205]: "Reset Content",
        [206]: "Partial Content",
        [207]: "Multi-Status",
        [300]: "Multiple Choices",
        [301]: "Moved Permanently",
        [302]: "Move Temporarily",
        [303]: "See Other",
        [304]: "Not Modified",
        [305]: "Use Proxy",
        [306]: "Switch Proxy",
        [307]: "Temporary Redirect",
        [400]: "Bad Request",
        [401]: "Unauthenticated",
        [402]: "Payment Required",
        [403]: "Forbidden",
        [404]: "Not Found",
        [405]: "Method Not Allowed",
        [406]: "Not Acceptable",
        [408]: "Request Timeout",
        [415]: "Unsupported Media Type",
        [500]: "Internal Server Error",
        [501]: "Not Implemented",
        [502]: "Bad Gateway",
        [503]: "Service Unavailable",
        [600]: "Unparseable Response Headers"
    };

    private mapStatusCode(statusCode: number): string {
        const x = this.knownStateTextMap[statusCode];
        if (x) {
            return x;
        }
        return "unknow state";
    }
}

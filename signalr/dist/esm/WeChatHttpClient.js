var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { AbortError, HttpError } from "./Errors";
import { HttpClient, HttpResponse } from "./HttpClient";
import { LogLevel } from "./ILogger";
var WeChatHttpClient = /** @class */ (function (_super) {
    __extends(WeChatHttpClient, _super);
    function WeChatHttpClient(logger) {
        var _a;
        var _this = _super.call(this) || this;
        _this.logger = logger;
        _this.knownStateTextMap = (_a = {},
            _a[100] = "Continue",
            _a[101] = "Switching Protocols",
            _a[102] = "Processing",
            _a[200] = "Ok",
            _a[201] = "Created",
            _a[202] = "Accepted",
            _a[203] = "Non-Authoritative Information",
            _a[204] = "No Content",
            _a[205] = "Reset Content",
            _a[206] = "Partial Content",
            _a[207] = "Multi-Status",
            _a[300] = "Multiple Choices",
            _a[301] = "Moved Permanently",
            _a[302] = "Move Temporarily",
            _a[303] = "See Other",
            _a[304] = "Not Modified",
            _a[305] = "Use Proxy",
            _a[306] = "Switch Proxy",
            _a[307] = "Temporary Redirect",
            _a[400] = "Bad Request",
            _a[401] = "Unauthenticated",
            _a[402] = "Payment Required",
            _a[403] = "Forbidden",
            _a[404] = "Not Found",
            _a[405] = "Method Not Allowed",
            _a[406] = "Not Acceptable",
            _a[408] = "Request Timeout",
            _a[415] = "Unsupported Media Type",
            _a[500] = "Internal Server Error",
            _a[501] = "Not Implemented",
            _a[502] = "Bad Gateway",
            _a[503] = "Service Unavailable",
            _a[600] = "Unparseable Response Headers",
            _a);
        return _this;
    }
    /** @inheritdoc */
    WeChatHttpClient.prototype.send = function (request) {
        var _this = this;
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
        return new Promise(function (resolve, reject) {
            var xhr = wx.request({
                data: request.content,
                method: request.method,
                url: request.url,
                header: __assign(__assign({}, request.headers), { "X-Requested-With": "XMLHttpRequest", "Content-Type": "text/plain;charset=UTF-8" }),
                fail: function (response) {
                    _this.logger.log(LogLevel.Warning, "Error from HTTP request. " + response.errMsg + ".");
                    reject(new HttpError(response.errMsg, 500)); // no status code
                },
                success: function (response) {
                    if (request.abortSignal) {
                        request.abortSignal.onabort = null;
                    }
                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        var content = void 0;
                        if (typeof response.data === "object") {
                            content = JSON.stringify(response.data);
                        }
                        else {
                            content = response.data;
                        }
                        resolve(new HttpResponse(response.statusCode, _this.mapStatusCode(response.statusCode), content));
                    }
                    else {
                        reject(new HttpError(response.errMsg, response.statusCode));
                    }
                }
            });
            if (request.abortSignal) {
                request.abortSignal.onabort = function () {
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
    };
    WeChatHttpClient.prototype.mapStatusCode = function (statusCode) {
        var x = this.knownStateTextMap[statusCode];
        if (x) {
            return x;
        }
        return "unknow state";
    };
    return WeChatHttpClient;
}(HttpClient));
export { WeChatHttpClient };
//# sourceMappingURL=WeChatHttpClient.js.map
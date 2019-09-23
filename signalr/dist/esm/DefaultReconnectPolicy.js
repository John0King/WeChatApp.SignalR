// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// 0, 2, 10, 30 second delays before reconnect attempts.
var DEFAULT_RETRY_DELAYS_IN_MILLISECONDS = [0, 2000, 10000, 30000, null];
/** @private */
var DefaultReconnectPolicy = /** @class */ (function () {
    function DefaultReconnectPolicy(retryDelays) {
        this.retryDelays = retryDelays !== undefined ? __spreadArrays(retryDelays, [null]) : DEFAULT_RETRY_DELAYS_IN_MILLISECONDS;
    }
    DefaultReconnectPolicy.prototype.nextRetryDelayInMilliseconds = function (retryContext) {
        return this.retryDelays[retryContext.previousRetryCount];
    };
    return DefaultReconnectPolicy;
}());
export { DefaultReconnectPolicy };
//# sourceMappingURL=DefaultReconnectPolicy.js.map
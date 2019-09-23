"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wechat_app_signalr_1 = require("wechat-app-signalr");
var util_1 = require("../../utils/util");
Page({
    data: {
        mesages: []
    },
    onLoad: function () {
        var _this = this;
        var connection = new wechat_app_signalr_1.HubConnectionBuilder()
            .withUrl("http://localhost:5009/echo")
            .withAutomaticReconnect()
            .build();
        connection.on("Ping", function (ping) {
            var _a = util_1.parseMessage(ping), type = _a[0], id = _a[1];
            console.log(type + " " + id);
            connection.send("Pong", "pong " + (id + 1));
        });
        connection.start()
            .catch(function (e) {
            console.log("\u8FDE\u63A5\u5931\u8D25");
            console.log(e);
        });
        var xid = 0;
        setInterval(function () {
            _this.pingServer(connection, xid)
                .then(function (x) {
                xid = x;
            });
        }, 3000);
    },
    pingServer: function (connection, lastId) {
        return __awaiter(this, void 0, void 0, function () {
            var pong, _a, type, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, connection.invoke("Ping", "ping " + (lastId + 1))];
                    case 1:
                        pong = _b.sent();
                        _a = util_1.parseMessage(pong), type = _a[0], id = _a[1];
                        console.log(type + " " + id);
                        return [2, id];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHlEQUF3RTtBQUN4RSx5Q0FBZ0Q7QUFJaEQsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFFLEVBQVc7S0FDdkI7SUFDRCxNQUFNO1FBQU4saUJBeUJDO1FBeEJHLElBQUksVUFBVSxHQUFHLElBQUkseUNBQW9CLEVBQUU7YUFDdEMsT0FBTyxDQUFDLDRCQUE0QixDQUFDO2FBQ3JDLHNCQUFzQixFQUFFO2FBQ3hCLEtBQUssRUFBRSxDQUFDO1FBRWIsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQSxJQUFJO1lBQ2xCLElBQUEsOEJBQStCLEVBQTlCLFlBQUksRUFBRSxVQUF3QixDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUksSUFBSSxTQUFJLEVBQUksQ0FBQyxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVEsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUE7UUFDRixVQUFVLENBQUMsS0FBSyxFQUFFO2FBQ2IsS0FBSyxDQUFDLFVBQUEsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQU0sQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixXQUFXLENBQUM7WUFDUixLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUM7aUJBQy9CLElBQUksQ0FBQyxVQUFBLENBQUM7Z0JBQ0gsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBRVgsQ0FBQztJQUNLLFVBQVUsRUFBaEIsVUFBaUIsVUFBd0IsRUFBRSxNQUFhOzs7Ozs0QkFDekMsV0FBTSxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxXQUFRLE1BQU0sR0FBQyxDQUFDLENBQUUsQ0FBQyxFQUFBOzt3QkFBekQsSUFBSSxHQUFHLFNBQTREO3dCQUNuRSxLQUFZLG1CQUFZLENBQUMsSUFBSSxDQUFDLEVBQTdCLElBQUksUUFBQSxFQUFDLEVBQUUsUUFBQSxDQUF1Qjt3QkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBSSxJQUFJLFNBQUksRUFBSSxDQUFDLENBQUM7d0JBQzdCLFdBQU8sRUFBRSxFQUFDOzs7O0tBQ2I7Q0FDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvL2luZGV4LmpzXG4vL+iOt+WPluW6lOeUqOWunuS+i1xuLy9pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXG5pbXBvcnQgeyBIdWJDb25uZWN0aW9uQnVpbGRlciwgSHViQ29ubmVjdGlvbiB9IGZyb20gJ3dlY2hhdC1hcHAtc2lnbmFscidcbmltcG9ydCB7IHBhcnNlTWVzc2FnZSB9IGZyb20gXCIuLi8uLi91dGlscy91dGlsXCI7XG5cbi8vY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxuXG5QYWdlKHtcbiAgICBkYXRhOiB7XG4gICAgICAgIG1lc2FnZXM6IFtdIGFzIGFueVtdXG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGxldCBjb25uZWN0aW9uID0gbmV3IEh1YkNvbm5lY3Rpb25CdWlsZGVyKClcbiAgICAgICAgICAgIC53aXRoVXJsKFwiaHR0cDovL2xvY2FsaG9zdDo1MDA5L2VjaG9cIilcbiAgICAgICAgICAgIC53aXRoQXV0b21hdGljUmVjb25uZWN0KClcbiAgICAgICAgICAgIC5idWlsZCgpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oXCJQaW5nXCIsIHBpbmcgPT4ge1xuICAgICAgICAgICAgbGV0IFt0eXBlLCBpZF0gPSBwYXJzZU1lc3NhZ2UocGluZyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0eXBlfSAke2lkfWApO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5zZW5kKFwiUG9uZ1wiLCBgcG9uZyAke2lkICsgMX1gKTtcbiAgICAgICAgfSlcbiAgICAgICAgY29ubmVjdGlvbi5zdGFydCgpXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYOi/nuaOpeWksei0pWApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgeGlkID0gMDtcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgIHRoaXMucGluZ1NlcnZlcihjb25uZWN0aW9uLCB4aWQpXG4gICAgICAgICAgICAudGhlbih4PT57XG4gICAgICAgICAgICAgICAgeGlkID0geDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LDMwMDApIFxuICAgICAgICAgICAgXG4gICAgfSxcbiAgICBhc3luYyBwaW5nU2VydmVyKGNvbm5lY3Rpb246SHViQ29ubmVjdGlvbiwgbGFzdElkOm51bWJlcil7XG4gICAgICAgIGxldCBwb25nID0gYXdhaXQgY29ubmVjdGlvbi5pbnZva2UoXCJQaW5nXCIsYHBpbmcgJHtsYXN0SWQrMX1gKSBhcyBzdHJpbmc7XG4gICAgICAgIGxldCBbdHlwZSxpZF0gPSBwYXJzZU1lc3NhZ2UocG9uZyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3R5cGV9ICR7aWR9YCk7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG59KVxuIl19
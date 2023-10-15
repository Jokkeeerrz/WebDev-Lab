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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var fs = require("fs/promises");
var filePath = 'debts.txt';
function appendDebt(name, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = "".concat(name, ", ").concat(amount, "\n");
            try {
                fs.appendFile(filePath, data);
                {
                    console.log("Debt for ".concat(name, " with amount ").concat(amount, " has been added"));
                }
            }
            catch (err) {
                console.log('Error appending debt', err);
            }
            return [2 /*return*/];
        });
    });
}
function listDebts() {
    return __awaiter(this, void 0, void 0, function () {
        var fileData, debts, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs.readFile(filePath, 'utf-8')];
                case 1:
                    fileData = _a.sent();
                    debts = fileData.trim().split('\n');
                    if (debts.length > 0) {
                        console.log('List of Debts: ');
                    }
                    else {
                        console.log('No debts found');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log('Error reading debts', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, command, args, name_1, amount;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = process.argv.slice(2), command = _a[0], args = _a.slice(1);
                    if (!(command === 'append' && args.length == 2)) return [3 /*break*/, 2];
                    name_1 = args[0], amount = args[1];
                    return [4 /*yield*/, appendDebt(name_1, parseFloat(amount))];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 2:
                    if (!(command === 'list')) return [3 /*break*/, 4];
                    return [4 /*yield*/, listDebts()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    console.log('Usage: ');
                    console.log('node debt_manager.ts append [name] [amount]');
                    console.log('node debt_manager.ts list');
                    _b.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
main();

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
const rxjs_1 = require("rxjs");
function camelCase(key) {
    return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
function serializeValue(value) {
    if (typeof value === 'bigint') {
        return value.toString();
    }
    if (client_1.Prisma.Decimal.isDecimal(value)) {
        return value.toString();
    }
    if (Array.isArray(value)) {
        return value.map(serializeValue);
    }
    if (value !== null &&
        typeof value === 'object' &&
        Object.getPrototypeOf(value) === Object.prototype) {
        return Object.fromEntries(Object.entries(value).map(([key, nestedValue]) => [
            camelCase(key),
            serializeValue(nestedValue),
        ]));
    }
    return value;
}
let ApiResponseInterceptor = class ApiResponseInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, rxjs_1.map)(serializeValue));
    }
};
exports.ApiResponseInterceptor = ApiResponseInterceptor;
exports.ApiResponseInterceptor = ApiResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ApiResponseInterceptor);
//# sourceMappingURL=api-response.interceptor.js.map
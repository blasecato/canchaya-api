"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PayloadSizeExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadSizeExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let PayloadSizeExceptionFilter = PayloadSizeExceptionFilter_1 = class PayloadSizeExceptionFilter {
    logger = new common_1.Logger(PayloadSizeExceptionFilter_1.name);
    catch(exception, host) {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        const status = exception.getStatus();
        const original = exception.message;
        const message = /entity too large|too large/i.test(original)
            ? 'El archivo que enviaste es demasiado grande. Divídelo en varias cargas con menos equipos e inténtalo de nuevo.'
            : original;
        this.logger.warn(`413 en ${request.method} ${request.url}: ${original}`);
        response.status(status).json({
            statusCode: status,
            message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.PayloadSizeExceptionFilter = PayloadSizeExceptionFilter;
exports.PayloadSizeExceptionFilter = PayloadSizeExceptionFilter = PayloadSizeExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(common_1.PayloadTooLargeException)
], PayloadSizeExceptionFilter);
//# sourceMappingURL=payload-size-exception.filter.js.map
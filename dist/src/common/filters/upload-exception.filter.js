"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UploadExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const uploads_constants_1 = require("../../uploads/uploads.constants");
const MAX_IMAGE_SIZE_MB = Math.round(uploads_constants_1.MAX_IMAGE_SIZE_BYTES / (1024 * 1024));
let UploadExceptionFilter = UploadExceptionFilter_1 = class UploadExceptionFilter {
    logger = new common_1.Logger(UploadExceptionFilter_1.name);
    catch(exception, host) {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        const httpException = this.toHttpException(exception);
        const status = httpException.getStatus();
        this.logger.error(`Multer ${exception.code} en ${request.method} ${request.url}` +
            (exception.field ? ` (campo ${exception.field})` : ''));
        response.status(status).json({
            statusCode: status,
            message: httpException.message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
    toHttpException(exception) {
        switch (exception.code) {
            case 'LIMIT_FILE_SIZE':
                return new common_1.PayloadTooLargeException(`La imagen supera los ${MAX_IMAGE_SIZE_MB} MB permitidos. Sube una versión más liviana.`);
            case 'LIMIT_FILE_COUNT':
                return new common_1.BadRequestException('Estás enviando más imágenes de las permitidas. Quita algunas e inténtalo de nuevo.');
            case 'LIMIT_UNEXPECTED_FILE':
                return new common_1.BadRequestException('Se recibió un archivo que este formulario no admite. Revisa las imágenes seleccionadas.');
            case 'LIMIT_FIELD_VALUE':
                return new common_1.BadRequestException('Uno de los campos es demasiado largo. Acorta el texto e inténtalo de nuevo.');
            case 'LIMIT_FIELD_COUNT':
            case 'LIMIT_PART_COUNT':
            case 'LIMIT_FIELD_KEY':
                return new common_1.BadRequestException('No pudimos procesar el formulario completo. Vuelve a intentarlo y, si continúa, avísanos para revisarlo.');
            default:
                return new common_1.BadRequestException('No pudimos procesar los archivos enviados. Inténtalo de nuevo.');
        }
    }
};
exports.UploadExceptionFilter = UploadExceptionFilter;
exports.UploadExceptionFilter = UploadExceptionFilter = UploadExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(multer_1.MulterError)
], UploadExceptionFilter);
//# sourceMappingURL=upload-exception.filter.js.map
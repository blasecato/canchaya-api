"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
let PrismaExceptionFilter = PrismaExceptionFilter_1 = class PrismaExceptionFilter {
    logger = new common_1.Logger(PrismaExceptionFilter_1.name);
    catch(exception, host) {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        const httpException = this.toHttpException(exception);
        const status = httpException.getStatus();
        this.logger.error(`Prisma ${exception.code} en ${request.method} ${request.url}: ${JSON.stringify(exception.meta ?? {})}`);
        response.status(status).json({
            statusCode: status,
            message: httpException.message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
    toHttpException(exception) {
        switch (exception.code) {
            case 'P2002':
                return new common_1.ConflictException('Ya existe un registro con esos datos. Revisa los campos que deben ser únicos, como el documento o el correo.');
            case 'P2003':
                return new common_1.BadRequestException('No encontramos uno de los elementos relacionados, o todavía está en uso y no se puede modificar.');
            case 'P2000':
            case 'P2004':
            case 'P2005':
            case 'P2020':
            case 'P2033':
                return new common_1.BadRequestException('Alguno de los datos enviados no es válido. Revisa el formulario e inténtalo de nuevo.');
            case 'P2011':
            case 'P2012':
            case 'P2013':
            case 'P2014':
                return new common_1.BadRequestException('Falta un campo obligatorio.');
            case 'P2025':
                return new common_1.NotFoundException('No encontramos lo que buscabas. Es posible que haya sido eliminado.');
            default:
                return new common_1.InternalServerErrorException('No pudimos completar la operación. Inténtalo de nuevo en unos minutos.');
        }
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = PrismaExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
//# sourceMappingURL=prisma-exception.filter.js.map
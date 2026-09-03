"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../../generated/prisma/client");
let PrismaExceptionFilter = class PrismaExceptionFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        const httpException = this.toHttpException(exception);
        const status = httpException.getStatus();
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
                return new common_1.ConflictException('Ya existe un registro con los valores únicos enviados.');
            case 'P2003':
                return new common_1.BadRequestException('La relación indicada no existe o todavía está siendo utilizada.');
            case 'P2000':
            case 'P2004':
            case 'P2005':
            case 'P2020':
            case 'P2033':
                return new common_1.BadRequestException('Los datos enviados incumplen una restricción de la base de datos.');
            case 'P2011':
            case 'P2012':
            case 'P2013':
            case 'P2014':
                return new common_1.BadRequestException('Falta un campo obligatorio.');
            case 'P2025':
                return new common_1.NotFoundException('El registro solicitado no existe.');
            default:
                return new common_1.InternalServerErrorException('No fue posible completar la operación en la base de datos.');
        }
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter;
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaExceptionFilter);
//# sourceMappingURL=prisma-exception.filter.js.map
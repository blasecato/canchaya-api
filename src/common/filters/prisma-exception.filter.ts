import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Prisma } from '../../../generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const httpException = this.toHttpException(exception);
    const status = httpException.getStatus();

    response.status(status).json({
      statusCode: status,
      message: httpException.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private toHttpException(
    exception: Prisma.PrismaClientKnownRequestError,
  ): HttpException {
    switch (exception.code) {
      case 'P2002':
        return new ConflictException(
          'Ya existe un registro con los valores únicos enviados.',
        );
      case 'P2003':
        return new BadRequestException(
          'La relación indicada no existe o todavía está siendo utilizada.',
        );
      case 'P2000':
      case 'P2004':
      case 'P2005':
      case 'P2020':
      case 'P2033':
        return new BadRequestException(
          'Los datos enviados incumplen una restricción de la base de datos.',
        );
      case 'P2011':
      case 'P2012':
      case 'P2013':
      case 'P2014':
        return new BadRequestException('Falta un campo obligatorio.');
      case 'P2025':
        return new NotFoundException('El registro solicitado no existe.');
      default:
        return new InternalServerErrorException(
          'No fue posible completar la operación en la base de datos.',
        );
    }
  }
}

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Prisma } from '../../../generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const httpException = this.toHttpException(exception);
    const status = httpException.getStatus();

    this.logger.error(
      `Prisma ${exception.code} en ${request.method} ${request.url}: ${JSON.stringify(exception.meta ?? {})}`,
    );

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
          'Ya existe un registro con esos datos. Revisa los campos que deben ser únicos, como el documento o el correo.',
        );
      case 'P2003':
        return new BadRequestException(
          'No encontramos uno de los elementos relacionados, o todavía está en uso y no se puede modificar.',
        );
      case 'P2000':
      case 'P2004':
      case 'P2005':
      case 'P2020':
      case 'P2033':
        return new BadRequestException(
          'Alguno de los datos enviados no es válido. Revisa el formulario e inténtalo de nuevo.',
        );
      case 'P2011':
      case 'P2012':
      case 'P2013':
      case 'P2014':
        return new BadRequestException('Falta un campo obligatorio.');
      case 'P2025':
        return new NotFoundException('No encontramos lo que buscabas. Es posible que haya sido eliminado.');
      default:
        return new InternalServerErrorException(
          'No pudimos completar la operación. Inténtalo de nuevo en unos minutos.',
        );
    }
  }
}

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
  PayloadTooLargeException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { MulterError } from 'multer';
import { MAX_IMAGE_SIZE_BYTES } from '../../uploads/uploads.constants';

const MAX_IMAGE_SIZE_MB = Math.round(MAX_IMAGE_SIZE_BYTES / (1024 * 1024));

/**
 * Multer informa sus límites en inglés y con lenguaje de desarrollador
 * («Too many fields»). Aquí se traducen a algo que el usuario pueda accionar.
 */
@Catch(MulterError)
export class UploadExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UploadExceptionFilter.name);

  catch(exception: MulterError, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const httpException = this.toHttpException(exception);
    const status = httpException.getStatus();

    // El código original queda en el log para diagnosticar el límite excedido.
    this.logger.error(
      `Multer ${exception.code} en ${request.method} ${request.url}` +
        (exception.field ? ` (campo ${exception.field})` : ''),
    );

    response.status(status).json({
      statusCode: status,
      message: httpException.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private toHttpException(exception: MulterError) {
    switch (exception.code) {
      case 'LIMIT_FILE_SIZE':
        return new PayloadTooLargeException(
          `La imagen supera los ${MAX_IMAGE_SIZE_MB} MB permitidos. Sube una versión más liviana.`,
        );
      case 'LIMIT_FILE_COUNT':
        return new BadRequestException(
          'Estás enviando más imágenes de las permitidas. Quita algunas e inténtalo de nuevo.',
        );
      case 'LIMIT_UNEXPECTED_FILE':
        return new BadRequestException(
          'Se recibió un archivo que este formulario no admite. Revisa las imágenes seleccionadas.',
        );
      case 'LIMIT_FIELD_VALUE':
        return new BadRequestException(
          'Uno de los campos es demasiado largo. Acorta el texto e inténtalo de nuevo.',
        );
      case 'LIMIT_FIELD_COUNT':
      case 'LIMIT_PART_COUNT':
      case 'LIMIT_FIELD_KEY':
        // El usuario no puede hacer nada: el formulario creció más que el
        // límite configurado y hay que ampliarlo del lado del servidor.
        return new BadRequestException(
          'No pudimos procesar el formulario completo. Vuelve a intentarlo y, si continúa, avísanos para revisarlo.',
        );
      default:
        return new BadRequestException(
          'No pudimos procesar los archivos enviados. Inténtalo de nuevo.',
        );
    }
  }
}

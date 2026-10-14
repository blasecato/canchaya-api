import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  PayloadTooLargeException,
} from '@nestjs/common';
import type { Request, Response } from 'express';

/**
 * El body-parser responde «request entity too large» en inglés. Las cargas
 * masivas son el caso real donde eso aparece, así que se traduce y se explica
 * qué hacer.
 */
@Catch(PayloadTooLargeException)
export class PayloadSizeExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PayloadSizeExceptionFilter.name);

  catch(exception: PayloadTooLargeException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const original = exception.message;
    // Los mensajes ya traducidos (por ejemplo los de imágenes) se respetan.
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
}

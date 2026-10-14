import { ValidationPipe } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { PayloadSizeExceptionFilter } from '../common/filters/payload-size-exception.filter';
import { PrismaExceptionFilter } from '../common/filters/prisma-exception.filter';
import { UploadExceptionFilter } from '../common/filters/upload-exception.filter';
import { buildValidationException } from '../common/validation/validation-messages';
import { ApiResponseInterceptor } from '../common/interceptors/api-response.interceptor';
import {
  getUploadsRootDirectory,
  UPLOADS_PUBLIC_PREFIX,
} from '../uploads/uploads.constants';

export function configureApplication(app: NestExpressApplication): void {
  const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim());

  app.setGlobalPrefix('api');
  // La carga masiva de plantillas envía un JSON grande (decenas de equipos con
  // sus jugadores); el límite por defecto de 100 kB se queda corto.
  app.useBodyParser('json', { limit: '4mb' });
  // Los carnés descargan las fotos con `fetch` para convertirlas a data URL.
  // CORS debe ejecutarse también para las respuestas estáticas de /uploads.
  app.enableCors({ credentials: true, origin: corsOrigins });
  app.useStaticAssets(getUploadsRootDirectory(), {
    index: false,
    prefix: UPLOADS_PUBLIC_PREFIX,
    setHeaders: (response: {
      setHeader: (name: string, value: string) => void;
    }) => response.setHeader('X-Content-Type-Options', 'nosniff'),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
      // Los mensajes llegan al usuario: se traducen antes de responder.
      exceptionFactory: buildValidationException,
    }),
  );
  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new UploadExceptionFilter(),
    new PayloadSizeExceptionFilter(),
  );
  app.useGlobalInterceptors(new ApiResponseInterceptor());
}

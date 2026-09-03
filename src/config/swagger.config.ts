import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SWAGGER_PATH = 'docs';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('CanchaYa API')
    .setDescription(
      'Documentación interactiva de los servicios disponibles en CanchaYa.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa el token JWT de acceso.',
      },
      'access-token',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER_PATH, app, documentFactory, {
    customSiteTitle: 'CanchaYa API | Swagger',
    jsonDocumentUrl: '/docs-json',
    useGlobalPrefix: true,
    yamlDocumentUrl: '/docs-yaml',
    swaggerOptions: {
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      operationsSorter: 'alpha',
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  });
}

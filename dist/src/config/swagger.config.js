"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWAGGER_PATH = void 0;
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
exports.SWAGGER_PATH = 'docs';
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CanchaYa API')
        .setDescription('Documentación interactiva de los servicios disponibles en CanchaYa.')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa el token JWT de acceso.',
    }, 'access-token')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(exports.SWAGGER_PATH, app, documentFactory, {
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
//# sourceMappingURL=swagger.config.js.map
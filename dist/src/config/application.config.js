"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureApplication = configureApplication;
const common_1 = require("@nestjs/common");
const prisma_exception_filter_1 = require("../common/filters/prisma-exception.filter");
const api_response_interceptor_1 = require("../common/interceptors/api-response.interceptor");
const uploads_constants_1 = require("../uploads/uploads.constants");
function configureApplication(app) {
    const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
        .split(',')
        .map((origin) => origin.trim());
    app.setGlobalPrefix('api');
    app.enableCors({ credentials: true, origin: corsOrigins });
    app.useStaticAssets((0, uploads_constants_1.getUploadsRootDirectory)(), {
        index: false,
        prefix: uploads_constants_1.UPLOADS_PUBLIC_PREFIX,
        setHeaders: (response) => response.setHeader('X-Content-Type-Options', 'nosniff'),
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
        whitelist: true,
    }));
    app.useGlobalFilters(new prisma_exception_filter_1.PrismaExceptionFilter());
    app.useGlobalInterceptors(new api_response_interceptor_1.ApiResponseInterceptor());
}
//# sourceMappingURL=application.config.js.map
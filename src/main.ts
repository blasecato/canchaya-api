import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configureApplication } from './config/application.config';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  configureApplication(app);
  app.enableShutdownHooks();
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

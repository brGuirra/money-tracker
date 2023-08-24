import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Modules
import { AppModule } from './app.module';

// Models
import type { EnvironmentVariables } from '@common/config/env';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Money Tracker')
    .setDescription('The Money Tracker API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      errorHttpStatusCode: 422,
    }),
  );

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(configService.get('PORT') || 3000);
}

void bootstrap();

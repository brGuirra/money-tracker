import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Money Tracker')
    .setDescription('The Money Tracker API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useLogger(app.get(Logger));

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

void bootstrap();

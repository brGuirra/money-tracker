import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

export const setupValidationPipe = (app: INestApplication): void => {
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      errorHttpStatusCode: 422,
    }),
  );
};

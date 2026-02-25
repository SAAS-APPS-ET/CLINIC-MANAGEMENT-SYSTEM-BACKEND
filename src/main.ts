/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
          ),
        }),
      ],
    }),
  });

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Clinic Tech API')
    .setDescription(
      [
        'Clinic Tech backend API documentation.',
        '',
        'Notes:',
        '- All endpoints are prefixed with `/api`.',
        '- Most responses are wrapped as `{ success: true, data: ... }`.',
        '- Use the **Authorize** button and paste an **access token** as: `Bearer <token>`.',
      ].join('\n'),
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const doc = SwaggerModule.createDocument(app, swaggerConfig);

  // Apply the bearer auth scheme globally so every endpoint has a security requirement.
  // Without this, Swagger UI will show Authorize but not attach the header.
  (doc as any).security = [{ 'access-token': [] }];
  SwaggerModule.setup('api/docs', app, doc, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
}

bootstrap();

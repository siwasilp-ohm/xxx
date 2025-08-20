import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nestjs-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use Winston for logging
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Security Middleware
  app.use(helmet());
  app.enableCors({
    origin: process.env.NODE_ENV === 'production'
      ? 'https://your-frontend-domain.com' // TODO: Change to your production domain
      : 'http://localhost:5173',
    credentials: true,
  });

  // Global Pipes and Filters
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('EV Charge System API')
    .setDescription('The official API documentation for the Fullstack EV Charge System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

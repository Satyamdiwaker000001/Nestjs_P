import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Task Master API')
    .setDescription('Swagger Setup - Task Management System')
    .setVersion('1.0')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Use dynamic port for deployment, fallback to 3000 locally
  const port = process.env.PORT || 3000;

  // '0.0.0.0' is required for cloud hosting providers
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 System Online on Port: ${port}`);
  console.log(`📄 Swagger UI available at: http://localhost:${port}/api`);
}

void bootstrap();

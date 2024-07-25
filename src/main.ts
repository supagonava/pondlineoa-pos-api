import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { config as envconfig } from 'dotenv';
envconfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  Logger.log(`App listent at port ${process.env?.PORT || '8080'}`);
  await app.listen(parseInt(process.env?.PORT || '8080'));
}
bootstrap();

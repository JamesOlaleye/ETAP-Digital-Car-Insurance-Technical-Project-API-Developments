import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3220);
  const prisma = new PrismaClient();

  prisma
    .$connect()
    .then(() => console.log('Connected to the database'))
    .catch((e) => {
      console.error('Error connecting to the database: ');
      console.error(e);
    });
}
bootstrap();
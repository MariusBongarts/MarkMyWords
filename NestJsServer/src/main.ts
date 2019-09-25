import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const corsOptions: CorsOptions = {
  //   origin: 'http://localhost:8080',
  //   methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   exposedHeaders: ['Authorization'],
  //   credentials: true,
  // };

  app.enableCors();
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // make sure that incoming request don't have extraneous properties within the body that we are not expecting
    }),
  );
  await app.listen(3000);
}
bootstrap();

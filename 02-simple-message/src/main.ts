import { NestFactory } from '@nestjs/core';
import { MessageModule } from './message/message.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MessageModule);

  // Apply a pipe to global route but we can apply a pipe to just single route handler
  app.useGlobalPipes(
    new ValidationPipe()
  );
  await app.listen(3001);
}
bootstrap();

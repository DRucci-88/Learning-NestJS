import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appSetup } from './app-setup';

export interface ICookieSession {
    id: number;
    email: string;
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    appSetup(app);
    await app.listen(3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        AuthService,
        {
            // Globally scoped interceptors
            provide: APP_INTERCEPTOR,
            useClass: CurrentUserInterceptor,
        },
    ],
    imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './midleware/current-user.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
  imports: [TypeOrmModule.forFeature([User])],
})

/**
 * Why we need to change CurrentUserInterceptor into CurrentUserMiddleware ?
 * Simply because Interceptor is run after any Middleware and Guard
 *
 * Interceptors is executed before and after Request Handler
 *
 * Main Flow:
 * Request -> Middleware -> Guard -> Interceptor -> Request Handler -> Interceptor -> Response
 *
 * Interceptor before RequestHandler can be seen as example of CurrentUserInterceptor that gonna inject User Object from session along request.
 * Interceptor after RequestHandler can be seen at serialize interceptor that transform / formatting Response from entity
 *
 * Back to main question, in this app we have AuthGuard that will lookup User that make a request.
 * But in this scenario, request that hold User will be added after CurrentUserInterceptor executed.
 * AuthGuard will never get a User from request from this scenario because AuthGuard will executed first and then execute CurrentUserInterceptor.
 * Thats why we move from Interceptos into Middleware.
 */
export class UserModule {
  // Global Middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}

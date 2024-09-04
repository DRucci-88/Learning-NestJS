import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Report } from './report/report.entity';
import { APP_PIPE } from '@nestjs/core';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session'); // Compability Issue

@Module({
    imports: [
        UserModule,
        ReportModule,
        TypeOrmModule.forRoot({
            // Root connection
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User, Report],
            synchronize: true, // Development only
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            // Global Pipe
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true, // make sure that incoming request don't have extraneous properties within the body that we are not expecting
            }),
        },
    ],
})
export class AppModule {
    // Global Middleware
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    keys: ['LeRucco'],
                }),
            )
            .forRoutes('*');
    }
}

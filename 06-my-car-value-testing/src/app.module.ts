import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Report } from './report/report.entity';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session'); // Compability Issue

@Module({
    imports: [
        UserModule,
        ReportModule,
        // We need to get ConfigService through DI
        TypeOrmModule.forRootAsync({
            inject: [
                // Tells the DI system to find configuration service which should have config from chosen .env file
                // And we want to get access to that instance during the setup of ORM Module
                ConfigService,
            ],
            useFactory: (config: ConfigService) => {
                // this is DI part
                // Get a copy instance of ConfigService that should have all information from all .env file
                return {
                    type: 'sqlite',
                    database: config.get<string>('DB_NAME'),
                    synchronize: true, // Development only
                    entities: [User, Report],
                };
            },
        }),
        // TypeOrmModule.forRoot({
        //     // Root connection
        //     type: 'sqlite',
        //     database: 'db.sqlite',
        //     entities: [User, Report],
        //     synchronize: true,
        // }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
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

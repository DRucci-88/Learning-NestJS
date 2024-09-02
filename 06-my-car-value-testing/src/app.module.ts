import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Report } from './report/report.entity';

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
    providers: [AppService],
})
export class AppModule {}

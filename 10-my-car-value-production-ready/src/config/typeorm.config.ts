import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

/**
 * This file intended for Type ORM configuration with nest.
 * With this TypeORM can go through with DI system.
 * Go along with test, development and production .env
 */

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions():
        | Promise<TypeOrmModuleOptions>
        | TypeOrmModuleOptions {
        switch (process.env.NODE_ENV) {
            case 'development':
                return {
                    type: this.configService.get<string>('DB_TYPE'),
                    database: this.configService.get<string>('DB_NAME'),
                    autoLoadEntities: true,
                    synchronize: JSON.parse(
                        this.configService.get<string>('SYNCHRONIZE'),
                    ),
                } as TypeOrmModuleOptions;
            case 'test':
                return {
                    type: this.configService.get<string>('DB_TYPE'),
                    database: this.configService.get<string>('DB_NAME'),
                    autoLoadEntities: true,
                    synchronize: true,
                    // JSON.parse(
                    //     this.configService.get<string>('SYNCHRONIZE'),
                    // ),
                    migrationsRun: JSON.parse(
                        this.configService.get<string>('MIGRATIONS_RUN'),
                    ),
                } as TypeOrmModuleOptions;
            case 'production':
                const obj: TypeOrmModuleOptions = {};
                console.log(obj);
                return obj;
            default:
                break;
        }
        return {
            type: 'sqlite',
            synchronize: false,
            database: this.configService.get<string>('DB_NAME'),
            autoLoadEntities: true,
        };
    }
}

import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * This file intented to take care of TypeOrm CLI and get it to work in our project.
 * For that we have to provide tha data-source for cli will use to function appropriately.
 * DataSource instance that will containn the needed database information
 */

export const appDataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ['**/*.entity{.js,.ts}'],
    migrations: [__dirname + '/migration/*{.js,.ts}'],
} as DataSourceOptions);

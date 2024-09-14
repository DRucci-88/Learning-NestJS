import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1726202088427 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'hobby',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'admin',
                        type: 'boolean',
                        default: 'true',
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'report',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { name: 'approved', type: 'boolean', default: 'false' },
                    { name: 'price', type: 'float' },
                    { name: 'make', type: 'string' },
                    { name: 'model', type: 'string' },
                    { name: 'year', type: 'integer' },
                    { name: 'longitude', type: 'float' },
                    { name: 'latitude', type: 'float' },
                    { name: 'mileage', type: 'integer' },
                    { name: 'userId', type: 'integer' },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        Promise.all([
            await queryRunner.query(`DROP TABLE "report"`),
            await queryRunner.query(`DROP TABLE "USER"`),
        ]);
    }
}

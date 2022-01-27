import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTables1643292418891 implements MigrationInterface {
    name = 'AlterTables1643292418891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "color"`);
        await queryRunner.query(`DELETE FROM "breed"`);
        await queryRunner.query(`DELETE FROM "cat"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "color" DROP CONSTRAINT "UQ_27d50a7af8d66d24b81b23fe52a"`);
    }
}

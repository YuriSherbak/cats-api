import {MigrationInterface, QueryRunner} from "typeorm";

export class InitTable1643293287000 implements MigrationInterface {
    name = 'InitTable1643293287000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "color" ("color_id" character varying NOT NULL, "color_name" character varying NOT NULL, CONSTRAINT "UQ_27d50a7af8d66d24b81b23fe52a" UNIQUE ("color_name"), CONSTRAINT "PK_25ee6a7dc7b5899a226a831e539" PRIMARY KEY ("color_id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" character varying NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cat" ("id" character varying NOT NULL, "name" character varying NOT NULL, "age" integer, "cost" integer NOT NULL, "isReserved" boolean NOT NULL DEFAULT false, "breed_id" character varying, "color_id" character varying, "photo" character varying, CONSTRAINT "REL_1bb6c3e1f163e8acc23e16fb7a" UNIQUE ("photo"), CONSTRAINT "PK_7704d5c2c0250e4256935ae31b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "breed" ("breed_id" character varying NOT NULL, "breed_name" character varying NOT NULL, CONSTRAINT "UQ_f270ca8d4dd6474c6e49fbd741d" UNIQUE ("breed_name"), CONSTRAINT "PK_78256278f6d1cde4e9dfe71f2df" PRIMARY KEY ("breed_id"))`);
        await queryRunner.query(`ALTER TABLE "cat" ADD CONSTRAINT "FK_0eb1782b16294674ae5191ffe39" FOREIGN KEY ("breed_id") REFERENCES "breed"("breed_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cat" ADD CONSTRAINT "FK_9de0b473f05fa5a8df6d4a9c29d" FOREIGN KEY ("color_id") REFERENCES "color"("color_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cat" ADD CONSTRAINT "FK_1bb6c3e1f163e8acc23e16fb7a7" FOREIGN KEY ("photo") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat" DROP CONSTRAINT "FK_1bb6c3e1f163e8acc23e16fb7a7"`);
        await queryRunner.query(`ALTER TABLE "cat" DROP CONSTRAINT "FK_9de0b473f05fa5a8df6d4a9c29d"`);
        await queryRunner.query(`ALTER TABLE "cat" DROP CONSTRAINT "FK_0eb1782b16294674ae5191ffe39"`);
        await queryRunner.query(`DROP TABLE "breed"`);
        await queryRunner.query(`DROP TABLE "cat"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "color"`);
    }

}

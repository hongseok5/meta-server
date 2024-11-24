import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMenuEntity1730900417528 implements MigrationInterface {
    name = 'UpdateMenuEntity1730900417528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`menu_id\` varchar(255) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_name\` \`menu_name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`menu_name\` \`menu_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`menu_id\``);
    }

}

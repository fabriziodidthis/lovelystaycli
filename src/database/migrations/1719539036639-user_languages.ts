import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UserLanguages1719539036639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'github_users',
      new TableColumn({
        name: 'user_languages',
        type: 'varchar',
        isArray: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('github_users', 'user_languages')
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class SavedInUpdatedInUserInfo1720487371083
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'github_users',
      new TableColumn({
        name: 'saved_in',
        type: 'timestamp',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('github_users', 'saved_in')
  }
}

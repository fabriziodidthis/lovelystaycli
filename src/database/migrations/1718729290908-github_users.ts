import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class GithubUsers1718729290908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'github_users',
        columns: [
          {
            name: 'userID',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'login',
            type: 'varchar',
            isUnique: true,
            length: '39',
          },
          {
            name: 'node_id',
            type: 'varchar',
            isUnique: true,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('github_users')
  }
}

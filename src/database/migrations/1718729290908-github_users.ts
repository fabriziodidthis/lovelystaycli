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
            name: 'login',
            type: 'varchar',
            isUnique: true,
            length: '39',
          },
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'node_id',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'avatar_url',
            type: 'varchar',
          },
          {
            name: 'gravatar_id',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'html_url',
            type: 'varchar',
          },
          {
            name: 'followers_url',
            type: 'varchar',
          },
          {
            name: 'following_url',
            type: 'varchar',
          },
          {
            name: 'gists_url',
            type: 'varchar',
          },
          {
            name: 'starred_url',
            type: 'varchar',
          },
          {
            name: 'subscriptions_url',
            type: 'varchar',
          },
          {
            name: 'organizations_url',
            type: 'varchar',
          },
          {
            name: 'repos_url',
            type: 'varchar',
          },
          {
            name: 'events_url',
            type: 'varchar',
          },
          {
            name: 'received_events_url',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'site_admin',
            type: 'boolean',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'company',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'blog',
            type: 'varchar',
          },
          {
            name: 'location',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'hireable',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'bio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'twitter_username',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'public_repos',
            type: 'int',
          },
          {
            name: 'public_gists',
            type: 'int',
          },
          {
            name: 'followers',
            type: 'int',
          },
          {
            name: 'following',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('github_users')
  }
}

import { MaxLength, MinLength, Validate } from 'class-validator'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { isGithubUsernameValid } from '../../validators/githubUsername.js'
import { eachError } from '../../validators/eachError.js'

@Entity({ name: 'github_users' })
export class github_users extends BaseEntity {
  @PrimaryGeneratedColumn()
  userID: number

  @Column({
    nullable: false,
    unique: true,
    length: 39,
  })
  @MinLength(1)
  @MaxLength(39)
  @Validate(isGithubUsernameValid)
  @Validate(eachError)
  login: string

  @Column({
    nullable: false,
    unique: true,
  })
  @Validate(eachError)
  id: number

  @Validate(eachError)
  @Column({
    nullable: false,
    unique: true,
  })
  node_id: string
}

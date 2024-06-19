import {
  IsEmail,
  IsFQDN,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator'
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

  @Column()
  avatar_url: string

  @Column()
  @IsFQDN(undefined, {
    message: 'Gravatar ID - $value - is invalid. Please provide a valid ID.',
  })
  gravatar_id: string

  @Column()
  @IsFQDN(undefined, {
    message: 'URL - $value - is invalid. Please provide a valid URL.',
  })
  url: string

  @Column()
  @IsFQDN(undefined, {
    message: 'HTML URL - $value - is invalid. Please provide a valid URL.',
  })
  html_url: string

  @Column()
  @IsFQDN(undefined, {
    message: 'Followers URL - $value - is invalid. Please provide a valid URL.',
  })
  followers_url: string

  @Column()
  @IsFQDN(undefined, {
    message: 'Following URL - $value - is invalid. Please provide a valid URL.',
  })
  following_url: string

  @Column()
  @IsFQDN(undefined, {
    message: 'Gists URL - $value - is invalid. Please provide a valid URL.',
  })
  gists_url: string

  @Column()
  @IsFQDN(undefined, {
    message: 'Starred URL - $value - is invalid. Please provide a valid URL.',
  })
  starred_url: string

  @Column()
  @IsFQDN(undefined, {
    message:
      'Subscriptions URL - $value - is invalid. Please provide a valid URL.',
  })
  subscriptions_url: string

  @Column()
  @IsFQDN(undefined, {
    message:
      'Organizations URL - $value - is invalid. Please provide a valid URL.',
  })
  organizations_url: string

  @Column()
  @IsFQDN(undefined, {
    message: 'Repos URL - $value - is invalid. Please provide a valid URL.',
  })
  repos_url: string

  @Column()
  @IsFQDN(undefined, {
    message: 'Events URL - $value - is invalid. Please provide a valid URL.',
  })
  events_url: string

  @Column()
  @IsFQDN(undefined, {
    message:
      'Received Events URL - $value - is invalid. Please provide a valid URL.',
  })
  received_events_url: string

  @Column({
    nullable: true,
    enum: ['User', 'Organization', 'Enterprise'],
  })
  type: string

  @Column()
  site_admin: boolean

  @Column()
  name: string

  @Column()
  company: string

  @Column()
  blog: string

  @Column()
  location: string

  @Column()
  @IsEmail(undefined, {
    message: 'Email - $value - is invalid. Please provide a valid email.',
  })
  email: string

  @Column()
  hireable: boolean

  @Column()
  bio: string

  @Column()
  @Column()
  twitter_username: string

  @Column()
  @IsFQDN(undefined, {
    message: 'Public Repos - $value - is invalid. Please provide a valid URL.',
  })
  public_repos: string

  @Column()
  @IsFQDN(undefined, {
    message: 'Public Gists - $value - is invalid. Please provide a valid URL.',
  })
  public_gists: string

  @Column()
  followers: number

  @Column()
  following: number

  @Column()
  created_at: string

  @Column()
  updated_at: string
}

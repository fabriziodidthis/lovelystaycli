import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { github_users } from '../entities/github_users.js'
import dotenv from 'dotenv'
dotenv.config()

const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } = process.env

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: `${POSTGRES_USER}`,
  password: `${POSTGRES_PASSWORD}`,
  database: `${POSTGRES_DB}`,
  synchronize: false,
  logging: false,
  entities: [github_users],
  migrations: [`src/database/migrations/**/*.{ts,js}`],
  subscribers: [],
})

export const dataSource = new DataSource(AppDataSource.options)

dataSource
  .initialize()
  .then(async () => {
    // console.log('Database connection established')
  })
  .catch(error => console.log(error))

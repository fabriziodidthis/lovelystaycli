import pgPromise from 'pg-promise'
import dotenv from 'dotenv'
import { debug } from 'console'
dotenv.config()

const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } = process.env

const pgp = pgPromise()
const databaseConnection = {
  host: 'localhost',
  port: 5432,
  database: `${POSTGRES_DB}`,
  user: `${POSTGRES_USER}`,
  password: `${POSTGRES_PASSWORD}`,
  max: 30, // use up to 30 connections
  // to auto-exit on idle, without having to shut down the pool;
  // see https://github.com/vitaly-t/pg-promise#library-de-initialization
  allowExitOnIdle: true,
}
const db = pgp(databaseConnection)
export { db }

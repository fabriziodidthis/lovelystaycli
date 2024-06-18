import pgPromise from 'pg-promise'
import dotenv from 'dotenv'
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
}
const db = pgp(databaseConnection)
export { db }

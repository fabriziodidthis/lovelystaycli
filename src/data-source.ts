import "reflect-metadata"
import { DataSource } from "typeorm"

const {POSTGRES_NAME,POSTGRES_PASSWORD, POSTGRES_USER} = process.env

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_NAME,
    synchronize: false,
    logging: false,
    entities: [`src/database/entities/**/*.{js}`],
    migrations: [`src/database/migrations/**/*.{js}`],
    subscribers: [],
})

export const dataSource = new DataSource(AppDataSource.options);

dataSource.initialize().then(async () => {
    // console.log('Database connection established')
}).catch(error => console.log(error))
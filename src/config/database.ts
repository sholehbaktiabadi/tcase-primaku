import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../services/user/user.entity";
import { Env } from "./env-loader";
import { runSeeders, SeederOptions } from 'typeorm-extension'
import { UserSeeder } from "../seeder/user-seeder";
const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME, DB_PORT } = Env()
const options: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    seeds: [UserSeeder]
}

export const AppDataSource = new DataSource(options)

export async function databaseConnection() {
    try {
        await AppDataSource.initialize()
        console.log('Database connected')
        await runSeeders(AppDataSource)
    } catch (error) {
        console.log(error)
        return error
    }
}
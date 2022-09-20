import { DataSource } from "typeorm";
import { User } from "../services/user/user.entity";
import { Env } from "./env-loader";
const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME } = Env()
export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: 3306,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User]
})

export async function databaseConnection() {
    try {
        await AppDataSource.initialize()
        console.log('Database connected')
    } catch (error) {
        console.log(error)
        return error
    }
}
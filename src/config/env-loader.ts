import * as dotenv from 'dotenv'
dotenv.config()

export const Env = () => ({
    SERVER_PORT: process.env.SERVER_PORT as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    DB_HOST: process.env.DB_HOST as string,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_NAME: process.env.DB_NAME as string,
})
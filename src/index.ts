
import express, { json, Request, Response } from "express";
import { databaseConnection } from "./config/database";
import { Env } from "./config/env-loader";
import { userRoutes } from "./services/user/user.route";

const { SERVER_PORT } = Env()

const app = express()
databaseConnection()
app.use(json())

app.use(userRoutes)
app.get('/', (req: Request, res: Response)=> res.json({ a: 'service running' }))

app.listen(SERVER_PORT)
console.log(`server start on port ${SERVER_PORT}`)
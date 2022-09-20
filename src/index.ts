
import express, { json, Request, Response } from "express";
import { databaseConnection } from "./config/database";
import { Env } from "./config/env-loader";
import { authRoutes } from "./services/auth/auth.route";
import { userRoutes } from "./services/user/user.route";

const { SERVER_PORT } = Env()
const app = express()
databaseConnection()
app.use(json())

const prefix = '/api/'
app.use( prefix, authRoutes)
app.use( prefix, userRoutes)
app.get('/', (req: Request, res: Response)=> res.json({ status: 'service running' }))

app.listen(SERVER_PORT)
console.log(`server start on port ${SERVER_PORT}`)
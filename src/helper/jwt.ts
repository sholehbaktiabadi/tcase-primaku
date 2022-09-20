import { Env } from "../config/env-loader"
import * as jwt from 'jsonwebtoken'

export async function generateAccessToken(id: number) {
    return jwt.sign({ id }, Env().JWT_SECRET, { expiresIn: '1d' })
}
 
export async function generateAccessTokenAdmin(id: number) {
    return jwt.sign({ id }, Env().JWT_SECRET_ADMIN, { expiresIn: '1d' })
}
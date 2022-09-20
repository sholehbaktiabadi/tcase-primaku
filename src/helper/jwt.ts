import { Env } from "../config/env-loader"
import * as jwt from 'jsonwebtoken'

export interface UserJwtPayload {
    id: 9; role: string; iat: number; exp: number
}

export async function generateAccessToken(id: number, role: string) {
    return jwt.sign({ id, role }, Env().JWT_SECRET, { expiresIn: '1d' })
}

export async function generateAccessTokenAdmin(id: number, role: string) {
    return jwt.sign({ id, role }, Env().JWT_SECRET_ADMIN, { expiresIn: '1d' })
}
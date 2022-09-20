import { NextFunction, Request, Response } from "express"
import { Env } from "../config/env-loader"
import { ResErr } from "../helper/response"
import * as jwt from 'jsonwebtoken'
import { UserJwtPayload } from "../helper/jwt"
import { Role } from "../services/user/user.dto"

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if (!authorization) {
      return ResErr(res, 401, 'unauthorization')
    }
    const token = authorization.split(' ')[1]
    try {
      const decoded = jwt.verify(token, Env().JWT_SECRET_ADMIN)
      req.user = decoded
    } catch (err) {
      return ResErr(res, 401, err)
    }
    return next()
}

export const authUser = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if (!authorization) {
      return ResErr(res, 401, 'unauthorization')
    }
    const token = authorization.split(' ')[1]
    try {
      const decoded = jwt.verify(token, Env().JWT_SECRET)
      req.user = decoded
    } catch (err) {
      return ResErr(res, 401, err)
    }
    return next()
}

export const authBoth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if (!authorization) {
      return ResErr(res, 401, 'unauthorization')
    }
    const token = authorization.split(' ')[1]
    try {
      const user : any = jwt.decode(token)
      let decoded: string | jwt.JwtPayload
      decoded = jwt.verify(token, user.role == Role.admin ? Env().JWT_SECRET_ADMIN : Env().JWT_SECRET  )
      req.user = decoded
    } catch (err) {
      return ResErr(res, 401, err)
    }
    return next()
}
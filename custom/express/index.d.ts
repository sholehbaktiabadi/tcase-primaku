declare module Express {
    export interface Request {
      user: string | jwt.JwtPayload
    }
  }
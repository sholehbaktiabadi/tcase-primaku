import { Request, Response } from "express"
import { ResErr, ResOK } from "../../helper/response"
import { AuthService } from "./auth.service"
import { loginValidation } from "./auth.validation"

export class AuthController{
    private authService
    constructor(authService: AuthService){
        this.authService = authService
    }

    login = async (req: Request, res: Response) => {
        try {
            const body = req.body
            const v = loginValidation(body)
            if(v.error){
                return ResErr(res, 400, v.error.message)
            }
            const data = await this.authService.login(v.value.email, v.value.password)
            return ResOK(res, data, 'ok')
        } catch (err) {
            return ResErr(res, 500, err)
        }
    }
}
import { Request, Response } from "express"
import { ResErr, ResOK } from "../../helper/response"
import { UserService } from "./user.service"
import { createUserValidation } from "./user.validation"

export class UserController{
    private userService
    constructor(userService: UserService){
        this.userService = userService
    }

    create = async (req: Request, res: Response) => {
        try {
            const body = req.body
            const v = createUserValidation(body)
            if(v.error){
                return ResErr(res, 400, v.error.message)
            }
            const data = await this.userService.create(body)
            return ResOK(res, data, 'ok')
        } catch (err) {
            return ResErr(res, 500, err as string)
        }
    }
}
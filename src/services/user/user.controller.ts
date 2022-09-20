import { Request, Response } from "express"
import { ResErr, ResOK } from "../../helper/response"
import { UserService } from "./user.service"
import { createUserValidation, paramsValidation } from "./user.validation"

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
            return ResErr(res, 500, err)
        }
    }

    getDetails = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const v = paramsValidation(+id)
            if(v.error){
                return ResErr(res, 400, v.error.message)
            }
            const data = await this.userService.getOne(+id)
            if(!data) return ResErr(res, 404, 'user not found')
            return ResOK(res, data, 'ok')
        } catch (err) {
            return ResErr(res, 500, err)
        }
    }
}
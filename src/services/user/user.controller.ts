import { Request, Response } from "express"
import { ResErr, ResOK } from "../../helper/response"
import { UserService } from "./user.service"
import { createUserValidation, paramsValidation, updateUserValidation } from "./user.validation"

export class UserController{
    private userService
    constructor(userService: UserService){
        this.userService = userService
    }

    create = async (req: Request, res: Response) => {
        try {
            const body = req.body
            const v = createUserValidation(body)
            if(v.error) return ResErr(res, 400, v.error.message)
            const data = await this.userService.create(body)
            return ResOK(res, data, 'ok')
        } catch (err) {
            return ResErr(res, 500, err)
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const body = req.body
            const id = req.params.id
            const vParams = paramsValidation(+id)
            if(vParams.error) return ResErr(res, 400, vParams.error.message)
            const isUserExist = await this.userService.getOne(+id)
            if(!isUserExist) return ResErr(res, 404, 'user not found')
            const vbody = updateUserValidation(body)
            if(vbody.error) return ResErr(res, 400, vbody.error.message)
            isUserExist.email = vbody.value.email ?? isUserExist.email
            isUserExist.name = vbody.value.name ?? isUserExist.name
            isUserExist.role = vbody.value.role ?? isUserExist.role
            const data = await this.userService.update(+id, isUserExist)
            return ResOK(res, data, 'ok')
        } catch (err) {
            return ResErr(res, 500, err)
        }
    }

    getDetails = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const v = paramsValidation(+id)
            if(v.error) return ResErr(res, 400, v.error.message)
            const data = await this.userService.getOne(+id)
            if(!data) return ResErr(res, 404, 'user not found')
            return ResOK(res, data, 'ok')
        } catch (err) {
            return ResErr(res, 500, err)
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const v = paramsValidation(+id)
            if(v.error) return ResErr(res, 400, v.error.message)
            const isUserExist = await this.userService.getOne(+id)
            if(!isUserExist) return ResErr(res, 404, 'user not found')
            const data = await this.userService.delete(+id)
            return ResOK(res, data, 'ok')
        } catch (err) {
            return ResErr(res, 500, err)
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const data = await this.userService.getAll()
            return ResOK(res, data, 'ok')
        } catch (err) {
            return ResErr(res, 500, err)
        }
    }
}
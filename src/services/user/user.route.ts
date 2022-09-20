import { Router } from "express";
import { AppDataSource } from "../../config/database";
import { authAdmin, authBoth } from "../../middleware/middleware";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const userRepository = new UserRepository(AppDataSource)
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const router = Router()
export const userRoutes = [
    router.post('/user', authBoth, userController.create),
    router.get('/user', authBoth, userController.findAll),
    router.get('/user/:id', authBoth, userController.getDetails),
    router.delete('/user/:id', authBoth, userController.delete),
    router.patch('/user/:id', authAdmin, userController.update),
    router.put('/user/:id', authAdmin, userController.updatePassword)

]
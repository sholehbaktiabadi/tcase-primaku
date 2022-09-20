import { Router } from "express";
import { AppDataSource } from "../../config/database";
import { authAdmin } from "../../middleware/middleware";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

const userRepository = new UserRepository(AppDataSource)
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const router = Router()
export const userRoutes = [
    router.post('/user', userController.create),
    router.get('/user/:id', authAdmin, userController.getDetails)
]
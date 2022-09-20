import { Router } from "express";
import { AppDataSource } from "../../config/database";
import { UserRepository } from "../user/user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const userRepository = new UserRepository(AppDataSource)
const authService = new AuthService(userRepository)
const authController = new AuthController(authService)
const router = Router()
export const authRoutes = [
    router.post('/login', authController.login),
]
import { comparePassword } from "../../helper/hashing"
import { generateAccessToken, generateAccessTokenAdmin } from "../../helper/jwt"
import { Role } from "../user/user.dto"
import { UserRepository } from "../user/user.repository"

export class AuthService {
    private userRepo: UserRepository
    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo
    }

    async login(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email)
        if (!user) throw 'user not registered'
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) throw 'password not matches'
        const token: { isAdmin: boolean, token: string } = user.role === Role.admin ?
            { isAdmin: true, token: await generateAccessTokenAdmin(user.id) } : { isAdmin: false, token: await generateAccessToken(user.id) }
        return token
    }

}
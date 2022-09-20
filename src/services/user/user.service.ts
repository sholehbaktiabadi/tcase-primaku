import { hashPassword } from "../../helper/hashing"
import { UserDto } from "./user.dto"
import { UserRepository } from "./user.repository"

export class UserService{
    private userRepo: UserRepository
    constructor(userRepo: UserRepository){
        this.userRepo = userRepo
    }

    async create(dto: UserDto){
        try {
            dto.password = hashPassword(dto.password)
            await this.userRepo.create(dto)
            return { success: true } 
        } catch (error) {
            throw error
        }
    }

    async getAll(){
        try {
            return await this.userRepo.getAll()
        } catch (error) {
            throw error
        }
    }

    async getOne(id: number){
        try {
            return await this.userRepo.getOne(id)
        } catch (error) {
            throw error
        }
    }

    async update(id: number, password: string){
        try {
            return await this.userRepo.updatePassword(id, password)
        } catch (error) {
            throw error
        }
    }

    async delete(id: number){
        try {
            return await this.userRepo.delete(id)
        } catch (error) {
            throw error
        }
    }

}
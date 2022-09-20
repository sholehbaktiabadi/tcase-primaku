import { UpdateResult, DeleteResult } from "typeorm"
import { UserDto } from "./user.dto"
import { User } from "./user.entity"
import { UserRepository } from "./user.repository"

export class UserService{
    private userRepo: UserRepository
    constructor(userRepo: UserRepository){
        this.userRepo = userRepo
    }

    async create(dto: UserDto){
        try {
            return await this.userRepo.create(dto)
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
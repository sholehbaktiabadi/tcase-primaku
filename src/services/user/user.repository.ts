import { DataSource, DeleteResult, UpdateResult } from "typeorm";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";

export class UserRepository{
    private db
    constructor(db: DataSource){
        this.db = db
    }

    async create(dto: UserDto): Promise<User>{
        try {
            return await this.db.getRepository(User).save(dto)
        } catch (error) {
            throw error
        }
    }

    async getAll(): Promise<User[]>{
        try {
            return await this.db.getRepository(User).find()
        } catch (error) {
            throw error
        }
    }

    async getOne(id: number): Promise<User | null>{
        try {
            return await this.db.getRepository(User).findOne({where: {id}})
        } catch (error) {
            throw error
        }
    }

    async updatePassword(id: number, password: string): Promise<UpdateResult>{
        try {
            return await this.db.getRepository(User).update(id, {password})
        } catch (error) {
            throw error
        }
    }

    async delete(id: number): Promise<DeleteResult>{
        try {
            return await this.db.getRepository(User).delete(id)
        } catch (error) {
            throw error
        }
    }

}
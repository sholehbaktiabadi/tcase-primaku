import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { hashPassword } from '../helper/hashing';
import { Role, UserDto } from '../services/user/user.dto';
import { User } from '../services/user/user.entity';

export class UserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void>{
        const userRepository = dataSource.getRepository(User)

        const userEntries: UserDto = {
            name: 'bekti',
            email: 'admin@primaku.com',
            password: hashPassword('#Admin123'),
            role: Role.admin
        }
        
        const isUserExist = await userRepository.findOneBy({ email: userEntries.email })
        if(!isUserExist){
            const newUser = userRepository.create(userEntries)
            await userRepository.save(newUser)
        }
    }
}
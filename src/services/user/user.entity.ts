import { Entity } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Role } from "./user.dto";

@Entity()
export class User{
    @PrimaryGeneratedColumn('increment')
    @Column({ primary: true })
    id!: number

    @Column({name: 'name', type: 'varchar', nullable: false })
    name!: string;

    @Column({name: 'email', type: 'varchar', nullable: false })
    email!: string;
    
    @Column({name: 'password', type: 'text', nullable: false })
    password!: string;

    @Column({name: 'role', type: 'varchar', nullable: false })
    role!: Role
}
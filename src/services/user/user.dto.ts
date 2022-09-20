export class UserDto{
    name!: string
    email!: string
    password!: string
    role!: Role

}

export enum Role{
    user = 'user',
    admin= 'admin'
}
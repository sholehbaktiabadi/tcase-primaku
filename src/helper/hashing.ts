import * as bcrypt from 'bcrypt'

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 10)
}

export const comparePassword = (password: string, encryptedPassword: string) => {
    return bcrypt.compare(password, encryptedPassword)
}
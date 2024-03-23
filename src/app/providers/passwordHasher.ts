import IHashPassword from '../../domain/interfaces/user/hashPassword'
import bcrypt from 'bcryptjs'

export default class PasswordHasher implements IHashPassword {
    private readonly salt: number

    constructor(salt: number = 10) {
        this.salt = salt
    }

    async hash(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, this.salt)
        return hashedPassword
    }

    compare(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }
}
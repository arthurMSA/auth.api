import IHashPassword from '../../domain/interfaces/user/hashPassword'
import bcrypt from 'bcryptjs'

export default class PassowrdHasher implements IHashPassword {
    private readonly salt: number

    constructor(salt: number = 10) {
        this.salt = salt
    }

    async hash(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, this.salt)
        return hashedPassword
    }

    compare(password: string, hashedPassword: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
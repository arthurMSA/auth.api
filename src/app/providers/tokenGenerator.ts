import 'dotenv/config'
import ITokenGenerator from '../../domain/interfaces/user/tokenGenerator'
import jwt from 'jsonwebtoken'

export default class TokenGenerator implements ITokenGenerator {
    private readonly jwtSecret: string = process.env.JWT_SECRET as string

    generate(email: string): string {
        return jwt.sign({ email }, this.jwtSecret)
    }
}
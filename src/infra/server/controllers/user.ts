import { Request, Response } from 'express'
import PasswordHasher from '../../../app/providers/passwordHasher'
import TokenGenerator from '../../../app/providers/tokenGenerator'
import UserServices from '../../../app/services/userServices'
import UserRepository from '../../database/mongodb/repositories/userRepository'
import IUserController from '../interfaces/user/userController'
import { CreateUserDTO } from '../../../domain/dto/user/createUserDto'
import EmailAlreadyExistError from '../../../domain/errors/user/emailAlreadyExistError'

export default class UserController implements IUserController {
    userRepository: UserRepository
    userService: UserServices
    passwordHasher: PasswordHasher
    tokenGenerator: TokenGenerator

    constructor() {
        this.userRepository = new UserRepository()
        this.passwordHasher = new PasswordHasher()
        this.tokenGenerator = new TokenGenerator()
        this.userService = new UserServices(
            this.userRepository,
            this.passwordHasher,
            this.tokenGenerator,
        )
    }

    async createUser(req: Request, res: Response): Promise<any> {
        try {
            const createUserDTO: CreateUserDTO = req.body
            const newUser = await this.userService.createUser(createUserDTO)
            return res.status(200).send({ data: newUser })
        } catch (error) {
            console.log('>>>>', error)
            if (error instanceof EmailAlreadyExistError)
            return res.status(409).send({
                error,
            })
        }
    }
}

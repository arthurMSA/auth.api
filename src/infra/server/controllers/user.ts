import { Request, Response } from 'express'
import PasswordHasher from '../../../app/providers/passwordHasher'
import TokenGenerator from '../../../app/providers/tokenGenerator'
import UserServices from '../../../app/services/userServices'
import UserRepository from '../../database/mongodb/repositories/userRepository'
import IUserController from '../interfaces/user/userController'
import { CreateUserDTO } from '../../../domain/dto/user/createUserDTO'
import EmailAlreadyExistError from '../../../domain/errors/user/emailAlreadyExistError'
import { SignInUserDTO } from '../../../domain/dto/user/signInUserDTO'
import User from '../../../domain/entities/user'
import UserNotFoundError from '../../../domain/errors/user/userNotFoundError'
import InvalidCredentialsError from '../../../domain/errors/user/invalidCredentialsError'

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

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const createUserDTO: CreateUserDTO = req.body
            const newUser: User = await this.userService.create(createUserDTO)
            res.status(200).send({ data: newUser })
        } catch (error) {
            if (error instanceof EmailAlreadyExistError)
            res.status(409).send({
                error,
            })
        }
    }

    async signIn(req: Request, res: Response): Promise<void> {
        try {
            const signInUserDTO: SignInUserDTO = req.body
            const signedUser: User = await this.userService.signIn(signInUserDTO)
            res.status(200).send({ data: signedUser })
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                res.status(404).send({ error })
                return
            }
            if (error instanceof InvalidCredentialsError) {
                res.status(401).send({ error })
            }
            
        }
    }
}

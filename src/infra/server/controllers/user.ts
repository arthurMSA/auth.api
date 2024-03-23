import PasswordHasher from '../../../app/providers/passwordHasher'
import TokenGenerator from '../../../app/providers/tokenGenerator'
import UserServices from '../../../app/services/userServices'
import { CreateUserDTO } from '../../../domain/dto/user/createUserDto'
import UserRepository from '../../database/mongodb/repositories/userRepository'
import IUserController from '../interfaces/user/IUserController'

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

    async createUser(createUserDTO: CreateUserDTO): Promise<any> {
        // eslint-disable-next-line no-useless-catch
        try {
            const newUser = await this.userService.createUser(createUserDTO)
            return {
                data: newUser,
                status: 200,
            }
        } catch (error) {
            throw error
        }
    }
}

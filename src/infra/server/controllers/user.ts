import PassowrdHasher from '../../../app/providers/passwordHasher'
import UserServices from '../../../app/services/userServices'
import { CreateUserDTO } from '../../../domain/dto/user/createUserDto'
import UserRepository from '../../database/mongodb/repositories/userRepository'
import IUserController from '../interfaces/IUserController'

export default class UserController implements IUserController {
    userRepository: UserRepository
    userService: UserServices
    passwordHasher: PassowrdHasher

    constructor() {
        this.userRepository = new UserRepository()
        this.passwordHasher = new PassowrdHasher()
        this.userService = new UserServices(
            this.userRepository,
            this.passwordHasher,
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

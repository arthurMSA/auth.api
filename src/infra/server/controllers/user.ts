import UserServices from '../../../app/service/userServices'
import { CreateUserDTO } from '../../../domain/dto/user/createUserDto'
import UserRepository from '../../mongodb/repositories/userRepository'
import IUserController from '../interfaces/IUserController'

export default class UserController implements IUserController {
    userRepository: UserRepository
    userService: UserServices

    constructor() {
        this.userRepository = new UserRepository()
        this.userService = new UserServices(this.userRepository)
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

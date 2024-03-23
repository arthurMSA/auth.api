import { CreateUserDTO } from '../../domain/dto/user/createUserDto'
import User from '../../domain/entities/user'
import IUserRepository from '../../domain/interfaces/user/userRepository'
import CreateUserUseCase from '../../domain/useCases/createUserUseCase'
import PassowrdHasher from '../providers/passwordHasher'

export default class UserServices {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: PassowrdHasher,
    ) {}
    
    async createUser(createUserDTO: CreateUserDTO): Promise<User>{

        const createUserUseCase = new CreateUserUseCase(this.userRepository, this.passwordHasher)
        const user = await createUserUseCase.execute(createUserDTO)
        return user
    }
}
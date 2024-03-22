import { CreateUserDTO } from '../../domain/dto/user/createUserDto'
import User from '../../domain/entities/user'
import IUserRepository from '../../domain/interfaces/repositories/IUserRepository'
import CreateUserUseCase from '../../domain/useCases/createUserUseCase'

export default class UserServices {
    constructor(
        private userRepository: IUserRepository
    ) {}
    
    async createUser(createUserDTO: CreateUserDTO): Promise<User>{
        const createUserUseCase = new CreateUserUseCase(this.userRepository)
        const user = await createUserUseCase.execute(createUserDTO)
        return user
    }
}
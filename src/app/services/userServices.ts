import { CreateUserDTO } from '../../domain/dto/user/createUserDto'
import User from '../../domain/entities/user'
import IHashPassword from '../../domain/interfaces/user/hashPassword'
import ITokenGenerator from '../../domain/interfaces/user/tokenGenerator'
import IUserRepository from '../../domain/interfaces/user/userRepository'
import CreateUserUseCase from '../../domain/useCases/createUserUseCase'

export default class UserServices {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IHashPassword,
        private tokenGenerator: ITokenGenerator,
    ) {}
    
    async createUser(createUserDTO: CreateUserDTO): Promise<User>{
        const createUserUseCase = new CreateUserUseCase(this.userRepository, this.passwordHasher, this.tokenGenerator)
        const user = await createUserUseCase.execute(createUserDTO)
        return user
    }
}
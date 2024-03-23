import { CreateUserDTO } from '../../domain/dto/user/createUserDto'
import { SignInUserDTO } from '../../domain/dto/user/signInUserDTO'
import User from '../../domain/entities/user'
import IHashPassword from '../../domain/interfaces/user/hashPassword'
import ITokenGenerator from '../../domain/interfaces/user/tokenGenerator'
import IUserRepository from '../../domain/interfaces/user/userRepository'
import CreateUserUseCase from '../../domain/useCases/createUserUseCase'
import SignInUserUseCase from '../../domain/useCases/signInUserUseCase'

export default class UserServices {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IHashPassword,
        private tokenGenerator: ITokenGenerator,
    ) {}
    
    async create(createUserDTO: CreateUserDTO): Promise<User>{
        const createUserUseCase = new CreateUserUseCase(this.userRepository, this.passwordHasher, this.tokenGenerator)
        const user = await createUserUseCase.execute(createUserDTO)
        return user
    }

    async signIn(signInUserDTO: SignInUserDTO): Promise<User>{
        const signInUserUseCase = new SignInUserUseCase(this.userRepository, this.passwordHasher)
        const user = await signInUserUseCase.execute(signInUserDTO)
        return user
    }
}
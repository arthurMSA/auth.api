import { CreateUserDTO } from '../dto/user/createUserDto'
import User from '../entities/user'
import IHashPassword from '../interfaces/user/hashPassword'
import ITokenGenerator from '../interfaces/user/tokenGenerator'
import IUserRepository from '../interfaces/user/userRepository'

export default class CreateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly hashPassword: IHashPassword,
        private readonly tokenGenerator: ITokenGenerator,
    ) {}
    
    async execute(createUserDTO: CreateUserDTO): Promise<User> {
        const emailAlreadyRegistred = await this.userRepository.findUserByEmail(createUserDTO.email) !== null

        if (emailAlreadyRegistred) {
            throw 'EMAIL JA CADASTRADO'
        }

        const hashedPassword = await this.hashPassword.hash(createUserDTO.password)
        const token = this.tokenGenerator.generate(createUserDTO.email)
        return this.userRepository.createUser({
            ...createUserDTO,
            password: hashedPassword,
        }, token)
    }
}
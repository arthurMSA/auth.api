import { CreateUserDTO } from '../dto/user/createUserDto'
import User from '../entities/user'
import IHashPassword from '../interfaces/user/IHashPassword'
import IUserRepository from '../interfaces/user/IUserRepository'

export default class CreateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly hashPassword: IHashPassword,
    ) {}
    
    async execute(createUserDTO: CreateUserDTO): Promise<User> {
        const emailAlreadyRegistred = await this.userRepository.findUserByEmail(createUserDTO.email) !== null

        if (emailAlreadyRegistred) {
            throw 'EMAIL JA CADASTRADO'
        }

        const hashedPassword = await this.hashPassword.hash(createUserDTO.password)
        return this.userRepository.createUser({
            ...createUserDTO,
            password: hashedPassword,
        })
    }
}
import { CreateUserDTO } from '../dto/user/createUserDto'
import User from '../entities/user'
import EmailAlreadyExistError from '../errors/user/emailAlreadyExistError'
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
        const userData = createUserDTO

        userData.email = userData.email.toLowerCase()

        const emailAlreadyRegistred = await this.userRepository.findUserByEmail(userData.email) !== null
        if (emailAlreadyRegistred) {
            throw new EmailAlreadyExistError()
        }

        const hashedPassword = await this.hashPassword.hash(userData.password)
        const token = this.tokenGenerator.generate(userData.email)

        return this.userRepository.createUser({
            ...userData,
            password: hashedPassword,
        }, token)
    }
}
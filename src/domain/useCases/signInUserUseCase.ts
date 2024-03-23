import { SignInUserDTO } from '../dto/user/signInUserDTO'
import User from '../entities/user'
import InvalidCredentialsError from '../errors/user/invalidCredentialsError'
import UserNotFoundError from '../errors/user/userNotFoundError'
import IHashPassword from '../interfaces/user/hashPassword'
import IUserRepository from '../interfaces/user/userRepository'

export default class SignInUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly hashPassword: IHashPassword,
    ) {}
    
    async execute(loginUserDTO: SignInUserDTO): Promise<User> {
        const user = await this.userRepository.findUserByEmail(loginUserDTO.email)
        if (user === null) throw new UserNotFoundError()
        if (!(await this.hashPassword.compare(loginUserDTO.password, user.password as string)))
            throw new InvalidCredentialsError()
        
        delete user.password
        return user
    }
}
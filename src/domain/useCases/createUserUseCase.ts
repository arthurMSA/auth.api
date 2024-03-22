import { CreateUserDTO } from '../dto/user/createUserDto'
import User from '../entities/user'
import IUserRepository from '../interfaces/repositories/IUserRepository'

export default class CreateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}
    
    async execute(createUserDTO: CreateUserDTO): Promise<User> {
        return this.userRepository.createUser(createUserDTO)
    }
}
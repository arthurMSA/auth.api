import { CreateUserDTO } from '../../../../domain/dto/user/createUserDto'
import User from '../../../../domain/entities/user'
import IUserRepository from '../../../../domain/interfaces/repositories/IUserRepository'

export default class UserRepository implements IUserRepository {
    createUser(createUserDTO: CreateUserDTO): Promise<User> {
        return Promise.resolve(new User('arthur', 'arthur', 'arthur', 'arthur'))
    }
    
}
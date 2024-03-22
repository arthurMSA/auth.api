import { CreateUserDTO } from '../../../../domain/dto/user/createUserDto'
import User from '../../../../domain/entities/user'
import IUserRepository from '../../../../domain/interfaces/user/IUserRepository'
import { IUser, UserModel } from '../models/user'

export default class UserRepository implements IUserRepository {
    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        try {
            const newUser: IUser = await UserModel.create(createUserDTO)
            return Promise.resolve(new User(
                newUser.name,
                newUser.email,
                newUser.password,
                newUser.token
            ))
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
}
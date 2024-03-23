import { CreateUserDTO } from '../../../../domain/dto/user/createUserDto'
import User from '../../../../domain/entities/user'
import IUserRepository from '../../../../domain/interfaces/user/IUserRepository'
import { IUser, UserModel } from '../models/user'

export default class UserRepository implements IUserRepository {
    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({ email })
            if (user !== null) return Promise.resolve(new User(
                user.name,
                user.email,
                user.password,
                user.token,
            ))
            return user
        } catch (error) {
            return Promise.reject(error)
        }
        
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        try {
            const newUser: IUser = await UserModel.create(createUserDTO)
            return Promise.resolve(new User(
                newUser.name,
                newUser.email,
                newUser.password,
                newUser.token,
            ))
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
}
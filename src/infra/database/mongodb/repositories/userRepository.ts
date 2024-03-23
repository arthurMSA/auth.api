import { CreateUserDTO } from '../../../../domain/dto/user/createUserDTO'
import User from '../../../../domain/entities/user'
import IUser from '../../../../domain/interfaces/user/user'
import IUserRepository from '../../../../domain/interfaces/user/userRepository'
import { IUserModel, UserModel } from '../models/user'

export default class UserRepository implements IUserRepository {
    async findUserByEmail(email: string): Promise<User | null> {
        try {
            const user: IUserModel | null = await UserModel.findOne({ email })
            if (user !== null) return Promise.resolve(new User(user))
            return user
        } catch (error) {
            return Promise.reject(error)
        }
        
    }

    async createUser(createUserDTO: CreateUserDTO, token: string): Promise<User> {
        try {
            const newUser: IUser = await UserModel.create({ ...createUserDTO, token })
            return Promise.resolve(newUser)
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
}
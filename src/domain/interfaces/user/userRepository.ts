import { CreateUserDTO } from '../../dto/user/createUserDTO'
import User from '../../entities/user'

export default interface IUserRepository {
    createUser: (createUserDTO: CreateUserDTO, token: string) => Promise<User>
    findUserByEmail: (email: string) => Promise<User | null>
}
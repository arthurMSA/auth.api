import { CreateUserDTO } from '../../dto/user/createUserDto'
import User from '../../entities/user'

export default interface IUserRepository {
    createUser: (createUserDTO: CreateUserDTO) => Promise<User>
    findUserByEmail: (email: string) => Promise<User | null>
}
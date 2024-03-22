import PassowrdHasher from '../../../app/providers/passwordHasher'
import UserServices from '../../../app/services/userServices'
import UserRepository from '../../database/mongodb/repositories/userRepository'

export default interface IUserController {
    userService: UserServices,
    userRepository: UserRepository,
    passwordHasher: PassowrdHasher,
}
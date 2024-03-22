import UserServices from '../../../app/services/userServices'
import UserRepository from '../../mongodb/repositories/userRepository'

export default interface IUserController {
    userService: UserServices,
    userRepository: UserRepository,
}
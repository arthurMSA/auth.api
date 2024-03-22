import UserServices from '../../../app/service/userServices'
import UserRepository from '../../mongodb/repositories/userRepository'

export default interface IUserController {
    userService: UserServices,
    userRepository: UserRepository,
}
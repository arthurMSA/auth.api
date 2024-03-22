import { CreateUserDTO } from '../../dto/user/createUserDto'

export interface IUserUseCases {
    createUser: (createUserDTO: CreateUserDTO) => User
}
import PasswordHasher from '../../app/providers/passwordHasher'
import TokenGenerator from '../../app/providers/tokenGenerator'
import UserServices from '../../app/services/userServices'
import { CreateUserDTO } from '../../domain/dto/user/createUserDto'
import User from '../../domain/entities/user'
import EmailAlreadyExistError from '../../domain/errors/user/emailAlreadyExistError'
import IUserRepository from '../../domain/interfaces/user/userRepository'

const mockUserRepository = {
    createUser: jest.fn(),
    findUserByEmail: jest.fn()
}

describe('Create User Use Case', () => {
    const createUserDTO: CreateUserDTO = {
        email: 'test@gmail.com',
        name: 'test',
        password: 'password',
    }
    const user = new User({
        id: 'idtest',
        token: 'tokentest',
        ...createUserDTO,
    })

    it('should create new user', async () => {
        mockUserRepository.findUserByEmail.mockResolvedValue(null)
        mockUserRepository.createUser.mockResolvedValue(user)
        
        const createUserUseCase = new UserServices(mockUserRepository as IUserRepository, new PasswordHasher(), new TokenGenerator())
        const result = await createUserUseCase.create(createUserDTO)

        expect(result).toEqual(user)
    })

    it('should not create user with existing email', async () => {
        mockUserRepository.findUserByEmail.mockResolvedValue(user)
        mockUserRepository.createUser.mockResolvedValue(user)
        
        const createUserUseCase = new UserServices(mockUserRepository as IUserRepository, new PasswordHasher(), new TokenGenerator())
        try {
            await createUserUseCase.create(createUserDTO)
        } catch (error) {
            expect(error).toBeInstanceOf(EmailAlreadyExistError)
        }
    })
})
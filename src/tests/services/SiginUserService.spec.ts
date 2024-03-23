import PasswordHasher from '../../app/providers/passwordHasher'
import TokenGenerator from '../../app/providers/tokenGenerator'
import UserServices from '../../app/services/userServices'
import { SignInUserDTO } from '../../domain/dto/user/signInUserDTO'
import User from '../../domain/entities/user'
import InvalidCredentialsError from '../../domain/errors/user/invalidCredentialsError'
import UserNotFoundError from '../../domain/errors/user/userNotFoundError'
import IUserRepository from '../../domain/interfaces/user/userRepository'

const mockUserRepository = {
    createUser: jest.fn(),
    findUserByEmail: jest.fn()
}

describe('Create User Use Case', () => {
    let user: User
    beforeEach(async () => {
        user = new User({
            id: 'idtest',
            name: 'test',
            email: 'test@gmail.com',
            password: await new PasswordHasher().hash('password'),
            token: 'tokentest',
        })
    })

    it('should sign in user', async () => {
        const signInUserDTO: SignInUserDTO = {
            email: 'test@gmail.com',
            password: 'password',
        }
        mockUserRepository.findUserByEmail.mockResolvedValue(user)
        
        const signInUserUseCase = new UserServices(mockUserRepository as IUserRepository, new PasswordHasher(), new TokenGenerator())
        const result = await signInUserUseCase.signIn(signInUserDTO)
        expect(result).toEqual(user)

    })

    it('should not login with invalid credentials', async () => {
        const signInUserDTO: SignInUserDTO = {
            email: 'test@gmail.com',
            password: 'wrongpassword',
        }

        mockUserRepository.findUserByEmail.mockResolvedValue(user)
        
        const signInUserUseCase = new UserServices(mockUserRepository as IUserRepository, new PasswordHasher(), new TokenGenerator())
        try {
            await signInUserUseCase.signIn(signInUserDTO)
        } catch (error) {
            expect(error).toBeInstanceOf(InvalidCredentialsError)
        }
    })

    it('should not login with invalid credentials', async () => {
        const signInUserDTO: SignInUserDTO = {
            email: 'test@gmail.com',
            password: 'wrongpassword',
        }

        mockUserRepository.findUserByEmail.mockResolvedValue(null)
        
        const signInUserUseCase = new UserServices(mockUserRepository as IUserRepository, new PasswordHasher(), new TokenGenerator())
        try {
            await signInUserUseCase.signIn(signInUserDTO)
        } catch (error) {
            expect(error).toBeInstanceOf(UserNotFoundError)
        }
    })
})
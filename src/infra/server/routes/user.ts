import { Router, Request, Response } from 'express'
import UserController from '../controllers/user'
import { validateParams } from '../middleware/validateParams'
import { createUserSchema, signInUserSchema } from '../schemas/user'

const router = Router()
const userController = new UserController()

router.post('/', validateParams(createUserSchema, 'body'), (req: Request, res: Response) => userController.createUser(req, res))

router.post('/sign-in', validateParams(signInUserSchema, 'body'), (req: Request, res: Response) => userController.signIn(req, res))

export default router

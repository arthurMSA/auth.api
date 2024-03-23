import { Router, Request, Response } from 'express'
import UserController from '../controllers/user'

const router = Router()
const userController = new UserController()

router.post('/', (req: Request, res: Response) => userController.createUser(req, res))

router.post('/sign-in', (req: Request, res: Response) => userController.signIn(req, res))

export default router

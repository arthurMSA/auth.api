import { Router, Request, Response, response } from 'express'
import UserController from '../controllers/user'

const router = Router()
const userController = new UserController()

router.post('/', (req: Request, res: Response) => {
    res.send(userController.createUser(req.body))
})

export default router

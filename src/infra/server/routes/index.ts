import { Express } from 'express'
import user from './user'

export default (app: Express) => {
    app.use('/user', user)
}

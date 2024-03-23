import IUser from '../interfaces/user/user'

export default class User implements IUser {
    id: string
    name: string
    email: string
    password?: string
    token: string

    constructor(user: IUser) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.password = user.password
        this.token = user.token
    }
}
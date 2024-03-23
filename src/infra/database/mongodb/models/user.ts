import { Model, Schema, model } from 'mongoose'
import IUser from '../../../../domain/interfaces/user/user'

export interface IUserModel extends IUser {
    id: string
    name: string,
    email: string,
    password: string,
    token: string,
}

const userSchema: Schema = new Schema<IUser>({
    name: { type: String, requried: true },
    email: { type: String, requried: true },
    password: { type: String, requried: true },
    token: { type: String, requried: true },
})

export const UserModel: Model<IUser> = model<IUser>('User', userSchema)
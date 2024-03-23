import IDBConnection from '../interfaces/dbConnection'
import mongoose from 'mongoose'

export default class MongoDB implements IDBConnection {
    connect(userName: string, password: string, host: string): void {
        const stringConnection = `mongodb+srv://${userName}:${password}@${host}`
        mongoose.connect(stringConnection)
          .then(() => console.log('DB connected'))
          .catch(() => {
            console.log('Connection error')
            //reconnect
          })
    }   
}
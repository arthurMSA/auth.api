import 'dotenv/config'
import express from 'express'
import route from './routes'
import cors from 'cors'
import MongoDB from '../database/mongodb'


const app = express()

app.use(express.json())
app.use(cors())

route(app)

app.listen(3000, () => {
    new MongoDB().connect(
        process.env.DB_USER as string,
        process.env.DB_PASSWORD as string,
        process.env.DB_HOST as string,
    )
    console.log('SERVER RUNNING')
})
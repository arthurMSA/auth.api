import express from 'express'
import route from './routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

route(app)

app.listen(3000, () => {
    console.log('SERVER RUNNING')
})
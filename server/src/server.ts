import express, { Express, Request, Response } from 'express'
import 'dotenv/config'
import morgan from 'morgan'

const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const PORT = process.env.PORT || '5000'

app.use('/', (req: Request, res: Response) => {
  res.status(200).json({
    hello: 'world',
  })
})

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`listening on port ${PORT}`)
})

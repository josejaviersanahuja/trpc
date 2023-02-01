import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import createError, { HttpError } from 'http-errors'
import * as path from 'path'
import * as fs from 'fs'
import logger from 'morgan'

// Init app
const app = express()

// CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}
app.use(cors(corsOptions))

// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 404
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err : HttpError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500).json({ error: err.message })
})

export default app

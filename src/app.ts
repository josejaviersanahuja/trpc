import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import * as path from 'path'
import * as fs from 'fs'
import logger from 'morgan'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './routers'
import { createContext } from './trpc'
import { TRPCError } from '@trpc/server'

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
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/../access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// tRPC
app.use('/trpc', createExpressMiddleware({ router: appRouter, createContext }))

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 404
app.use((req, res, next) => {
  next(new TRPCError({
    code: 'NOT_FOUND',
    message: 'Not Found',
    cause: 'The requested resource could not be found but may be available again in the future.'
  }))
})

// error handler
app.use((err: TRPCError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(500).json(err)
})

export type AppRouter = typeof appRouter

export default app

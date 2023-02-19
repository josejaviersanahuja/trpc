import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'

// create tRPC-Context
export function createContext ({ req, res }: CreateExpressContextOptions) {
  return {
    // add your context here
    req,
    res,
    isAdmin: true
  }
}

// Init trpc
export const t = initTRPC.context<inferAsyncReturnType<typeof createContext>>().create()

// Create Middleware
const isAdminMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not authorized to do this',
      cause: 'the cause is...'
    })
  }
  return next({
    ctx: {
      user: {
        id: '123',
        name: 'John Doe'
      }
    }
  })
})

// Create a procedure middleware
export const adminProcedure = t.procedure.use(isAdminMiddleware)
// go to userRouter to see how to use it

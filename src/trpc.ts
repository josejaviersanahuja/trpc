import { initTRPC } from '@trpc/server'
import { z } from 'zod'

// Init trpc
const t = initTRPC.create()

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({
      name: z.string()
    }))
    .query(({ input }) => {
      return `Hello ${input.name}`
    })
})

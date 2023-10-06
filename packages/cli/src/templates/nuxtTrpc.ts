export const trpcPlugin = `import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'

import { type AppRouter } from '~/server/trpc/routers'

export default defineNuxtPlugin({
  enforce: 'pre',
  setup() {
    const trpc = createTRPCNuxtClient<AppRouter>({
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    })
    return {
      provide: {
        trpc,
      },
    }
  },
})`

export const trpcMain = `import { TRPCError, initTRPC } from '@trpc/server'

import { type Context } from '~/server/trpc/context'

const t = initTRPC.context<Context>().create()

export const publicProcedure = t.procedure
export const privateProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user!,
    },
  })
})
export const router = t.router
export const middleware = t.middleware
`

export const trpcContext = `import { type inferAsyncReturnType } from '@trpc/server'
import { type H3Event } from 'h3'

export async function createContext(event: H3Event) {
  // TODO implement auth
  const user = {
    id: 0
  }
  return {
    user,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
`

export const trpcRouter = `import { publicProcedure, router } from '../trpc'

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return 'world'
  }),
})

export type AppRouter = typeof appRouter

`

export const trpcApi = `import { createNuxtApiHandler } from 'trpc-nuxt'

import { createContext } from '~/server/trpc/context'
import { appRouter } from '~/server/trpc/routers'

export default createNuxtApiHandler({ router: appRouter, createContext })
`

export const trpcHook = `export function useTRPC() {
  return useNuxtApp().$trpc
}
`

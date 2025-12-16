import type { EventHandler } from 'h3'

export function useMiddleware(...middlewares: EventHandler[]): EventHandler {
  return defineEventHandler(async (event) => {
    for (const middleware of middlewares) {
      await middleware(event)
    }
  })
}
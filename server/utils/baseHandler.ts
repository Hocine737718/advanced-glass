import type { EventHandler } from 'h3'
import { requireAuth, requireAdmin } from './auth'

export function createHandler(
  handler: EventHandler,
  options?: {
    auth?: boolean
    admin?: boolean
  }
): EventHandler {
  return defineEventHandler(async (event) => {
    // Apply auth middleware if required
    if (options?.auth) {
      requireAuth(event)
    }
    
    // Apply admin middleware if required
    if (options?.admin) {
      requireAdmin(event)
    }
    
    // Execute the handler
    return handler(event)
  })
}
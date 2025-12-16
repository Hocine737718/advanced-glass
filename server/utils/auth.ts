import { verifyJwt } from './jwt'

// Just export a function, not a handler
export function requireAuth(event: any) {
  const token = getCookie(event, 'auth')
  
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthenticated' })
  }
  
  try {
    const payload = verifyJwt(token)
    event.context.user = payload
    return payload
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
}

export function requireAdmin(event: any) {
  const user = requireAuth(event) // First check auth
  
  if (user.role !== 'ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  
  return user
}
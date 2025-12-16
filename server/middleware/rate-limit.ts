// server/middleware/rate-limit.ts
const rateLimit = new Map<string, { count: number; reset: number }>()

export function rateLimitMiddleware(
  event: any, 
  max: number = 100, 
  windowMs: number = 60000
) {
  const ip = event.node.req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  
  // Clean old entries
  for (const [key, value] of rateLimit.entries()) {
    if (value.reset < now) {
      rateLimit.delete(key)
    }
  }
  
  const record = rateLimit.get(ip)
  
  if (!record) {
    rateLimit.set(ip, { count: 1, reset: now + windowMs })
    return
  }
  
  if (record.reset < now) {
    record.count = 1
    record.reset = now + windowMs
    return
  }
  
  record.count++
  
  if (record.count > max) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests'
    })
  }
}

// Use in routes:
export default defineEventHandler((event) => {
  rateLimitMiddleware(event, 10, 60000) // 10 requests per minute
  // ... rest of handler
})
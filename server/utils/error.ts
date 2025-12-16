// server/middleware/error.ts
export function errorHandler(error: any) {
  console.error('API Error:', error)
  
  // Default error
  const statusCode = error.statusCode || 500
  const message = error.statusMessage || 'Internal Server Error'
  
  return {
    statusCode,
    statusMessage: message,
    data: {
      error: message,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        details: error.message
      })
    }
  }
}

// In your routes:
export default defineEventHandler(async (event) => {
  try {
    // Your logic here
    return { success: true }
  } catch (error: any) {
    throw createError(errorHandler(error))
  }
})
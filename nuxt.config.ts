export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  routeRules: {
    // Public routes
    '/api/auth/**': { cors: true },
    '/api/public/**': { cors: true },
    
    // Admin-only routes
    '/api/admin/**': {
      cors: true,
      // You could add middleware here
    },
    
    // Protected routes (require authentication)
    '/api/content/**': {
      cors: true,
    },
    
    '/api/media/**': {
      cors: true,
    },
    
    // Static file serving
    '/uploads/**': { 
      headers: {
        'Cache-Control': 'public, max-age=31536000'
      }
    }
  },
  
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    databaseUrl: process.env.DATABASE_URL,
    public: {
      apiBase: '/api',
      appName: 'Advanced Glass',
    }
  }
})
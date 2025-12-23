// [file content begin]
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [ 
    '@unhead/vue', 
    '@vueuse/nuxt', 
    '@nuxtjs/i18n'
  ],
  // i18n configuration - corrected for Nuxt 3/4
  i18n: {
    // Strategy options: 'prefix', 'prefix_except_default', 'prefix_and_default', 'no_prefix'
    strategy: 'prefix_except_default',
    defaultLocale: 'fr', // French as default as per your example
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'ar', iso: 'ar-SA', file: 'ar.json', name: 'العربية', dir: 'rtl' }
    ],
    langDir: 'lang',
    detectBrowserLanguage: {
      useCookie: false,      // 🚫 don't save in cookie
      //cookieKey: 'i18n_redirected',
      redirectOn: 'root',    // redirect only on root path
      fallbackLocale: 'fr',  // always fallback to French
      alwaysRedirect: false, // don't try to auto-redirect
    },
    
    // Vue I18n configuration
    //vueI18n: './i18n.config.ts'
  },
  
  css: [
    'sweetalert2/dist/sweetalert2.min.css',
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Edu+TAS+Beginner:wght@400..700&family=Jost:ital,wght@0,100..900;1,100..900&display=swap' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css' },
        { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.15.4/css/all.css' },
        { rel: 'stylesheet', href: '/css/style.css' }
      ]
    }
  },
  
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
// [file content end]
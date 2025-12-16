// server/api/swagger.json.get.ts
export default defineEventHandler(() => {
  return {
    openapi: '3.0.0',
    info: {
      title: 'Advanced Glass API',
      version: '1.0.0',
      description: 'Simple CMS API for Advanced Glass'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local' }
    ],
    paths: {
      '/api/auth/login': {
        post: {
          summary: 'Login',
          tags: ['Auth'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'admin@example.com' },
                    password: { type: 'string', example: 'password123' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Sets auth cookie',
              headers: {
                'Set-Cookie': {
                  schema: { type: 'string' }
                }
              }
            }
          }
        }
      },
      '/api/content': {
        get: {
          summary: 'Get published content',
          tags: ['Content'],
          responses: {
            200: {
              description: 'List of content'
            }
          }
        }
      }
    }
  }
})
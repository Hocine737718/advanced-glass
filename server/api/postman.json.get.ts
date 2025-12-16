// server/api/postman.json.get.ts
export default defineEventHandler(() => {
  return {
    info: {
      name: 'Advanced Glass API',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
    },
    item: [
      {
        name: 'Auth',
        item: [
          {
            name: 'Login',
            request: {
              method: 'POST',
              header: [
                { key: 'Content-Type', value: 'application/json' }
              ],
              url: 'http://localhost:3000/api/auth/login',
              body: {
                mode: 'raw',
                raw: JSON.stringify({
                  email: 'admin@example.com',
                  password: 'password123'
                }, null, 2)
              }
            }
          }
        ]
      },
      {
        name: 'Content',
        item: [
          {
            name: 'Get All Content',
            request: {
              method: 'GET',
              url: 'http://localhost:3000/api/content'
            }
          },
          {
            name: 'Create Content',
            request: {
              method: 'POST',
              header: [
                { key: 'Content-Type', value: 'application/json' }
              ],
              url: 'http://localhost:3000/api/content',
              body: {
                mode: 'raw',
                raw: JSON.stringify({
                  title: 'My Page',
                  slug: 'my-page',
                  content: 'Content here',
                  type: 'page'
                }, null, 2)
              }
            }
          }
        ]
      }
    ]
  }
})
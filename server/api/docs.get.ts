// server/api/docs.get.ts
export default defineEventHandler(() => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Advanced Glass API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css">
  <style>
    body { margin: 0; }
    #swagger-ui { padding: 20px; }
    .swagger-ui .topbar { display: none; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
  
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: '/api/swagger.json',
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout",
        deepLinking: true,
        docExpansion: 'none'
      })
      
      // Enable CORS requests from Swagger UI
      window.ui = ui
    }
  </script>
</body>
</html>
  `
})
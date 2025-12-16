// server/api/swagger.json.get.ts
export default defineEventHandler(() => {
  return {
    openapi: "3.1.0",
    info: {
      title: "Advanced Glass CMS API",
      version: "1.0.0",
      description: "Complete API documentation for Advanced Glass Content Management System",
      contact: {
        name: "Advanced Glass Support",
        email: "support@advancedglass.com"
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development Server"
      },
      {
        url: "https://api.advancedglass.com",
        description: "Production Server"
      }
    ],
    tags: [
      { name: "Authentication", description: "User authentication endpoints" },
      { name: "Users", description: "User management endpoints" },
      { name: "Content", description: "Content management endpoints" },
      { name: "Media", description: "File upload and management" },
      { name: "System", description: "System health and documentation" }
    ],
    paths: {
      // ==================== AUTHENTICATION ====================
      "/api/auth/login": {
        post: {
          tags: ["Authentication"],
          summary: "User login",
          description: "Authenticate user with email and password. Returns JWT token in cookie.",
          operationId: "login",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      example: "admin@advancedglass.com"
                    },
                    password: {
                      type: "string",
                      format: "password",
                      minLength: 8,
                      example: "Admin@123"
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Login successful",
              headers: {
                "Set-Cookie": {
                  schema: { type: "string" },
                  description: "JWT token stored in 'auth' cookie (HTTP-only)"
                }
              },
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      email: { type: "string", example: "admin@advancedglass.com" },
                      role: { type: "string", example: "ADMIN" }
                    }
                  }
                }
              }
            },
            "400": {
              description: "Bad request - validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "401": {
              description: "Invalid credentials",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },

      "/api/auth/logout": {
        post: {
          tags: ["Authentication"],
          summary: "User logout",
          description: "Clear authentication cookie",
          operationId: "logout",
          responses: {
            "200": {
              description: "Logout successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Logged out successfully" }
                    }
                  }
                }
              }
            }
          }
        }
      },

      "/api/auth/me": {
        get: {
          tags: ["Authentication"],
          summary: "Get current user info",
          description: "Returns information about currently authenticated user",
          operationId: "getCurrentUser",
          security: [{ cookieAuth: [] }],
          responses: {
            "200": {
              description: "User information",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      sub: { type: "integer", example: 1 },
                      email: { type: "string", example: "admin@advancedglass.com" },
                      role: { type: "string", example: "ADMIN" }
                    }
                  }
                }
              }
            },
            "401": {
              description: "Not authenticated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },

      // ==================== USERS ====================
      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users",
          description: "Retrieve list of all users (Admin only)",
          operationId: "getUsers",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "skip",
              in: "query",
              description: "Number of records to skip",
              schema: { type: "integer", minimum: 0, default: 0 }
            },
            {
              name: "take",
              in: "query",
              description: "Number of records to return",
              schema: { type: "integer", minimum: 1, maximum: 100, default: 50 }
            }
          ],
          responses: {
            "200": {
              description: "List of users",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            },
            "401": {
              description: "Not authenticated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "403": {
              description: "Not authorized (requires ADMIN role)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },

      // ==================== CONTENT ====================
      "/api/content": {
        get: {
          tags: ["Content"],
          summary: "Get published content",
          description: "Retrieve published content (public endpoint)",
          operationId: "getPublishedContent",
          parameters: [
            {
              name: "lang",
              in: "query",
              description: "Language code (default: 'en')",
              schema: { type: "string", default: "en" }
            },
            {
              name: "type",
              in: "query",
              description: "Filter by content type",
              schema: {
                type: "string",
                enum: ["page", "post", "product", "service"]
              }
            },
            {
              name: "skip",
              in: "query",
              description: "Number of records to skip",
              schema: { type: "integer", minimum: 0, default: 0 }
            },
            {
              name: "take",
              in: "query",
              description: "Number of records to return",
              schema: { type: "integer", minimum: 1, maximum: 100, default: 50 }
            }
          ],
          responses: {
            "200": {
              description: "List of published content",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Content" }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ["Content"],
          summary: "Create new content",
          description: "Create new content item (Admin only)",
          operationId: "createContent",
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateContent" }
              }
            }
          },
          responses: {
            "201": {
              description: "Content created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Content" }
                }
              }
            },
            "400": {
              description: "Bad request (validation error or slug exists)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "401": {
              description: "Not authenticated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "403": {
              description: "Not authorized (requires ADMIN role)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },

      "/api/content/{id}": {
        get: {
          tags: ["Content"],
          summary: "Get content by ID",
          description: "Retrieve specific content item by ID",
          operationId: "getContentById",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Content ID",
              schema: { type: "integer" }
            }
          ],
          responses: {
            "200": {
              description: "Content details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Content" }
                }
              }
            },
            "404": {
              description: "Content not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        },
        put: {
          tags: ["Content"],
          summary: "Update content",
          description: "Update existing content item (Admin only)",
          operationId: "updateContent",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Content ID",
              schema: { type: "integer" }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateContent" }
              }
            }
          },
          responses: {
            "200": {
              description: "Content updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Content" }
                }
              }
            },
            "400": {
              description: "Bad request (validation error or slug exists)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "401": {
              description: "Not authenticated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "403": {
              description: "Not authorized (requires ADMIN role)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "404": {
              description: "Content not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        },
        delete: {
          tags: ["Content"],
          summary: "Delete content",
          description: "Delete content item (Admin only)",
          operationId: "deleteContent",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Content ID",
              schema: { type: "integer" }
            }
          ],
          responses: {
            "200": {
              description: "Content deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Content deleted successfully" }
                    }
                  }
                }
              }
            },
            "401": {
              description: "Not authenticated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "403": {
              description: "Not authorized (requires ADMIN role)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "404": {
              description: "Content not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },

      // ==================== MEDIA ====================
      "/api/media": {
        get: {
          tags: ["Media"],
          summary: "Get media files",
          description: "Retrieve list of uploaded media files",
          operationId: "getMedia",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "skip",
              in: "query",
              description: "Number of records to skip",
              schema: { type: "integer", minimum: 0, default: 0 }
            },
            {
              name: "take",
              in: "query",
              description: "Number of records to return",
              schema: { type: "integer", minimum: 1, maximum: 100, default: 50 }
            },
            {
              name: "orderBy",
              in: "query",
              description: "Sort order",
              schema: {
                type: "string",
                enum: ["asc", "desc"],
                default: "desc"
              }
            }
          ],
          responses: {
            "200": {
              description: "List of media files",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Media" }
                  }
                }
              }
            },
            "401": {
              description: "Not authenticated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },

      "/api/media/upload": {
        post: {
          tags: ["Media"],
          summary: "Upload media file",
          description: "Upload a new media file (Admin only, max 10MB)",
          operationId: "uploadMedia",
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["file"],
                  properties: {
                    file: {
                      type: "string",
                      format: "binary",
                      description: "File to upload (images, PDF, documents)"
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "File uploaded successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      media: { $ref: "#/components/schemas/Media" },
                      url: { type: "string", format: "uri" }
                    }
                  }
                }
              }
            },
            "400": {
              description: "No file uploaded or invalid file type",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "401": {
              description: "Not authenticated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "403": {
              description: "Not authorized (requires ADMIN role)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "413": {
              description: "File too large (max 10MB)"
            }
          }
        }
      },

      "/api/media/{id}": {
        delete: {
          tags: ["Media"],
          summary: "Delete media file",
          description: "Delete a media file by ID (Admin only)",
          operationId: "deleteMedia",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Media file ID",
              schema: { type: "integer" }
            }
          ],
          responses: {
            "200": {
              description: "File deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      message: { type: "string", example: "File deleted successfully" }
                    }
                  }
                }
              }
            },
            "401": {
              description: "Not authenticated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "403": {
              description: "Not authorized (requires ADMIN role)",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            },
            "404": {
              description: "Media file not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" }
                }
              }
            }
          }
        }
      },

      // ==================== SYSTEM ====================
      "/api/health": {
        get: {
          tags: ["System"],
          summary: "Health check",
          description: "Check if API is running",
          operationId: "healthCheck",
          responses: {
            "200": {
              description: "API is healthy",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", example: "ok" },
                      timestamp: { type: "string", format: "date-time" },
                      version: { type: "string", example: "1.0.0" }
                    }
                  }
                }
              }
            }
          }
        }
      },

      "/api/docs": {
        get: {
          tags: ["System"],
          summary: "API Documentation UI",
          description: "Interactive Swagger UI for API testing",
          operationId: "getDocsUI",
          responses: {
            "200": {
              description: "HTML documentation page"
            }
          }
        }
      },

      "/api/postman.json": {
        get: {
          tags: ["System"],
          summary: "Postman Collection",
          description: "Download Postman collection for API testing",
          operationId: "getPostmanCollection",
          responses: {
            "200": {
              description: "Postman collection JSON",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      info: { type: "object" },
                      item: { type: "array" }
                    }
                  }
                }
              }
            }
          }
        }
      },

      "/api/swagger.json": {
        get: {
          tags: ["System"],
          summary: "OpenAPI Specification",
          description: "This OpenAPI specification document",
          operationId: "getOpenAPISpec",
          responses: {
            "200": {
              description: "OpenAPI specification",
              content: {
                "application/json": {
                  schema: {
                    type: "object"
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        // Error Schema
        Error: {
          type: "object",
          properties: {
            statusCode: { type: "integer", example: 400 },
            statusMessage: { type: "string", example: "Bad Request" },
            data: {
              type: "object",
              properties: {
                error: { type: "string" },
                timestamp: { type: "string", format: "date-time" }
              }
            }
          }
        },

        // User Schema
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            email: { type: "string", format: "email", example: "admin@advancedglass.com" },
            role: { type: "string", enum: ["ADMIN", "USER"], example: "ADMIN" },
            is_active: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },

        // Content Schemas
        Content: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Home Page" },
            slug: { type: "string", example: "home-page" },
            content: { type: "string", example: "Welcome to Advanced Glass" },
            excerpt: { type: "string", example: "Welcome excerpt" },
            type: {
              type: "string",
              enum: ["page", "post", "product", "service"],
              example: "page"
            },
            status: {
              type: "string",
              enum: ["draft", "published", "archived"],
              example: "published"
            },
            language: { type: "string", example: "en" },
            featured: { type: "boolean", example: false },
            order: { type: "integer", example: 0 },
            seoTitle: { type: "string", example: "Advanced Glass - Home" },
            seoDescription: { type: "string", example: "Premium glass solutions" },
            seoKeywords: { type: "string", example: "glass, windows, doors" },
            featuredImage: { type: "string", nullable: true },
            authorId: { type: "integer", nullable: true, example: 1 },
            publishedAt: { type: "string", format: "date-time", nullable: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            author: {
              type: "object",
              properties: {
                id: { type: "integer" },
                email: { type: "string" }
              },
              nullable: true
            }
          }
        },

        CreateContent: {
          type: "object",
          required: ["title", "slug", "type"],
          properties: {
            title: { type: "string", minLength: 1, example: "Home Page" },
            slug: {
              type: "string",
              pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
              example: "home-page"
            },
            content: { type: "string", nullable: true },
            excerpt: { type: "string", nullable: true },
            type: {
              type: "string",
              enum: ["page", "post", "product", "service"],
              example: "page"
            },
            status: {
              type: "string",
              enum: ["draft", "published", "archived"],
              default: "draft"
            },
            language: { type: "string", default: "en" },
            featured: { type: "boolean", default: false },
            order: { type: "integer", default: 0, minimum: 0 },
            seoTitle: { type: "string", nullable: true },
            seoDescription: { type: "string", nullable: true },
            seoKeywords: { type: "string", nullable: true },
            featuredImage: { type: "string", nullable: true },
            publishedAt: { type: "string", format: "date-time", nullable: true }
          }
        },

        UpdateContent: {
          type: "object",
          properties: {
            title: { type: "string", minLength: 1, example: "Updated Home Page" },
            slug: {
              type: "string",
              pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
              example: "updated-home-page"
            },
            content: { type: "string", nullable: true },
            excerpt: { type: "string", nullable: true },
            type: {
              type: "string",
              enum: ["page", "post", "product", "service"]
            },
            status: {
              type: "string",
              enum: ["draft", "published", "archived"]
            },
            language: { type: "string" },
            featured: { type: "boolean" },
            order: { type: "integer", minimum: 0 },
            seoTitle: { type: "string", nullable: true },
            seoDescription: { type: "string", nullable: true },
            seoKeywords: { type: "string", nullable: true },
            featuredImage: { type: "string", nullable: true },
            publishedAt: { type: "string", format: "date-time", nullable: true }
          }
        },

        // Media Schema
        Media: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            filename: { type: "string", example: "image-12345.jpg" },
            originalName: { type: "string", example: "my-photo.jpg" },
            path: { type: "string", example: "/uploads/image-12345.jpg" },
            mimeType: { type: "string", example: "image/jpeg" },
            size: { type: "integer", example: 2048576 },
            altText: { type: "string", nullable: true },
            caption: { type: "string", nullable: true },
            uploadedById: { type: "integer", nullable: true, example: 1 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            uploadedBy: {
              type: "object",
              properties: {
                id: { type: "integer" },
                email: { type: "string" }
              },
              nullable: true
            }
          }
        }
      },
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "auth",
          description: "JWT token stored in HTTP-only cookie"
        }
      }
    },
    security: [
      {
        cookieAuth: []
      }
    ],
    externalDocs: {
      description: "Advanced Glass Documentation",
      url: "https://docs.advancedglass.com"
    }
  }
})
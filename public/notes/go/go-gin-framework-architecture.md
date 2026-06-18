# Gin Framework Architecture

> **Gin** is a high-performance HTTP web framework built on `httprouter`—minimal API, middleware chains, JSON binding.

## Minimal server

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default() // Logger + Recovery middleware

    r.GET("/health", func(c *gin.Context) {
        c.JSON(200, gin.H{"status": "ok"})
    })

    r.Run(":8080")
}
```

## Routing

```go
v1 := r.Group("/api/v1")
{
    v1.GET("/users/:id", getUser)
    v1.POST("/users", createUser)
}
```

Path params via `c.Param("id")`, query via `c.Query("page")`.

## Middleware chain

```go
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.AbortWithStatusJSON(401, gin.H{"error": "unauthorized"})
            return
        }
        c.Next()
    }
}

r.Use(AuthMiddleware())
```

Execution order: global middleware → group middleware → handler. `c.Abort()` stops the chain.

## Request binding and validation

```go
type CreateUserRequest struct {
    Email string `json:"email" binding:"required,email"`
    Name  string `json:"name" binding:"required,min=2"`
}

func createUser(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    // ...
}
```

## Why Gin for backends?

| Feature | Benefit |
|---------|---------|
| Radix tree router | Fast path matching |
| Low allocation design | Strong throughput vs stdlib alone |
| Middleware ecosystem | Auth, CORS, rate limit plugins |

## Production checklist

- Run behind reverse proxy (Nginx, cloud LB)
- Use `context.Context` for timeouts (`c.Request.Context()`)
- Centralize error responses—map `error` to HTTP status in one layer
- Set `GIN_MODE=release` in production

Backend framework hub (if expanded): `03_Backend/01_Frameworks/Gin_Go/`

← [Go MOC](/learning/go-master-moc)

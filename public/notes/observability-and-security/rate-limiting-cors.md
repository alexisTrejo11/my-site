# Rate Limiting & CORS

> Two of the most commonly misconfigured — and misunderstood — web security mechanisms.

---

## Rate Limiting

**Rate limiting** controls how many requests a client can make in a given time window, preventing abuse, DoS attacks, and API overuse.

### Algorithms

#### Token Bucket (most common)
Each client has a bucket with N tokens. Each request consumes one token. Tokens refill at a fixed rate.

```
Bucket capacity: 100 tokens
Refill rate:     10 tokens/second
Current tokens:  45

Request arrives → consume 1 token → 44 remaining
Burst of 44 requests allowed → then throttled until refill
```

#### Fixed Window Counter
Count requests per fixed time window (e.g., 1000 requests per minute). Simple but allows 2x burst at window boundaries.

#### Sliding Window Log
Most accurate — tracks exact timestamps of requests and computes rate in real time.

### Implementation Layers

| Layer | Tools |
|-------|-------|
| API Gateway (preferred) | Kong, AWS API Gateway, Nginx |
| Application code | Spring + Redis, Bucket4j, Resilience4j |
| Infrastructure | Cloudflare, AWS WAF |

### Spring Boot + Bucket4j + Redis

```java
@Bean
public FilterRegistrationBean<RateLimitFilter> rateLimitFilter() {
    FilterRegistrationBean<RateLimitFilter> bean = new FilterRegistrationBean<>();
    bean.setFilter(new RateLimitFilter(redisTemplate, 100, Duration.ofMinutes(1)));
    bean.addUrlPatterns("/api/*");
    return bean;
}
```

### Response Headers (expose to client)
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 42
X-RateLimit-Reset: 1747436400
Retry-After: 30   ← on 429 response
```

---

## CORS (Cross-Origin Resource Sharing)

**CORS** is a browser security mechanism that restricts web pages from making requests to a different **origin** (domain, protocol, or port) than the one that served the page.

### The Problem CORS Solves

```
Your app runs at:  https://myapp.com
Backend API at:    https://api.myapp.com  ← different origin!

Browser blocks the API call by default (Same-Origin Policy)
```

### How CORS Works

**Simple request (GET, POST with basic content types):**
```http
Request:   Origin: https://myapp.com
Response:  Access-Control-Allow-Origin: https://myapp.com  ✅ allowed
```

**Preflight request (OPTIONS, custom headers, PUT/DELETE/PATCH):**
```http
OPTIONS /api/users HTTP/1.1
Origin: https://myapp.com
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: Authorization

HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Max-Age: 3600
```

### Spring Boot CORS Configuration

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("https://myapp.com", "https://www.myapp.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
            .allowedHeaders("Authorization", "Content-Type")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

### Common Mistakes

| Mistake | Consequence |
|---------|-------------|
| `allowedOrigins("*")` with `allowCredentials(true)` | Browser blocks — spec forbids this combination |
| Not handling OPTIONS preflight | All non-simple requests fail in browser |
| Trusting `Origin` header for authorization | Easily spoofed in server-to-server calls; CORS is browser-only |
| Wide `allowedOrigins("*")` in production | Exposes API to any website |

> **Important:** CORS is a **browser** protection. Server-to-server calls (curl, Postman, mobile) bypass CORS entirely. CORS is not an authentication mechanism.

---

## Related Notes

- [[02_Authentication_AuthZ]] — What CORS does NOT replace
- [[04_The_Perfect_API_Design]] — API contracts and versioning
- [[01_The_Three_Pillars]] — Monitoring rate limit violations

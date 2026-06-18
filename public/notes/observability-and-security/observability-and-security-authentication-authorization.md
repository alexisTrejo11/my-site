# Authentication & Authorization

> Authentication answers "Who are you?" Authorization answers "What are you allowed to do?"

---

## The Difference

| Concept | Question | Example |
|---------|----------|---------|
| **Authentication (AuthN)** | Who is this? | Valid JWT, correct password |
| **Authorization (AuthZ)** | What can they do? | `ROLE_ADMIN` can delete; `ROLE_USER` cannot |

Both must be checked on **every request** — never only at login time.

---

## JSON Web Tokens (JWT)

A **JWT** is a signed, compact token that carries claims. It is self-contained — no database lookup needed to verify identity.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   ← Header (Base64)
.eyJzdWIiOiI0MiIsInJvbGVzIjpbIlVTRVIiXSwiZXhwIjoxNzQ3NDM2MDAwfQ  ← Payload (Base64)
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ← Signature (HMAC-SHA256)
```

**Decoded payload:**
```json
{
  "sub": "42",
  "roles": ["USER"],
  "exp": 1747436000,
  "iat": 1747432400
}
```

**JWT Flow:**
```
1. Client: POST /auth/login { username, password }
2. Server: validates, returns { accessToken, refreshToken }
3. Client: stores token (memory for SPA, httpOnly cookie for SSR)
4. Client: includes on every request: Authorization: Bearer <token>
5. Server: validates signature + expiry — no DB hit required
```

**Security rules:**
- Access tokens should be **short-lived** (15–60 minutes)
- Refresh tokens are **long-lived** (days/weeks) and stored securely
- Never store tokens in `localStorage` (XSS vulnerable) — use `httpOnly` cookies
- Always validate `exp`, `iss`, and `aud` claims

---

## OAuth2 / OIDC

**OAuth2** is an authorization delegation framework — it allows a user to grant a third-party limited access to their resources without sharing credentials.

**OIDC (OpenID Connect)** adds an authentication layer on top of OAuth2 via the `id_token`.

### Authorization Code Flow (most secure)
```
1. User clicks "Login with Google"
2. App redirects to Google's authorization endpoint
3. User authenticates at Google
4. Google redirects back with authorization code
5. App server exchanges code for access_token + id_token (server-to-server)
6. App validates id_token, establishes session
```

### Spring Security OAuth2 Setup
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.decoder(jwtDecoder()))
            )
            .build();
    }
}
```

---

## Session-Based Auth vs Token-Based Auth

| | Sessions | JWT |
|--|----------|-----|
| State | Stateful (DB/Redis lookup) | Stateless (self-contained) |
| Revocation | Immediate (delete session) | Hard (must wait for expiry or use blocklist) |
| Horizontal scaling | Needs sticky sessions or shared store | Any node can verify |
| Storage | Server-side store | Client-side (cookie/memory) |
| Use for | Traditional web apps | APIs, microservices, mobile |

---

## Role-Based Access Control (RBAC)

```java
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/users/{id}")
public void deleteUser(@PathVariable Long id) { ... }

@PreAuthorize("hasRole('USER') and #id == authentication.principal.id")
@GetMapping("/users/{id}/profile")
public UserProfile getProfile(@PathVariable Long id) { ... }
```

---

## Related Notes

- [Rate Limiting CORS](/learning/observability-and-security-rate-limiting-cors) — Protection boundaries around authenticated APIs
- Security — Spring Boot Security integration
- [The Three Pillars](/learning/observability-and-security-three-pillars-observability) — Audit logging for auth events

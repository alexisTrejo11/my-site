# Welcome to the Machine

> Every backend system is fundamentally a machine that listens, processes, and responds. This note maps the core model.

---

## The Client-Server Model

A **client** is any program that sends a request. A **server** is any program that listens for requests and sends back a response. This asymmetry — client asks, server answers — is the bedrock of backend engineering.

```
Browser (Client)  ──── HTTP Request ────▶  Backend Server
                  ◀─── HTTP Response ────  (processes & returns data)
```

---

## The HTTP Request/Response Lifecycle

When a user hits `https://api.example.com/users/42`, the following chain fires:

1. **DNS Resolution** — Domain name resolved to an IP address
2. **TCP Handshake** — Connection established between client and server (3-way: SYN, SYN-ACK, ACK)
3. **TLS Handshake** — Encrypted channel negotiated (HTTPS)
4. **HTTP Request sent** — Method + Path + Headers + Optional Body
5. **Server Processing** — Router → Middleware → Controller → Service → Repository → Database
6. **HTTP Response returned** — Status code + Headers + Body (JSON, HTML, etc.)
7. **Connection teardown** — TCP FIN sequence (or kept alive for reuse)

---

## Anatomy of an HTTP Request

```http
GET /users/42 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Accept: application/json
```

| Component | Description |
|-----------|-------------|
| Method | Intent: GET (read), POST (create), PUT/PATCH (update), DELETE (remove) |
| Path | Resource identifier |
| Headers | Metadata: auth tokens, content type, caching directives |
| Body | Payload for POST/PUT/PATCH requests |

---

## Anatomy of an HTTP Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=60

{ "id": 42, "name": "Alex", "email": "alex@example.com" }
```

| Status Range | Meaning |
|---|---|
| 2xx | Success |
| 3xx | Redirect |
| 4xx | Client error (bad request, unauthorized, not found) |
| 5xx | Server error (crash, timeout, overload) |

---

## What Lives Inside a Backend Server

```
Incoming Request
      │
      ▼
 [ Router ]         ← maps URL + method to a handler
      │
      ▼
 [ Middleware ]      ← auth check, rate limit, logging, CORS
      │
      ▼
 [ Controller ]      ← receives request, delegates to business logic
      │
      ▼
 [ Service Layer ]   ← orchestrates use cases, applies business rules
      │
      ▼
 [ Repository ]      ← abstracts database access
      │
      ▼
 [ Database ]        ← PostgreSQL, MongoDB, Redis...
```

---

## Related Notes

- The Backend Glosary — Full vocabulary reference
- [The Perfect API Design](/learning/introduction-api-design) — REST, RPC, GraphQL contracts
- [Sync vs Async](/learning/communication-patterns-sync-vs-async) — How requests are processed concurrently

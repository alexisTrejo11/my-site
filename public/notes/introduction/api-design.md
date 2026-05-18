# The Perfect API Design

> An API is a contract. Bad contracts create debt. Great contracts create ecosystems.

---

## What is an API?

An **Application Programming Interface (API)** is a defined communication boundary between systems. It specifies:
- **What** operations are available
- **How** to invoke them (verbs, inputs)
- **What** to expect back (outputs, errors)

---

## The Three Dominant Paradigms

### 1. REST (Representational State Transfer)

The most widely adopted style. Resources are nouns, HTTP methods are verbs.

| HTTP Method | Operation | Example |
|-------------|-----------|---------|
| GET | Read | `GET /users/42` |
| POST | Create | `POST /users` |
| PUT | Replace | `PUT /users/42` |
| PATCH | Partial update | `PATCH /users/42` |
| DELETE | Delete | `DELETE /users/42` |

**REST Constraints:**
1. **Stateless** — Server holds no session state between requests
2. **Uniform Interface** — Consistent resource identifiers (URIs)
3. **Cacheable** — Responses declare if they can be cached
4. **Layered** — Client can't tell if it's talking to a gateway, CDN, or origin
5. **Client-Server** — Clear separation of concerns

**When to use REST:** Public APIs, CRUD-heavy services, web/mobile clients.

---

### 2. gRPC (Google Remote Procedure Call)

Binary protocol over HTTP/2. Services define **contracts in Protobuf** — strongly typed, schema-first.

```protobuf
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (stream User);
}

message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}
```

**Advantages:** 10x smaller payloads vs JSON, bi-directional streaming, generated client SDKs.

**When to use gRPC:** Internal microservice-to-microservice communication, high-throughput APIs.

---

### 3. GraphQL

Client specifies exactly what data it needs. No over-fetching, no under-fetching.

```graphql
query {
  user(id: 42) {
    name
    email
    orders(last: 5) {
      id
      total
    }
  }
}
```

**When to use GraphQL:** Complex frontends with diverse data needs, BFF (Backend for Frontend) pattern.

---

## REST API Design Best Practices

### Naming Conventions
```
✅  GET  /users              (plural noun, collection)
✅  GET  /users/42           (single resource by ID)
✅  POST /users/42/orders    (nested resource)
❌  GET  /getUser            (verb in URL)
❌  POST /user/create        (verb + singular)
```

### Response Contracts
Always include consistent envelope structure:
```json
{
  "data": { ... },
  "error": null,
  "meta": { "timestamp": "2026-05-16T21:00:00Z", "version": "v1" }
}
```

### HTTP Status Codes — The Non-Negotiables
| Code | When to use |
|------|-------------|
| `200 OK` | Successful read/update |
| `201 Created` | Successful resource creation (include `Location` header) |
| `204 No Content` | Successful delete |
| `400 Bad Request` | Malformed input — always include validation details |
| `401 Unauthorized` | Missing/invalid authentication |
| `403 Forbidden` | Authenticated but lacks permission |
| `404 Not Found` | Resource doesn't exist |
| `409 Conflict` | State conflict (duplicate, optimistic lock) |
| `422 Unprocessable` | Semantic validation failure |
| `429 Too Many Requests` | Rate limit exceeded |
| `500 Internal Server Error` | Unhandled exception — never expose stack traces |

### Versioning Strategies
| Strategy | Example | Tradeoff |
|---|---|---|
| URI Path | `/v1/users` | Simple, breaks bookmarks on version change |
| Header | `Accept: application/vnd.api.v1+json` | Clean URLs, harder to test |
| Query param | `/users?version=1` | Easy to add, pollutes query strings |

---

## API Design Checklist

- [ ] Resources are nouns (plural)
- [ ] HTTP methods map to CRUD intent
- [ ] Error responses include machine-readable codes + human messages
- [ ] Pagination implemented (cursor or page-based)
- [ ] Authentication scheme documented
- [ ] API versioned from day 1
- [ ] Rate limiting headers exposed (`X-RateLimit-Limit`, `X-RateLimit-Remaining`)
- [ ] OpenAPI / Swagger spec maintained

---

## Related Notes

- [[02_The_Backend_Glosary]] — API, REST, RPC, GraphQL definitions
- [[02_gRPC_Deep_Dive]] — gRPC internals
- [[03_Serialization_Protocols]] — JSON vs Protobuf vs Avro
- [[REST_Controllers]] — Spring Boot REST implementation

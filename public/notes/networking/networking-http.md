# HTTP

> Hypertext Transfer Protocol — request/response semantics, methods, headers, status codes, and HTTP/1.1 vs HTTP/2.

**HTTP** (Hypertext Transfer Protocol) is the **application-layer** protocol behind the web. Clients (browsers, mobile apps, services) send **requests**; servers return **responses** with status codes, headers, and optional bodies. By default HTTP is **plain text** on the wire — see [HTTPS](/learning/networking-https) and [TLS](/learning/networking-tls) for encryption.

---

## Request/response model

Each exchange is (mostly) **stateless**: the server does not inherently remember prior requests unless you add **cookies**, **sessions**, or **tokens**.

**Request line (HTTP/1.1 example):**

```
GET /api/users HTTP/1.1
Host: api.example.com
Accept: application/json
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/json

{"id": 1, "name": "Ada"}
```

---

## Common methods

| Method | Typical use | Safe | Idempotent |
| ------ | ----------- | ---- | ---------- |
| **GET** | Read resource | Yes | Yes |
| **POST** | Create / action | No | No |
| **PUT** | Replace resource | No | Yes |
| **PATCH** | Partial update | No | No |
| **DELETE** | Remove resource | No | Yes |
| **HEAD** | Like GET, no body | Yes | Yes |
| **OPTIONS** | CORS preflight | Yes | Yes |

**Safe** = should not change server state. **Idempotent** = repeated calls have the same effect as one.

---

## Status codes (families)

| Range | Meaning | Examples |
| ----- | ------- | -------- |
| **1xx** | Informational | 100 Continue |
| **2xx** | Success | 200 OK, 201 Created, 204 No Content |
| **3xx** | Redirection | 301 Moved, 304 Not Modified |
| **4xx** | Client error | 400 Bad Request, 401 Unauthorized, 404 Not Found, 429 Too Many Requests |
| **5xx** | Server error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

---

## Important headers

| Header | Purpose |
| ------ | ------- |
| `Host` | Virtual hosting — which site on shared IP |
| `Content-Type` | Body format (`application/json`, `text/html`) |
| `Authorization` | Credentials / bearer tokens |
| `Cookie` / `Set-Cookie` | Session state |
| `Cache-Control` | Caching behavior |
| `User-Agent` | Client identification |

---

## HTTP versions

| Version | Transport | Notes |
| ------- | --------- | ----- |
| **HTTP/1.1** | [TCP](/learning/networking-tcp) | One request per connection (or pipelining, rarely used); head-of-line blocking |
| **HTTP/2** | [TCP](/learning/networking-tcp) + TLS usually | Multiplexed streams, header compression (HPACK), binary framing |
| **HTTP/3** | QUIC (UDP-based) | Faster setup, less head-of-line blocking (planned note: QUIC) |

[GRPC](/learning/networking-grpc) builds on **HTTP/2** semantics.

---

## URLs and DNS

A URL like `https://api.example.com/v1/users` uses:

- **Scheme** — `http` or `https`
- **Host** — resolved via [DNS](/learning/networking-dns) to an [IP address](/learning/networking-ip-addresses-and-protocols)
- **Path / query** — application routing

---

## Security note

Plain **HTTP** exposes paths, headers, and bodies to anyone on the path (Wi-Fi, ISP). Production sites use [HTTPS](/learning/networking-https). Never send secrets over unencrypted HTTP.

---

## Related notes

- [HTTPS](/learning/networking-https) — HTTP over TLS
- [TLS](/learning/networking-tls) — encryption and certificates
- [DNS](/learning/networking-dns) — hostname resolution
- [TCP](/learning/networking-tcp) — typical transport
- [GRPC](/learning/networking-grpc) — RPC over HTTP/2

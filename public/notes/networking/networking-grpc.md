# gRPC

> High-performance RPC framework over HTTP/2 — Protocol Buffers, streaming, and when to choose gRPC over REST.

**gRPC** is a **remote procedure call (RPC)** framework from Google. Clients call **methods on a server** as if they were local functions. By default it uses **HTTP/2** on [TCP](/learning/networking-tcp) (often with [TLS](/learning/networking-tls)) and **Protocol Buffers (protobuf)** for compact binary messages.

---

## Stack

```
gRPC service / stub (generated code)
  ↓
HTTP/2 framing (streams, multiplexing)
  ↓
TLS (recommended in production)
  ↓
TCP → IP
```

Unlike [HTTP](/learning/networking-http) JSON REST, payloads are **strongly typed** from `.proto` schema files.

---

## Core concepts

| Concept | Description |
| ------- | ----------- |
| **Service** | Collection of RPC methods |
| **Method** | Unary or streaming call |
| **Message** | Protobuf-defined request/response types |
| **Channel** | Connection to server endpoint |
| **Stub** | Client-side generated proxy |

---

## Call types

| Type | Pattern |
| ---- | ------- |
| **Unary** | Single request → single response |
| **Server streaming** | One request → stream of responses |
| **Client streaming** | Stream of requests → one response |
| **Bidirectional streaming** | Both sides stream |

Useful for logs, live feeds, and large uploads without one giant payload.

---

## gRPC vs REST ([HTTP](/learning/networking-http))

| Aspect | gRPC | REST/JSON |
| ------ | ---- | --------- |
| Contract | `.proto` (required) | OpenAPI optional |
| Payload | Binary protobuf | Usually JSON text |
| Browser | Needs grpc-web proxy | Native |
| Streaming | First-class | SSE / WebSockets separate |
| Tooling | Code generation | Flexible ad-hoc |

Choose **gRPC** for **internal microservices**, low latency, and strict contracts. Choose **REST** for public HTTP APIs and browser-first clients.

---

## Status and errors

gRPC maps failures to **status codes** (`OK`, `NOT_FOUND`, `UNAVAILABLE`, …) and **metadata** trailers — richer than HTTP status alone for RPC semantics.

---

## Operational notes

- Requires **HTTP/2** end-to-end (or grpc-web gateway)
- **Load balancers** must speak HTTP/2 (L7), not just TCP pass-through
- **Health checking** via `grpc.health.v1` standard service
- **Reflection** aids debugging with tools like `grpcurl`

---

## Related notes

- [HTTP](/learning/networking-http) — HTTP/2 foundation
- [TCP](/learning/networking-tcp), [TLS](/learning/networking-tls) — transport and security
- [OSI Model](/learning/networking-osi-model) — application-layer RPC

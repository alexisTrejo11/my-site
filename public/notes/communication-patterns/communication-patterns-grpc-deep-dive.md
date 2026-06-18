# gRPC Deep Dive

> gRPC is what happens when Google decides HTTP + JSON is too slow for 10 billion internal RPCs per day.

---

## What is gRPC?

**gRPC** (Google Remote Procedure Call) is a high-performance RPC framework that uses:
- **Protocol Buffers (Protobuf)** as the serialization format
- **HTTP/2** as the transport layer
- **Code generation** to produce type-safe client and server stubs in any language

---

## Why HTTP/2 Matters

| Feature | HTTP/1.1 | HTTP/2 |
|---------|----------|--------|
| Multiplexing | No (one request per connection) | Yes (many streams per connection) |
| Header compression | No | HPACK compression |
| Binary protocol | No (text) | Yes |
| Server push | No | Yes |
| Streaming | No | Yes (bidirectional) |

gRPC leverages multiplexing for concurrent RPC calls on a single TCP connection, and binary framing for compact, fast encoding.

---

## Protobuf Encoding

```protobuf
// users.proto
syntax = "proto3";

package com.example.users;

service UserService {
  rpc GetUser (GetUserRequest) returns (UserResponse);
  rpc ListUsers (ListUsersRequest) returns (stream UserResponse);
  rpc WatchUser (stream WatchRequest) returns (stream UserEvent);
}

message GetUserRequest {
  int32 id = 1;
}

message UserResponse {
  int32 id = 1;
  string name = 2;
  string email = 3;
}
```

Protobuf fields are **tag-number encoded** — not field-name encoded like JSON. This makes messages smaller and forward/backward compatible (adding fields doesn't break old clients).

**Size comparison:**
```
JSON:     {"id":42,"name":"Alex","email":"alex@example.com"}   = 52 bytes
Protobuf: 0x08 0x2A 0x12 0x04 ... (binary)                    = ~18 bytes
```

---

## The Four Streaming Modes

```proto
// 1. Unary (request-response, like REST)
rpc GetUser (Request) returns (Response);

// 2. Server streaming (one request, many responses)
rpc ListUsers (Request) returns (stream Response);

// 3. Client streaming (many requests, one response)
rpc UploadLogs (stream LogEntry) returns (UploadResult);

// 4. Bidirectional streaming (many-to-many)
rpc Chat (stream ChatMessage) returns (stream ChatMessage);
```

---

## gRPC in Spring Boot

```java
// Add to build.gradle:
// implementation 'net.devh:grpc-spring-boot-starter:2.14.0.RELEASE'

@GrpcService
public class UserGrpcService extends UserServiceGrpc.UserServiceImplBase {

    @Override
    public void getUser(GetUserRequest request, StreamObserver<UserResponse> observer) {
        var user = userRepository.findById(request.getId())
            .orElseThrow(() -> Status.NOT_FOUND.asRuntimeException());

        observer.onNext(UserResponse.newBuilder()
            .setId(user.getId())
            .setName(user.getName())
            .build());
        observer.onCompleted();
    }
}
```

---

## gRPC vs REST — Decision Matrix

| Criterion | REST/JSON | gRPC/Protobuf |
|-----------|-----------|---------------|
| Browser support | Native | Requires gRPC-Web proxy |
| Human readability | High | Low (binary) |
| Payload size | Larger | 3–10x smaller |
| Throughput | Moderate | High |
| Streaming | Limited (SSE/WebSocket) | Native (4 modes) |
| Schema contract | Optional (OpenAPI) | Mandatory (proto file) |
| Ideal for | Public APIs, web | Internal microservices |

---

## Related Notes

- [Serialization Protocols](/learning/communication-patterns-serialization-protocols) — Protobuf vs JSON vs Avro
- [The Perfect API Design](/learning/introduction-api-design) — REST API patterns
- [Sync vs Async](/learning/communication-patterns-sync-vs-async) — Streaming as async communication

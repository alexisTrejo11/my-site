# Sync vs Async Communication

> Blocking is not evil. But not knowing when to be non-blocking is.

---

## Synchronous (Blocking) Communication

The caller **waits** for the callee to respond before continuing. The thread is blocked during that wait.

```
Thread A:  ──── calls UserService ──────────────── [blocked] ──── resumes ──▶
                        │                               ▲
                   processes                        returns
```

**HTTP REST** is the canonical synchronous protocol:
```
Client ──── POST /orders ──▶ Order Service
            [Client waits]
             ◀──── 201 Created ──── Order Service (may have called 3 other services)
```

**When synchronous is right:**
- The caller **needs the result** before it can continue
- Low-latency reads (< 100ms P99)
- Simple CRUD operations
- User-facing APIs where immediate feedback is expected

**Risks:**
- **Cascading failures** — if Order Service calls Payment Service and Payment Service is slow, the user request hangs
- **Thread exhaustion** — blocking threads are unavailable for other requests

---

## Asynchronous (Non-Blocking) Communication

The caller **sends a message and immediately continues**. The result arrives later, often through a callback, future, or event.

```
Thread A:  ──── publishes OrderPlaced event ──▶ Broker ──── returns immediately ──▶
                                                  │
                                             [later]
                                                  ▼
                                         Email Service consumes
                                         Inventory Service consumes
                                         Analytics Service consumes
```

**When async is right:**
- The caller **doesn't need the result** to continue
- Work can be deferred or parallelized
- Fan-out to multiple consumers
- Resilience: consumer can retry if it fails

**Patterns:**
- **Message Queue** — Point-to-point (one producer, one consumer)
- **Pub/Sub** — One event, many consumers
- **Event Streaming** — Persistent, replayable log (Kafka)

---

## Java: CompletableFuture & Virtual Threads

```java
// Async composition
CompletableFuture<User> user = userService.findAsync(id);
CompletableFuture<Order[]> orders = orderService.listAsync(id);

CompletableFuture.allOf(user, orders)
    .thenApply(v -> buildDashboard(user.join(), orders.join()))
    .thenAccept(dashboard -> response.send(dashboard));
```

Java 21 **Virtual Threads** allow blocking code to run without monopolizing OS threads — dramatically simplifying async code while retaining synchronous semantics.

---

## Comparison Table

| Dimension | Synchronous | Asynchronous |
|-----------|-------------|--------------|
| Result timing | Immediate | Eventually |
| Error handling | In the call stack | Via DLQ, retry, compensating events |
| Coupling | Tight (caller knows callee) | Loose (caller knows event schema) |
| Debugging | Simple stack traces | Distributed trace required |
| Throughput | Thread-limited | Near-unlimited with brokers |
| Use case | User-facing reads | Background processing, fan-out |

---

## Related Notes

- [[01_What_is_Kafka]] — The async messaging layer
- [[02_gRPC_Deep_Dive]] — Sync with streaming over HTTP/2
- [[Executor_Framework]] — Java threading fundamentals
- [[Future_CompletableFuture]] — Java async composition

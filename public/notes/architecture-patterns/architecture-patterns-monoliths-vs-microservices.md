# Monoliths vs Microservices

> The monolith is not the enemy. Premature decomposition is.

---

## The Monolith

A **monolithic application** packages all functionality into a single deployable unit. The entire application is compiled, tested, and deployed together.

```
┌─────────────────────────────────────┐
│            Monolithic App           │
│  ┌─────────┐  ┌──────┐  ┌───────┐  │
│  │  Users  │  │Orders│  │Billing│  │
│  └─────────┘  └──────┘  └───────┘  │
│            Single Database          │
└─────────────────────────────────────┘
          Single Deployable JAR/WAR
```

**Advantages:**
- Simple to develop, test, and debug locally
- No network latency between modules
- Single transaction boundary (ACID across the whole system)
- Easier operational burden — one process to monitor

**Disadvantages:**
- Scaling requires replicating the entire application
- Technology lock-in (one language, one runtime)
- Large teams step on each other (merge conflicts, deployment coupling)
- A failure in one module can crash the entire process

---

## Microservices

A **microservice architecture** decomposes the application into small, independently deployable services. Each service owns its data, its runtime, and its deployment lifecycle.

```
Client
  │
  ▼
API Gateway
  ├──▶ User Service    ──▶ users_db
  ├──▶ Order Service   ──▶ orders_db
  └──▶ Billing Service ──▶ billing_db
           │
           ▼
      Message Broker (Kafka)
           │
           ▼
    Notification Service
```

**Advantages:**
- Independent deployment and scaling
- Technology heterogeneity (Java for one, Go for another)
- Fault isolation — one service fails, others continue
- Teams own their service end-to-end

**Disadvantages:**
- Distributed systems complexity (network failures, partial failures)
- No cross-service ACID transactions → eventual consistency challenges
- Operational overhead: service discovery, observability, distributed tracing
- Latency introduced by network hops

---

## The Decision Framework

| Factor | Monolith | Microservices |
|--------|----------|---------------|
| Team size | < 10 engineers | > 50 engineers |
| Domain clarity | Low (still discovering) | High (well-bounded contexts) |
| Scaling needs | Uniform | Non-uniform (some services need 10x more) |
| Deployment frequency | Low to medium | High (multiple deploys/day per team) |
| Operational maturity | Low | High (needs K8s, observability, etc.) |

> **Rule of thumb:** Start with a monolith. Decompose when a **specific bottleneck** justifies it — not because microservices are fashionable.

---

## Related Notes

- [Modular Monoliths](/learning/architecture-patterns-modular-monoliths) — The best of both worlds
- [Clean Architecture](/learning/architecture-patterns-clean-architecture) — Organizing code inside either
- [What is Kafka](/learning/kafka-what-is-kafka) — Event-driven communication between services

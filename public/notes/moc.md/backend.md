# Backend Engineering Master Roadmap

> A curated encyclopedia of backend engineering knowledge — from first principles to production-grade systems.
> Start at `00_Introduction` if you're onboarding. Jump to any pillar if you know what you need.

---

## Gateway — Start Here

| File | Description |
|------|-------------|
| [Welcome to the Machine](/learning/introduction-welcome-to-the-machine) | Client-Server model, HTTP lifecycle, anatomy of a backend server |
| The Backend Glosary | Interactive cheat sheet — 60+ terms, each linked to its deep-dive note |
| [History and Evolution](/learning/introduction-history-and-evolution) | From CGI scripts to serverless — 30 years of architectural evolution |
| [The Perfect API Design](/learning/introduction-api-design) | REST, gRPC, GraphQL contracts and HTTP status code reference |

---

## Phase 1 — Frameworks

*Production runtime environments. Pick a framework, learn it deeply.*

| Technology | Description |
|------------|-------------|
| [Spring MOC](/learning/spring-boot-master-moc) | Spring Boot — IoC, Data, Web, Security, Testing (enterprise hub) |
| [Django MOC](/learning/django-master-moc) | Django web framework (Python) — batteries-included |
| [FastAPI MOC](/learning/fastapi-master-moc) | FastAPI — high-performance async APIs |

---

## Phase 2 — Architecture Patterns

*How to organize code and systems for long-term maintainability.*

| Note | Description |
|------|-------------|
| [Monoliths vs Microservices](/learning/architecture-patterns-monoliths-vs-microservices) | Decision framework, tradeoffs, and Conway's Law |
| [Modular Monoliths](/learning/architecture-patterns-modular-monoliths) | Internal module boundaries — the pragmatic middle ground |
| [Clean Architecture](/learning/architecture-patterns-clean-architecture) | Dependency rules, layer responsibilities, testability |
| `Design_Patterns/` | GoF and modern patterns: Factory, Strategy, Observer, Proxy |
| `System_Design/` | Scalability, availability, consistency tradeoffs |
| `Business_Logic/` | Domain modeling, invariants, aggregate roots |
| `Execution_Patterns/` | Thread pools, reactive, virtual threads |
| `Middleware/` | Cross-cutting concerns, filter chains, interceptors |
| `Proxying_Load_Balancing/` | Nginx, API gateways, load balancing algorithms |
| `Error_Handling/` | Resilience patterns: circuit breaker, retry, fallback |

---

## Phase 3 — Communication Patterns

*How services talk to each other — synchronously and asynchronously.*

| Note | Description |
|------|-------------|
| [Sync vs Async](/learning/communication-patterns-sync-vs-async) | Blocking vs non-blocking models, CompletableFuture, Virtual Threads |
| [gRPC Deep Dive](/learning/communication-patterns-grpc-deep-dive) | Protobuf encoding, HTTP/2 framing, streaming modes |
| [Serialization Protocols](/learning/communication-patterns-serialization-protocols) | JSON vs Protobuf vs Avro — performance and schema evolution |
| `Protocols_And_Backend/http_in_backend/` | HTTP deep dive: headers, keep-alive, chunked transfer |
| `Routing/` | URL routing strategies, path parameters, query params |
| `Inner_Outer_Communication/` | Internal vs external service communication patterns |

---

## Phase 4 — Databases & Caching

*Every system's persistence layer — choosing the right store for the job.*

| Hub | Description |
|-----|-------------|
| [Database MOC](/learning/database-master-moc) | Full learning path — foundations, SQL vs NoSQL, access layers, deep dives |

### Highlights
| Note | Description |
|------|-------------|
| [Interacting With Data](/learning/databases-database-interaction-abstractions) | Raw SQL vs sqlc vs ORMs — abstraction tradeoffs |
| [SQL vs NoSQL](/learning/databases-sql-vs-nosql) | Relational vs document models — ACID vs BASE |
| [Redis As A Cache](/learning/redis-architecture-and-caching) | Redis single-threaded architecture and caching patterns |
| PostgreSQL · Redis · MongoDB | Technology hubs |

---

## Phase 5 — Messaging & Events

*Asynchronous communication at scale — event-driven architectures.*

### Foundations
| Topic | Description |
|-------|-------------|
| `01_Foundations/` | Message brokers vs log brokers, delivery guarantees, at-least-once vs exactly-once |

### Technology Deep Dives
| Technology | Notes |
|------------|-------|
| [What is Kafka](/learning/kafka-what-is-kafka) | Kafka fundamentals — topics, partitions, offsets |
| [Core Concepts](/learning/kafka-core-concepts) | Producers, consumers, brokers |
| Producers Consumers | Producer/consumer configuration and patterns |
| Topics Partitions Offsets | Partition strategy and offset management |
| Brokers Clusters | Cluster topology and replication |
| Replication and Acks | Replication factor, ISR, acks |
| Consumer Groups | Parallel consumption and rebalancing |
| Partition Rebalancing | Rebalancing protocols |
| Zookeeper KRaft | Coordination: ZooKeeper vs KRaft |
| Log Compaction | Log compaction and retention |
| Message Ordering Guarantees | Ordering within partitions |
| Idempotent Producers | Exactly-once producer semantics |
| Transactions | Kafka transactions |
| Dead Letter Queues | DLQ patterns for error handling |
| Schema Registry Avro | Schema Registry and Avro encoding |
| `03_RabbitMQ/` | AMQP broker — exchanges, queues, routing keys |

---

## Phase 6 — Observability & Security

*Making systems debuggable, measurable, and protected.*

| Note | Description |
|------|-------------|
| [The Three Pillars](/learning/observability-and-security-three-pillars-observability) | Metrics (Prometheus), Logs (Loki), Traces (Jaeger) — full stack |
| [Authentication AuthZ](/learning/observability-and-security-authentication-authorization) | JWT, OAuth2, RBAC, session management |
| [Rate Limiting CORS](/learning/observability-and-security-rate-limiting-cors) | Token bucket, sliding window, CORS preflight |
| `Security/` | Spring Security filter chain deep dive |
| `Monitoring/` | SLO/SLA definitions, alerting strategies |

---

## Progress

| Phase | Pillar | Status |
|-------|--------|--------|
| Gateway | Introduction & Glossary | ✅ Published |
| 1 | Spring Boot Framework | 📝 In Progress |
| 1 | Django Framework | 📝 In Progress |
| 1 | FastAPI / Gin Go | 🔲 Planned |
| 2 | Architecture Patterns | 📝 In Progress |
| 3 | Communication Patterns | 📝 In Progress |
| 4 | PostgreSQL | 📝 In Progress |
| 4 | Redis | 📝 In Progress |
| 4 | MongoDB | 📝 In Progress |
| 4 | DB Foundations | 🔲 Planned |
| 5 | Kafka | 📝 In Progress |
| 5 | RabbitMQ | 🔲 Planned |
| 6 | Observability | ✅ Published |
| 6 | Auth & Security | ✅ Published |

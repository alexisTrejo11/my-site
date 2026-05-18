# The Ultimate Backend Cheat Sheet & Glossary

> A routing table for terminology. Scan the table for the concept, click the link to go deep.

---

## Part 1 — Core & API Concepts

| Term | Quick Definition | Deep Dive |
|------|-----------------|-----------|
| **API** | A contract that defines how two programs communicate. Think of it as a menu — the client orders, the kitchen delivers. | [[04_The_Perfect_API_Design]] |
| **REST** | An architectural style where resources are nouns (URLs) and HTTP verbs (GET, POST, PUT, DELETE) express intent. The dominant style for public web APIs. | [[04_The_Perfect_API_Design]] |
| **gRPC** | Google's high-performance RPC framework. Uses binary Protobuf encoding over HTTP/2. 3–10x faster than REST/JSON for internal service calls. | [[02_gRPC_Deep_Dive]] |
| **GraphQL** | A query language where the client specifies exactly what fields it needs. Eliminates over-fetching and under-fetching. Ideal for complex UI data needs. | [[04_The_Perfect_API_Design]] |
| **RPC** | Remote Procedure Call — calling a function on a remote server as if it were local. gRPC and SOAP are modern implementations. | [[02_gRPC_Deep_Dive]] |
| **Endpoint** | A specific URL + HTTP method pair that handles a request. `POST /users` is one endpoint; `GET /users/{id}` is another. | [[04_The_Perfect_API_Design]] |
| **HTTP** | The protocol carrying web traffic. HTTP/1.1 sends one request per connection; HTTP/2 multiplexes many. HTTP/3 runs over QUIC (UDP). | [[01_Welcome_to_the_Machine]] |
| **Client-Server** | The fundamental model: clients request, servers respond. The server is passive — it only acts when addressed. | [[01_Welcome_to_the_Machine]] |
| **Request/Response Lifecycle** | DNS → TCP Handshake → TLS → HTTP Request → Router → Middleware → Controller → Service → DB → Response. Eight steps from Enter to data. | [[01_Welcome_to_the_Machine]] |
| **DTO** | Data Transfer Object — a plain object carrying data between layers. It has no behavior, only shape. Prevents domain objects from leaking into API responses. | [[03_Clean_Architecture]] |
| **Controller** | The entry point for HTTP requests. It parses input, calls a service, and returns a response. In Clean Architecture, it lives in the Interface Adapters layer. | [[03_Clean_Architecture]] |
| **Service Layer** | Where business logic lives. A service orchestrates domain objects, calls repositories, and publishes events. It knows nothing about HTTP or databases directly. | [[03_Clean_Architecture]] |
| **Repository** | An abstraction over the database. Defines methods like `findById()` and `save()`. The implementation (JPA, MongoDB driver) is swappable. | [[JPA_Hibernate]] |
| **Middleware** | Code that runs between the request hitting the server and reaching the handler. Used for auth checks, logging, rate limiting, request ID injection. | [[03_Clean_Architecture]] |
| **CRUD** | Create, Read, Update, Delete — the four fundamental data operations. The basis for most REST API surface area. | [[04_The_Perfect_API_Design]] |
| **Idempotency** | An operation is idempotent if calling it N times produces the same result as calling it once. `PUT /users/42` is idempotent; `POST /orders` is not. | [[01_Sync_vs_Async]] |
| **Status Code** | HTTP's numeric signal of request outcome. 2xx = success, 4xx = client error, 5xx = server error. Never return 200 with an error body. | [[04_The_Perfect_API_Design]] |
| **Pagination** | Limiting and navigating large result sets. Cursor-based (efficient at scale) vs offset-based (simple but expensive on large tables). | [[PostgreSQL]] |

---

## Part 2 — Data & Persistence

| Term | Quick Definition | Deep Dive |
|------|-----------------|-----------|
| **Database** | A system that persistently stores, retrieves, and manages structured data. The two main families: relational (SQL) and document/key-value (NoSQL). | [[01_Foundations]] |
| **SQL** | Structured Query Language — the language for relational databases. Declarative: you describe *what* you want, the engine decides *how* to get it. | [[PostgreSQL]] |
| **NoSQL** | "Not Only SQL" — a broad category of databases that sacrifice rigid schema for flexibility, scale, or speed. MongoDB (documents), Redis (key-value), Cassandra (wide column). | [[MongoDB]] |
| **ORM** | Object-Relational Mapper — bridges the gap between objects in code and rows in tables. Hibernate (Java), SQLAlchemy (Python). Powerful but can generate expensive N+1 queries if misused. | [[JPA_Hibernate]] |
| **ACID** | Atomicity, Consistency, Isolation, Durability — the four guarantees of a database transaction. PostgreSQL is fully ACID. Ensures your bank transfer either fully succeeds or fully fails. | [[01_Foundations]] |
| **BASE** | Basically Available, Soft state, Eventual consistency — the tradeoff NoSQL systems make. A Cassandra write may not be immediately visible to all nodes. | [[01_Foundations]] |
| **CAP Theorem** | A distributed database can guarantee only 2 of 3: Consistency, Availability, Partition tolerance. During a network split, you choose between stale data or downtime. | [[01_Foundations]] |
| **Transaction** | A unit of work that either fully completes or fully rolls back. The gold standard for financial and inventory operations. | [[PostgreSQL]] |
| **Index** | A data structure (usually B-Tree or Hash) that speeds up queries at the cost of storage and write overhead. Without an index, every query scans the full table. | [[01_Foundations]] |
| **B-Tree** | The most common index structure in relational DBs. Balanced tree for range queries and equality lookups. The default in PostgreSQL, MySQL, SQL Server. | [[01_Foundations]] |
| **LSM Tree** | Log-Structured Merge-Tree — optimizes write throughput by appending to memory, then flushing sorted segments. Used by Cassandra, RocksDB, LevelDB. | [[01_Foundations]] |
| **Cache** | A fast in-memory store that holds frequently accessed data to reduce database load and latency. The trade-off is stale data risk. | [[Redis]] |
| **TTL** | Time To Live — the expiry duration of a cached entry. After TTL, the entry is evicted and the next request goes to the source of truth. | [[Redis]] |
| **Connection Pool** | A set of pre-established database connections reused across requests. Without it, every request opens and closes a TCP connection — catastrophically slow. | [[PostgreSQL]] |
| **Migration** | A versioned script that evolves the database schema. Tools: Flyway, Liquibase. Migrations are committed to version control alongside code. | [[JPA_Hibernate]] |
| **N+1 Problem** | Fetching N records and then making N additional queries to fetch related data. Classic ORM footgun. Solved with `JOIN FETCH` or `@EntityGraph` in JPA. | [[JPA_Hibernate]] |
| **Sharding** | Horizontally partitioning a database across multiple servers by a shard key (e.g., user ID). Enables massive scale at the cost of cross-shard query complexity. | [[01_Foundations]] |
| **Replication** | Copying data from a primary node to one or more replicas. Provides fault tolerance and enables read scaling (route reads to replicas). | [[01_Foundations]] |

---

## Part 3 — Architecture & Design Patterns

| Term | Quick Definition | Deep Dive |
|------|-----------------|-----------|
| **Monolith** | A single deployable unit containing all application functionality. Not inherently bad — Netflix started as one. The right choice for small teams and early products. | [[01_Monoliths_vs_Microservices]] |
| **Microservices** | An architecture where functionality is split into small, independently deployable services that communicate over the network. Powerful but operationally complex. | [[01_Monoliths_vs_Microservices]] |
| **Modular Monolith** | A single deployable with strict internal module boundaries. The pragmatic middle ground — team autonomy without distributed systems complexity. | [[02_Modular_Monoliths]] |
| **Clean Architecture** | Concentric rings where inner layers (domain) know nothing about outer layers (frameworks). Business logic is framework-agnostic, unit-testable, and long-lived. | [[03_Clean_Architecture]] |
| **Domain-Driven Design** | Modeling software around business domain concepts. Bounded Contexts, Aggregates, Value Objects, Domain Events — DDD vocabulary. | [[02_Modular_Monoliths]] |
| **Bounded Context** | A DDD concept — a boundary within which a specific domain model applies. "Order" means something different in Billing vs Fulfillment. | [[01_Monoliths_vs_Microservices]] |
| **SOLID** | Five OOP design principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. The basis of maintainable code. | [[03_Clean_Architecture]] |
| **Dependency Injection** | Providing a class's dependencies from outside rather than constructing them internally. Makes classes testable and loosely coupled. Spring's core mechanism. | [[Dependency_Injection]] |
| **Repository Pattern** | An abstraction layer between domain logic and data access. The domain only talks to `UserRepository` (interface) — not to `JpaRepository` or SQL directly. | [[JPA_Hibernate]] |
| **CQRS** | Command Query Responsibility Segregation — separate models for reads (queries) and writes (commands). Enables independent scaling and optimization of each path. | [[03_Clean_Architecture]] |
| **Event Sourcing** | Instead of storing current state, store the sequence of events that produced it. The current state is derived by replaying events. Guarantees a complete audit trail. | [[01_What_is_Kafka]] |
| **Stateless** | A server that holds no client-specific state between requests. Any instance can handle any request. Essential for horizontal scaling. JWT enables stateless auth. | [[02_Authentication_AuthZ]] |
| **Design Patterns** | Recurring solutions to common problems: Factory, Strategy, Observer, Decorator, Proxy, etc. Language-agnostic blueprints for flexible design. | [[Design_Patterns]] |
| **Load Balancer** | Distributes incoming requests across multiple server instances. Strategies: round-robin, least connections, IP hash. Essential for horizontal scaling. | [[Proxying_Load_Balancing]] |
| **Reverse Proxy** | A server that sits in front of backend servers and forwards client requests. Handles TLS termination, compression, caching. Nginx and Caddy are common reverse proxies. | [[Proxying_Load_Balancing]] |

---

## Part 4 — Messaging & Events

| Term | Quick Definition | Deep Dive |
|------|-----------------|-----------|
| **Message Broker** | An intermediary that receives messages from producers and routes them to consumers. Decouples the sender from the receiver. RabbitMQ is a classic broker; Kafka is a distributed log. | [[01_Foundations]] |
| **Event-Driven Architecture** | Systems communicate by publishing and consuming events rather than making direct calls. Highly decoupled, naturally async, and resilient to downstream failures. | [[01_What_is_Kafka]] |
| **Pub/Sub** | Publish/Subscribe pattern — a publisher emits events to a topic; multiple subscribers each receive a copy. Broadcasting vs point-to-point queuing. | [[01_What_is_Kafka]] |
| **Topic** | A named channel in Kafka or a pub/sub system. Producers write to topics; consumers subscribe to topics. | [[04_Topics_Partitions_Offsets]] |
| **Partition** | A Kafka topic is split into ordered, append-only partitions. Partitions enable parallel consumption and horizontal scaling. | [[04_Topics_Partitions_Offsets]] |
| **Offset** | An integer that uniquely identifies a message's position within a Kafka partition. Consumers commit offsets to track what they've processed. | [[04_Topics_Partitions_Offsets]] |
| **Consumer Group** | A set of consumers that collectively consume a topic. Each partition is assigned to exactly one consumer in the group — enabling parallel processing. | [[02_Consumer_Groups]] |
| **Dead Letter Queue (DLQ)** | Where messages go when they can't be processed (e.g., after N retries). Prevents poison messages from blocking the queue indefinitely. | [[04_Dead_Letter_Queues]] |
| **Idempotent Consumer** | A consumer that produces the same result whether it processes a message once or many times. Critical for at-least-once delivery guarantees. | [[02_Idempotent_Producers]] |
| **Schema Registry** | A centralized store for Kafka message schemas (Avro/Protobuf). Ensures producers and consumers agree on message format across version changes. | [[05_Schema_Registry_Avro]] |
| **Exactly-Once Semantics** | Guarantees a message is processed exactly one time — neither lost nor duplicated. Requires Kafka transactions or idempotent consumers + deduplication. | [[03_Transactions]] |

---

## Part 5 — Observability & Security

| Term | Quick Definition | Deep Dive |
|------|-----------------|-----------|
| **Metrics** | Numeric measurements over time: request rate, error rate, latency percentiles, CPU/memory. The "vital signs" of a service. Collected by Prometheus. | [[01_The_Three_Pillars]] |
| **Logs** | Timestamped records of discrete events. Good logs are structured (JSON), include a trace ID, and avoid PII. Aggregated by Loki or ELK. | [[01_The_Three_Pillars]] |
| **Distributed Traces** | End-to-end tracking of a single request across multiple services. A trace is composed of spans. Visualized in Jaeger or Zipkin. | [[01_The_Three_Pillars]] |
| **Prometheus** | A pull-based metrics system that scrapes `/metrics` endpoints. Stores time-series data and fires alerts on PromQL threshold expressions. | [[01_The_Three_Pillars]] |
| **Grafana** | Visualization layer for Prometheus, Loki, and Tempo. Dashboards, alerts, SLO tracking — the cockpit of a production system. | [[01_The_Three_Pillars]] |
| **Authentication (AuthN)** | Verifying identity: "Who is this?" Valid JWT, OAuth2 token, or API key answers this question. | [[02_Authentication_AuthZ]] |
| **Authorization (AuthZ)** | Controlling access: "What can they do?" Role checks, permission scopes, and attribute-based access control answer this question. | [[02_Authentication_AuthZ]] |
| **JWT** | JSON Web Token — a signed, self-contained token carrying user claims. The server can verify it without a database lookup. Short-lived (15–60 min). | [[02_Authentication_AuthZ]] |
| **OAuth2** | An authorization delegation framework. Lets a user grant a third-party app limited access to their resources without sharing credentials. | [[02_Authentication_AuthZ]] |
| **CORS** | Cross-Origin Resource Sharing — a browser security mechanism that controls which origins can call your API. A 403 from CORS is a misconfiguration, not a bug. | [[03_Rate_Limiting_CORS]] |
| **Rate Limiting** | Capping the number of requests a client can make in a time window. Protects against DoS attacks, API abuse, and runaway clients. | [[03_Rate_Limiting_CORS]] |
| **mTLS** | Mutual TLS — both client and server present certificates. Used for zero-trust internal service communication. No spoofed service can connect. | [[02_Authentication_AuthZ]] |

---

## Part 6 — Serialization & Communication

| Term | Quick Definition | Deep Dive |
|------|-----------------|-----------|
| **Serialization** | Converting in-memory objects to bytes for transmission or storage. JSON, Protobuf, and Avro are the dominant formats in backend systems. | [[03_Serialization_Protocols]] |
| **JSON** | JavaScript Object Notation — human-readable text encoding. The default for REST APIs and Kafka messages in development and low-throughput production. | [[03_Serialization_Protocols]] |
| **Protocol Buffers (Protobuf)** | Google's binary serialization format. 3–10x smaller than JSON, schema-first, generates typed client/server stubs. Used in gRPC. | [[03_Serialization_Protocols]] |
| **Avro** | Apache's binary format designed for Kafka and data pipelines. Schema is registered in a Schema Registry and embedded with the message. | [[03_Serialization_Protocols]] |
| **Synchronous** | The caller waits for the response before continuing. Simple to reason about; vulnerable to cascading failures if a downstream service is slow. | [[01_Sync_vs_Async]] |
| **Asynchronous** | The caller fires a message and continues. The response arrives eventually. Enables high throughput and loose coupling at the cost of debugging complexity. | [[01_Sync_vs_Async]] |
| **HTTP/2** | The second major HTTP version. Multiplexes multiple requests on one connection, uses binary framing and header compression. Foundation of gRPC. | [[02_gRPC_Deep_Dive]] |
| **Webhook** | A reverse API — instead of polling for updates, the server pushes a POST request to your URL when an event occurs. GitHub, Stripe, and Twilio use webhooks. | [[01_Sync_vs_Async]] |
| **WebSocket** | A full-duplex, persistent connection between client and server. Used for real-time features: chat, live dashboards, gaming. Not REST — it's a stateful channel. | [[01_Sync_vs_Async]] |

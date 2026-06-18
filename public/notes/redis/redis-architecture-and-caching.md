# Redis Architecture: Under the Hood

Many developers are surprised to learn that Redis is **single-threaded** (one execution thread). In the multi-core era, how can one of the fastest caching systems in the world rely on a single thread?

### 1. The single-thread paradox

The CPU is rarely the bottleneck for a database. The bottleneck is usually **disk I/O** and **thread synchronization** (locks and context switching).

* **The analogy:** Picture a bank window with one cashier who serves customers in microseconds because everything is on the desk in front of them (RAM). If you put five cashiers at the same window sharing one desk, they would spend more time colliding and arguing over papers (context switching) than serving customers.

By operating entirely in RAM and using **I/O multiplexing** (an **event loop**, similar to Node.js), Redis processes hundreds of thousands of requests per second without blocking resources or managing concurrent threads.

### 2. Redis as a cache (not only a key-value store)

In production, Redis is often deployed as a **cache layer** in front of a primary database (PostgreSQL, MySQL, etc.):

| Pattern | Purpose |
| :--- | :--- |
| **Cache-aside** | Application reads cache first; on miss, loads from DB and populates cache |
| **TTL expiration** | Stale data evicted automatically; protects memory |
| **Pub/Sub** | Real-time messaging between services (separate from pure caching) |

Caching moves latency from milliseconds (disk-backed DB) to **microseconds** (in-memory), but introduces consistency challenges—always define invalidation strategy when data changes.

---

## Related Notes

- Redis — Redis hub (commands, data structures overview)
- [Interacting With Data](/learning/databases-database-interaction-abstractions) — how your app talks to persistence layers
- [Database MOC](/learning/database-master-moc) — databases & caching learning path

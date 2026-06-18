# Database & Persistence Knowledge Hub

> Welcome to storage and persistence. This module takes you from the physical and logical principles behind database engines to advanced production tuning strategies.

---

## Curated Learning Roadmap

### 1. Foundations First

| Note | Focus |
|------|--------|
| [What is a DB History](/learning/databases-database-history) | Where modern engines came from and why they exist |
| [SQL vs NoSQL](/learning/databases-sql-vs-nosql) | Relational vs document/key-value—when each model fits |
| [Interacting With Data](/learning/databases-database-interaction-abstractions) | Raw SQL vs sqlc vs ORMs—the abstraction tradeoff |

### 2. Technology Deep Dives

| Track | Note | Focus |
|-------|------|--------|
| **Relational** | [Postgres Architecture](/learning/postgresql-postgres-architecture) | PostgreSQL internals, indexes, transactions |
| **Document** | [Mongo Architecture](/learning/mongodb-mongo-architecture) | Flexible schemas, aggregation, scaling patterns |
| **Caching** | [Redis As A Cache](/learning/redis-architecture-and-caching) | In-memory speed, event loop, cache-aside patterns |

### 3. Quick Links (Technology Hubs)

| System | Hub note |
|--------|----------|
| PostgreSQL | PostgreSQL |
| Redis | Redis |
| MongoDB | MongoDB |

---

## Key Concepts (Cheat Sheet)

| Term | Definition |
|------|------------|
| **DBMS** | Software that manages the database (PostgreSQL, MongoDB, Redis, etc.) |
| **Schema** | Logical structure of stored data |
| **Transaction** | Unit of work that satisfies ACID properties (in relational systems) |
| **Query** | Request for data (SQL, driver API, ORM method) |
| **Index** | Structure that accelerates lookups at the cost of write overhead |

---

## Progress

| Area | Status |
|------|--------|
| Foundations | 📝 In progress |
| PostgreSQL deep dive | 🔲 Planned |
| MongoDB deep dive | 🔲 Planned |
| Redis / caching | ✅ Published ([Redis As A Cache](/learning/redis-architecture-and-caching)) |
| Data access patterns | ✅ Published ([Interacting With Data](/learning/databases-database-interaction-abstractions)) |

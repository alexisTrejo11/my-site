# SQL vs NoSQL

> There is no universal winner—only fit for your consistency, scale, and query patterns.

## Quick Comparison

| Characteristic | SQL (Relational) | NoSQL |
| -------------- | ---------------- | ----- |
| **Schema** | Fixed, declared upfront | Flexible, often schema-on-read |
| **Scaling** | Vertical (bigger machine) | Horizontal (more nodes) |
| **Relations** | JOINs across normalized tables | Embedding / denormalization in documents |
| **Consistency** | **ACID** (strict transactions) | Often **BASE** (eventual consistency) |

## ACID vs BASE

| | ACID | BASE |
|---|------|------|
| **Stands for** | Atomicity, Consistency, Isolation, Durability | Basically Available, Soft state, Eventual consistency |
| **Typical engines** | PostgreSQL, MySQL | Cassandra, DynamoDB, some MongoDB deployments |
| **Best when** | Financial ledgers, inventory, strong invariants | High write throughput, geo-distribution, tolerance for stale reads |

## Related Notes

- [Interacting With Data](/learning/databases-database-interaction-abstractions) — how you access the database once you pick a model
- [Postgres Architecture](/learning/postgresql-postgres-architecture) — relational deep dive
- [Mongo Architecture](/learning/mongodb-mongo-architecture) — document store deep dive
- [Database MOC](/learning/database-master-moc)

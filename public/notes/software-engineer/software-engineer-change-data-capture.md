# Change Data Capture

> CDC — stream database changes to downstream systems in real time.

## What it is

- Read transaction log ([Logical Replication](/learning/software-engineer-logical-replication), Debezium).
- Powers search indexes, caches, [Data Warehouse](/learning/software-engineer-data-warehouse) sync.
- Ordering and schema changes need care.

## Why it matters

Understanding **Change Data Capture** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Data Migration](/learning/software-engineer-data-migration)
- [Idempotency](/learning/software-engineer-idempotency)
- [Exactly Once Semantics](/learning/software-engineer-exactly-once-semantics)
- [MOC](/learning/devops-cloud) — Data Integration & Change Propagation
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

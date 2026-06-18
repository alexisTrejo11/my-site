# ACID

> Atomicity, Consistency, Isolation, Durability — transactional guarantees in RDBMS.

## What it is

- **Atomicity**: all or nothing. **Durability**: committed survives crash.
- **Isolation** levels define anomaly tolerance — see [Transaction Anomalies](/learning/software-engineer-transaction-anomalies-moc).
- Gold standard for OLTP; harder across services.

## Why it matters

Understanding **ACID** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Eventual Consistency](/learning/software-engineer-eventual-consistency)
- [Strong Consistency](/learning/software-engineer-strong-consistency)
- [Snapshot Isolation](/learning/software-engineer-snapshot-isolation)
- [MVCC](/learning/software-engineer-mvcc)
- [MOC](/learning/devops-cloud) — Consistency Models
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

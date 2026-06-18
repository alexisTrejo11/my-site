# Logical Replication

> Replicate row/change events (INSERT/UPDATE/DELETE) at logical level.

## What it is

- Can replicate subset of tables or transform data.
- Used for CDC, upgrades, cross-version replication.
- Contrast [Physical Replication](/learning/software-engineer-physical-replication) (byte-level).

## Why it matters

Understanding **Logical Replication** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Read Replicas](/learning/software-engineer-read-replicas)
- [Leader Follower Replication](/learning/software-engineer-leader-follower-replication)
- [Multi Leader Replication](/learning/software-engineer-multi-leader-replication)
- [Physical Replication](/learning/software-engineer-physical-replication)
- [MOC](/learning/devops-cloud) — Replication & Data Distribution
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

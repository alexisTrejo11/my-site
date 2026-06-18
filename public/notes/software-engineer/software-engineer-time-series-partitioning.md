# Time-Series Partitioning

> Range partitioning by time — common for metrics and logs.

## What it is

- Daily/monthly partitions simplify retention policies.
- Queries usually filter recent windows — prune old partitions.
- Watch partition count and metadata overhead.

## Why it matters

Understanding **Time-Series Partitioning** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Clustering](/learning/software-engineer-clustering)
- [Hash Partitioning](/learning/software-engineer-hash-partitioning)
- [Range Partitioning](/learning/software-engineer-range-partitioning)
- [Consistent Hashing](/learning/software-engineer-consistent-hashing)
- [MOC](/learning/devops-cloud) — Partitioning, Sharding & Data Distribution
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

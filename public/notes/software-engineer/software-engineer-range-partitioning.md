# Range Partitioning

> Split data by contiguous key ranges (dates, IDs).

## What it is

- Efficient for time-series and archival (drop old partitions).
- Risk of [Hot Partition](/learning/software-engineer-hot-partition) if latest range gets all writes.
- Pair with monitoring for [Data Skew](/learning/software-engineer-data-skew).

## Why it matters

Understanding **Range Partitioning** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Clustering](/learning/software-engineer-clustering)
- [Hash Partitioning](/learning/software-engineer-hash-partitioning)
- [Time Series Partitioning](/learning/software-engineer-time-series-partitioning)
- [Consistent Hashing](/learning/software-engineer-consistent-hashing)
- [MOC](/learning/devops-cloud) — Partitioning, Sharding & Data Distribution
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

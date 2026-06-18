# Hash Partitioning

> Assign rows to partitions via hash(partition_key) mod N.

## What it is

- Spreads load evenly when key is high-cardinality.
- Range queries across keys hit **all** partitions.
- Changing N requires [Rebalancing](/learning/software-engineer-rebalancing) / [Resharding](/learning/software-engineer-resharding).

## Why it matters

Understanding **Hash Partitioning** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Clustering](/learning/software-engineer-clustering)
- [Range Partitioning](/learning/software-engineer-range-partitioning)
- [Time Series Partitioning](/learning/software-engineer-time-series-partitioning)
- [Consistent Hashing](/learning/software-engineer-consistent-hashing)
- [MOC](/learning/devops-cloud) — Partitioning, Sharding & Data Distribution
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

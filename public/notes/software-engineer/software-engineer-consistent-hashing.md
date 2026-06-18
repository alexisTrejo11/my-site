# Consistent Hashing

> Hash ring mapping keys to nodes with minimal remapping when nodes change.

## What it is

- Only ~K/N keys move when a node joins/leaves.
- Virtual nodes improve balance on heterogeneous hardware.
- Used in caches, Dynamo-style stores, load balancers.

## Why it matters

Understanding **Consistent Hashing** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Clustering](/learning/software-engineer-clustering)
- [Hash Partitioning](/learning/software-engineer-hash-partitioning)
- [Range Partitioning](/learning/software-engineer-range-partitioning)
- [Time Series Partitioning](/learning/software-engineer-time-series-partitioning)
- [MOC](/learning/devops-cloud) — Partitioning, Sharding & Data Distribution
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

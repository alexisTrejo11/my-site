# Data Skew

> Uneven data or query distribution across partitions or workers.

## What it is

- Skewed joins leave stragglers in parallel jobs.
- Salting, broadcast joins, or skew hints in engines.
- Related to [Hot Partition](/learning/software-engineer-hot-partition).

## Why it matters

Understanding **Data Skew** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

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

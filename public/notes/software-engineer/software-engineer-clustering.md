# Clustering

> Physically ordering or grouping related rows on disk or nodes.

## What it is

- Clustered index defines row storage order (SQL Server, MySQL InnoDB PK).
- Improves range scans on cluster key.
- Distinct from **database cluster** (multiple servers).

## Why it matters

Understanding **Clustering** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Hash Partitioning](/learning/software-engineer-hash-partitioning)
- [Range Partitioning](/learning/software-engineer-range-partitioning)
- [Time Series Partitioning](/learning/software-engineer-time-series-partitioning)
- [Consistent Hashing](/learning/software-engineer-consistent-hashing)
- [MOC](/learning/devops-cloud) — Partitioning, Sharding & Data Distribution
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

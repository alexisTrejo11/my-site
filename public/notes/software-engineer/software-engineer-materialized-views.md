# Materialized Views

> Persisted query results refreshed on a schedule or on change.

## What it is

- Precompute expensive aggregations for fast reads.
- Refresh strategies: on commit, periodic, or incremental.
- Related to [Denormalization](/learning/software-engineer-denormalization) and [Caching](/learning/software-engineer-caching).

## Why it matters

Understanding **Materialized Views** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Normalization](/learning/software-engineer-normalization)
- [Denormalization](/learning/software-engineer-denormalization)
- [Schema Evolution](/learning/software-engineer-schema-evolution)
- [Schema Registry](/learning/software-engineer-schema-registry)
- [MOC](/learning/devops-cloud) — Data Modeling & Schema Design
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

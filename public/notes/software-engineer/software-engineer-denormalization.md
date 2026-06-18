# Denormalization

> Intentionally duplicating data to speed reads at the cost of write complexity.

## What it is

- Copy columns or embed documents to avoid expensive joins.
- Common in read-heavy analytics, caches, and NoSQL document models.
- Trade-off: faster reads vs harder consistency on updates.

## Why it matters

Understanding **Denormalization** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Normalization](/learning/software-engineer-normalization)
- [Schema Evolution](/learning/software-engineer-schema-evolution)
- [Schema Registry](/learning/software-engineer-schema-registry)
- [Materialized Views](/learning/software-engineer-materialized-views)
- [MOC](/learning/devops-cloud) — Data Modeling & Schema Design
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

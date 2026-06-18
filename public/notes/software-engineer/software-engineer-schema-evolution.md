# Schema Evolution

> Changing database schema over time without breaking running applications.

## What it is

- Prefer **expand → migrate → contract** (additive changes first).
- Version APIs and events alongside schema changes.
- Tools: Flyway, Liquibase, Alembic; in events use [Schema Registry](/learning/software-engineer-schema-registry).

## Why it matters

Understanding **Schema Evolution** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Normalization](/learning/software-engineer-normalization)
- [Denormalization](/learning/software-engineer-denormalization)
- [Schema Registry](/learning/software-engineer-schema-registry)
- [Materialized Views](/learning/software-engineer-materialized-views)
- [MOC](/learning/devops-cloud) — Data Modeling & Schema Design
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

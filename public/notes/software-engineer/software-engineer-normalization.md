# Normalization

> Organizing data into tables to reduce redundancy and update anomalies.

## What it is

- Split entities so each fact is stored once (1NF → 3NF and beyond).
- Reduces **update/delete/insert anomalies** when the same data repeats.
- Join cost rises — balance with read patterns and [Denormalization](/learning/software-engineer-denormalization).

## Why it matters

Understanding **Normalization** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Denormalization](/learning/software-engineer-denormalization)
- [Schema Evolution](/learning/software-engineer-schema-evolution)
- [Schema Registry](/learning/software-engineer-schema-registry)
- [Materialized Views](/learning/software-engineer-materialized-views)
- [MOC](/learning/devops-cloud) — Data Modeling & Schema Design
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

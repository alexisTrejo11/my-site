# Schema Registry

> Central store for data schemas (often Avro/Protobuf/JSON Schema) in streaming pipelines.

## What it is

- Producers and consumers agree on compatible schema versions.
- Enables safe evolution rules (backward/forward compatibility).
- Common with Kafka — prevents silent deserialization failures.

## Why it matters

Understanding **Schema Registry** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Normalization](/learning/software-engineer-normalization)
- [Denormalization](/learning/software-engineer-denormalization)
- [Schema Evolution](/learning/software-engineer-schema-evolution)
- [Materialized Views](/learning/software-engineer-materialized-views)
- [MOC](/learning/devops-cloud) — Data Modeling & Schema Design
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

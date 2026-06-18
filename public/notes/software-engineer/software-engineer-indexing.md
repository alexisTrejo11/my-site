# Indexing

> Auxiliary data structures that let the engine find rows without full table scans.

## What it is

- Trade storage and write overhead for read speed.
- Choose indexes to match **filter**, **join**, and **sort** columns.
- Too many indexes slow writes — profile before adding.

## Why it matters

Understanding **Indexing** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Secondary Indexes](/learning/software-engineer-secondary-indexes)
- [Composite Index](/learning/software-engineer-composite-index)
- [Covering Index](/learning/software-engineer-covering-index)
- [Bloom Filter](/learning/software-engineer-bloom-filter)
- [MOC](/learning/devops-cloud) — Indexing & Query Optimization
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

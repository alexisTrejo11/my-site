# Covering Index

> Index that contains all columns needed by a query — no heap fetch.

## What it is

- Also called **index-only scan** when possible.
- Include extra columns in index definition (INCLUDE / covering).
- Huge win for read-heavy reporting queries.

## Why it matters

Understanding **Covering Index** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Indexing](/learning/software-engineer-indexing)
- [Secondary Indexes](/learning/software-engineer-secondary-indexes)
- [Composite Index](/learning/software-engineer-composite-index)
- [Bloom Filter](/learning/software-engineer-bloom-filter)
- [MOC](/learning/devops-cloud) — Indexing & Query Optimization
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

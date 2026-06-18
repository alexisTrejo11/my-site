# Composite Index

> Single index spanning multiple columns in defined order.

## What it is

- Left-prefix rule: `(a,b,c)` helps `WHERE a`, `a AND b`, not always `b` alone.
- Column order should match query patterns.
- Can serve filters + sort if columns align.

## Why it matters

Understanding **Composite Index** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Indexing](/learning/software-engineer-indexing)
- [Secondary Indexes](/learning/software-engineer-secondary-indexes)
- [Covering Index](/learning/software-engineer-covering-index)
- [Bloom Filter](/learning/software-engineer-bloom-filter)
- [MOC](/learning/devops-cloud) — Indexing & Query Optimization
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

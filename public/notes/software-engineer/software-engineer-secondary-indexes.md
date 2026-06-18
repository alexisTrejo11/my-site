# Secondary Indexes

> Indexes on non-primary-key columns for alternate lookup paths.

## What it is

- Each secondary index points to primary key or row location.
- Updates must maintain all indexes on a row change.
- Covering indexes avoid table lookups — see [Covering Index](/learning/software-engineer-covering-index).

## Why it matters

Understanding **Secondary Indexes** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Indexing](/learning/software-engineer-indexing)
- [Composite Index](/learning/software-engineer-composite-index)
- [Covering Index](/learning/software-engineer-covering-index)
- [Bloom Filter](/learning/software-engineer-bloom-filter)
- [MOC](/learning/devops-cloud) — Indexing & Query Optimization
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

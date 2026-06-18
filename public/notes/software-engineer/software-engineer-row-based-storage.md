# Row-Based Storage

> Store all columns of a row together — OLTP default.

## What it is

- Fast point lookups and small updates.
- Used by PostgreSQL heap, MySQL InnoDB clustered rows.
- Less efficient for analytics scanning few columns.

## Why it matters

Understanding **Row-Based Storage** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Write Ahead Logging](/learning/software-engineer-write-ahead-logging)
- [Checkpointing](/learning/software-engineer-checkpointing)
- [Compaction](/learning/software-engineer-compaction)
- [Columnar Storage](/learning/software-engineer-columnar-storage)
- [MOC](/learning/devops-cloud) — Storage Engine Internals
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

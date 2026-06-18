# Columnar Storage

> Store each column contiguously — analytics optimized.

## What it is

- Better compression and vectorized scans.
- Examples: Parquet, ClickHouse, BigQuery column files.
- Slow for single-row updates — batch loads instead.

## Why it matters

Understanding **Columnar Storage** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Write Ahead Logging](/learning/software-engineer-write-ahead-logging)
- [Checkpointing](/learning/software-engineer-checkpointing)
- [Compaction](/learning/software-engineer-compaction)
- [Row Based Storage](/learning/software-engineer-row-based-storage)
- [MOC](/learning/devops-cloud) — Storage Engine Internals
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

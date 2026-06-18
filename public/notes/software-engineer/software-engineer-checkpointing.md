# Checkpointing

> Flushing dirty pages to disk so recovery replays less WAL.

## What it is

- Trade-off: frequent checkpoints vs recovery time.
- Background writer processes in PostgreSQL, InnoDB.
- Impacts burst I/O — tune for SSD vs HDD.

## Why it matters

Understanding **Checkpointing** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Write Ahead Logging](/learning/software-engineer-write-ahead-logging)
- [Compaction](/learning/software-engineer-compaction)
- [Row Based Storage](/learning/software-engineer-row-based-storage)
- [Columnar Storage](/learning/software-engineer-columnar-storage)
- [MOC](/learning/devops-cloud) — Storage Engine Internals
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

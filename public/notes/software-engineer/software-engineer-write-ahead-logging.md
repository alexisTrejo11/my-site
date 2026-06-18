# Write-Ahead Logging

> WAL — log changes before applying to data pages for crash recovery.

## What it is

- Durability: commit when log is fsync'd.
- Replay log on restart to restore consistent state.
- Also used for [Physical Replication](/learning/software-engineer-physical-replication) streaming.

## Why it matters

Understanding **Write-Ahead Logging** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Checkpointing](/learning/software-engineer-checkpointing)
- [Compaction](/learning/software-engineer-compaction)
- [Row Based Storage](/learning/software-engineer-row-based-storage)
- [Columnar Storage](/learning/software-engineer-columnar-storage)
- [MOC](/learning/devops-cloud) — Storage Engine Internals
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

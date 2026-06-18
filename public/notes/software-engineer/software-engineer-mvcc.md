# MVCC

> Multi-Version Concurrency Control — keep old row versions for concurrent readers.

## What it is

- Readers don't block writers; writers don't block readers.
- Vacuum/ compaction reclaims old versions.
- Transaction ID visibility rules define what each txn sees.

## Why it matters

Understanding **MVCC** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [ACID](/learning/software-engineer-acid)
- [Eventual Consistency](/learning/software-engineer-eventual-consistency)
- [Strong Consistency](/learning/software-engineer-strong-consistency)
- [Snapshot Isolation](/learning/software-engineer-snapshot-isolation)
- [MOC](/learning/devops-cloud) — Consistency Models
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

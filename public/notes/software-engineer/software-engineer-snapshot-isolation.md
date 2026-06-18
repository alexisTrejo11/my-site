# Snapshot Isolation

> Each transaction reads from a consistent snapshot as of transaction start.

## What it is

- Prevents dirty and non-repeatable reads in many cases.
- [Write Skew](/learning/software-engineer-write-skew) still possible without additional locks.
- Foundation of [MVCC](/learning/software-engineer-mvcc) in PostgreSQL, InnoDB.

## Why it matters

Understanding **Snapshot Isolation** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [ACID](/learning/software-engineer-acid)
- [Eventual Consistency](/learning/software-engineer-eventual-consistency)
- [Strong Consistency](/learning/software-engineer-strong-consistency)
- [MVCC](/learning/software-engineer-mvcc)
- [MOC](/learning/devops-cloud) — Consistency Models
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

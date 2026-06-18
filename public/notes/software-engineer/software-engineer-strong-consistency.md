# Strong Consistency

> After a write completes, all readers see the new value.

## What it is

- Implemented via single leader, sync replication, or quorum reads.
- Higher latency, lower availability under partitions.
- Required for financial balances, inventory locks.

## Why it matters

Understanding **Strong Consistency** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [ACID](/learning/software-engineer-acid)
- [Eventual Consistency](/learning/software-engineer-eventual-consistency)
- [Snapshot Isolation](/learning/software-engineer-snapshot-isolation)
- [MVCC](/learning/software-engineer-mvcc)
- [MOC](/learning/devops-cloud) — Consistency Models
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

# Lock Escalation

> Engine upgrades many row locks to table lock to save memory.

## What it is

- Can suddenly block unrelated rows — throughput cliff.
- Batch updates may trigger escalation on SQL Server.
- Tune lock granularity or partition tables.

## Why it matters

Understanding **Lock Escalation** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Deadlock](/learning/software-engineer-deadlock)
- [Optimistic Locking](/learning/software-engineer-optimistic-locking)
- [Pessimistic Locking](/learning/software-engineer-pessimistic-locking)
- [MOC](/learning/devops-cloud) — Concurrency Control & Locking
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

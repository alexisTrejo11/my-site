# Three-Phase Commit

> 3PC — adds pre-commit phase to reduce blocking vs 2PC.

## What it is

- Still vulnerable to network partitions in theory.
- Rare in production; 2PC + timeouts more common.
- Understand limits before cross-DB transactions.

## Why it matters

Understanding **Three-Phase Commit** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Two Phase Commit](/learning/software-engineer-two-phase-commit)
- [MOC](/learning/devops-cloud) — Distributed Transactions
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

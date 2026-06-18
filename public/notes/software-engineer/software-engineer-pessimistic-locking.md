# Pessimistic Locking

> Acquire locks before modifying — SELECT FOR UPDATE.

## What it is

- Prevents lost updates and some anomalies upfront.
- Risk of deadlocks and reduced concurrency.
- Use when contention is high and conflicts costly.

## Why it matters

Understanding **Pessimistic Locking** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Deadlock](/learning/software-engineer-deadlock)
- [Lock Escalation](/learning/software-engineer-lock-escalation)
- [Optimistic Locking](/learning/software-engineer-optimistic-locking)
- [MOC](/learning/devops-cloud) — Concurrency Control & Locking
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

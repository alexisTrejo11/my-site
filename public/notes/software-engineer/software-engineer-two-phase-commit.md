# Two-Phase Commit

> 2PC — coordinator prepares then commits all participants atomically.

## What it is

- **Phase 1 Prepare**: vote ready. **Phase 2 Commit/Abort**.
- Blocking if coordinator fails after prepare.
- Used in XA transactions — prefer sagas/outbox at microservice scale.

## Why it matters

Understanding **Two-Phase Commit** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Three Phase Commit](/learning/software-engineer-three-phase-commit)
- [MOC](/learning/devops-cloud) — Distributed Transactions
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

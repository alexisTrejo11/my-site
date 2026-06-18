# Exactly-Once Semantics

> Each message/effect processed once despite retries and failures.

## What it is

- Hard end-to-end — often **at-least-once + idempotent** in practice.
- Kafka transactions + idempotent producer help within pipeline.
- Distinguish delivery vs processing guarantees.

## Why it matters

Understanding **Exactly-Once Semantics** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Change Data Capture](/learning/software-engineer-change-data-capture)
- [Data Migration](/learning/software-engineer-data-migration)
- [Idempotency](/learning/software-engineer-idempotency)
- [MOC](/learning/devops-cloud) — Data Integration & Change Propagation
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

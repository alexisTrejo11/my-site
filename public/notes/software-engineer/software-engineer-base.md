# BASE

> Basically Available, Soft state, Eventually consistent — pragmatic alternative to ACID at scale.

## What it is

- Embrace temporary inconsistency with reconciliation.
- Common in large AP caches and NoSQL.
- Application must handle intermediate states.

## Why it matters

Understanding **BASE** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Consensus](/learning/software-engineer-consensus)
- [Quorum](/learning/software-engineer-quorum)
- [CAP Theorem](/learning/software-engineer-cap-theorem)
- [Split Brain](/learning/software-engineer-split-brain)
- [MOC](/learning/devops-cloud) — Distributed Systems Fundamentals
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

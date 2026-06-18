# CAP Theorem

> Under partition, a system must choose between consistency and availability.

## What it is

- **C**onsistency, **A**vailability, **P**artition tolerance — pick two under network split.
- In practice: CP (strong consistency) vs AP (eventual) tuning.
- See [Eventual Consistency](/learning/software-engineer-eventual-consistency) and [Strong Consistency](/learning/software-engineer-strong-consistency).

## Why it matters

Understanding **CAP Theorem** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Consensus](/learning/software-engineer-consensus)
- [Quorum](/learning/software-engineer-quorum)
- [BASE](/learning/software-engineer-base)
- [Split Brain](/learning/software-engineer-split-brain)
- [MOC](/learning/devops-cloud) — Distributed Systems Fundamentals
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

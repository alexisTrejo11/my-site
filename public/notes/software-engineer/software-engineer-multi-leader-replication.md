# Multi-Leader Replication

> Multiple nodes accept writes — conflicts possible.

## What it is

- Useful for multi-datacenter or offline-first apps.
- Requires conflict resolution (LWW, CRDTs, app merge).
- Harder than single-leader — avoid unless needed.

## Why it matters

Understanding **Multi-Leader Replication** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Read Replicas](/learning/software-engineer-read-replicas)
- [Leader Follower Replication](/learning/software-engineer-leader-follower-replication)
- [Logical Replication](/learning/software-engineer-logical-replication)
- [Physical Replication](/learning/software-engineer-physical-replication)
- [MOC](/learning/devops-cloud) — Replication & Data Distribution
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

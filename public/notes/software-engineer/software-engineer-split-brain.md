# Split-Brain

> Two partitions both believe they are the leader — risk of divergent writes.

## What it is

- Prevent with quorum, fencing tokens, STONITH.
- Use odd member counts and witness nodes.
- Related to [Failover](/learning/software-engineer-failover) design.

## Why it matters

Understanding **Split-Brain** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Consensus](/learning/software-engineer-consensus)
- [Quorum](/learning/software-engineer-quorum)
- [CAP Theorem](/learning/software-engineer-cap-theorem)
- [BASE](/learning/software-engineer-base)
- [MOC](/learning/devops-cloud) — Distributed Systems Fundamentals
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

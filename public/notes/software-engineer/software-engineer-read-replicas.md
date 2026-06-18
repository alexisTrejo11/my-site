# Read Replicas

> Secondary copies that serve read traffic while leader handles writes.

## What it is

- Scale read-heavy workloads horizontally.
- **Replication lag** → stale reads — know your consistency needs.
- Route analytics to replicas; critical reads to leader if needed.

## Why it matters

Understanding **Read Replicas** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Leader Follower Replication](/learning/software-engineer-leader-follower-replication)
- [Multi Leader Replication](/learning/software-engineer-multi-leader-replication)
- [Logical Replication](/learning/software-engineer-logical-replication)
- [Physical Replication](/learning/software-engineer-physical-replication)
- [MOC](/learning/devops-cloud) — Replication & Data Distribution
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

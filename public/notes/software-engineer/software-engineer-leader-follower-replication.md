# Leader-Follower Replication

> Single leader accepts writes; followers replicate the log.

## What it is

- Also called primary-replica or master-slave.
- Failover promotes a follower — see [Failover](/learning/software-engineer-failover).
- Simple model; leader is write bottleneck.

## Why it matters

Understanding **Leader-Follower Replication** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Read Replicas](/learning/software-engineer-read-replicas)
- [Multi Leader Replication](/learning/software-engineer-multi-leader-replication)
- [Logical Replication](/learning/software-engineer-logical-replication)
- [Physical Replication](/learning/software-engineer-physical-replication)
- [MOC](/learning/devops-cloud) — Replication & Data Distribution
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

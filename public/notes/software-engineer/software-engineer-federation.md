# Federation

> Splitting databases by domain or tenant across independent systems.

## What it is

- Each service owns its DB — no shared monolith schema.
- Cross-federation queries need APIs or async events.
- Trade global joins for team autonomy and scale.

## Why it matters

Understanding **Federation** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Read Replicas](/learning/software-engineer-read-replicas)
- [Leader Follower Replication](/learning/software-engineer-leader-follower-replication)
- [Multi Leader Replication](/learning/software-engineer-multi-leader-replication)
- [Logical Replication](/learning/software-engineer-logical-replication)
- [MOC](/learning/devops-cloud) — Replication & Data Distribution
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

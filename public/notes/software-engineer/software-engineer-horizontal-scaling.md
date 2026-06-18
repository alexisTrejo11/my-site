# Horizontal Scaling

> Add more machines/nodes to handle load — scale out.

## What it is

- Requires shared-nothing or sharded architecture.
- Cheaper long-term at web scale; ops complexity rises.
- See Partitioning patterns in section 03.

## Why it matters

Understanding **Horizontal Scaling** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Vertical Scaling](/learning/software-engineer-vertical-scaling)
- [Load Balancing](/learning/software-engineer-load-balancing)
- [Connection Pooling](/learning/software-engineer-connection-pooling)
- [Caching](/learning/software-engineer-caching)
- [MOC](/learning/devops-cloud) — Scalability & Performance
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

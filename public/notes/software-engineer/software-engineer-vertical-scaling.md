# Vertical Scaling

> Bigger CPU/RAM/disk on one machine — scale up.

## What it is

- Simplest until hardware limits hit.
- Single point of failure unless paired with HA.
- Often first step before sharding.

## Why it matters

Understanding **Vertical Scaling** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Horizontal Scaling](/learning/software-engineer-horizontal-scaling)
- [Load Balancing](/learning/software-engineer-load-balancing)
- [Connection Pooling](/learning/software-engineer-connection-pooling)
- [Caching](/learning/software-engineer-caching)
- [MOC](/learning/devops-cloud) — Scalability & Performance
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

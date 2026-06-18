# Backpressure

> Slow producers when consumers are overloaded.

## What it is

- Prevents unbounded queues and OOM cascades.
- Reactive streams, bounded channels, 429 responses.
- Pair with [Rate Limiting](/learning/software-engineer-rate-limiting) at edge.

## Why it matters

Understanding **Backpressure** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Horizontal Scaling](/learning/software-engineer-horizontal-scaling)
- [Vertical Scaling](/learning/software-engineer-vertical-scaling)
- [Load Balancing](/learning/software-engineer-load-balancing)
- [Connection Pooling](/learning/software-engineer-connection-pooling)
- [MOC](/learning/devops-cloud) — Scalability & Performance
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

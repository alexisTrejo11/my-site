# Connection Pooling

> Reuse DB connections instead of opening per request.

## What it is

- Avoids TCP + auth handshake overhead.
- Size pool to DB max_connections and app threads.
- PgBouncer, HikariCP, RDS Proxy patterns.

## Why it matters

Understanding **Connection Pooling** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Horizontal Scaling](/learning/software-engineer-horizontal-scaling)
- [Vertical Scaling](/learning/software-engineer-vertical-scaling)
- [Load Balancing](/learning/software-engineer-load-balancing)
- [Caching](/learning/software-engineer-caching)
- [MOC](/learning/devops-cloud) — Scalability & Performance
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

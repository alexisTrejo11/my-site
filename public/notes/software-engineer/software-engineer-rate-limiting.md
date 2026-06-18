# Rate Limiting

> Cap requests per client/IP/key in a time window.

## What it is

- Token bucket, leaky bucket, fixed/sliding window.
- Returns 429 Too Many Requests with Retry-After.
- Protects auth endpoints and expensive APIs.

## Why it matters

Understanding **Rate Limiting** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Failover](/learning/software-engineer-failover)
- [High Availability](/learning/software-engineer-high-availability)
- [Circuit Breaker](/learning/software-engineer-circuit-breaker)
- [Throttling](/learning/software-engineer-throttling)
- [MOC](/learning/devops-cloud) — Resilience, Reliability & Availability
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

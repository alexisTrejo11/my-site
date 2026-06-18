# Throttling

> Gradually slow request rate to protect system capacity.

## What it is

- Queue + delay vs hard reject.
- Client-side adaptive throttling in gRPC.
- Different from [Rate Limiting](/learning/software-engineer-rate-limiting) (often hard cap).

## Why it matters

Understanding **Throttling** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Failover](/learning/software-engineer-failover)
- [High Availability](/learning/software-engineer-high-availability)
- [Circuit Breaker](/learning/software-engineer-circuit-breaker)
- [Rate Limiting](/learning/software-engineer-rate-limiting)
- [MOC](/learning/devops-cloud) — Resilience, Reliability & Availability
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

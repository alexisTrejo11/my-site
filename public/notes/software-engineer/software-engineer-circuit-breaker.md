# Circuit Breaker

> Stop calling a failing dependency after threshold — fail fast.

## What it is

- States: closed → open → half-open probe.
- Prevents retry storms that amplify outages.
- Resilience4j, Hystrix patterns in microservices.

## Why it matters

Understanding **Circuit Breaker** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Failover](/learning/software-engineer-failover)
- [High Availability](/learning/software-engineer-high-availability)
- [Throttling](/learning/software-engineer-throttling)
- [Rate Limiting](/learning/software-engineer-rate-limiting)
- [MOC](/learning/devops-cloud) — Resilience, Reliability & Availability
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

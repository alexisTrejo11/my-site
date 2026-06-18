# Failover

> Automatic or manual switch to standby when primary fails.

## What it is

- DNS, VIP, or leader election triggers routing change.
- RTO/RPO targets drive sync vs async replication.
- Test failover — [Split-Brain](/learning/software-engineer-split-brain) is a real risk.

## Why it matters

Understanding **Failover** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [High Availability](/learning/software-engineer-high-availability)
- [Circuit Breaker](/learning/software-engineer-circuit-breaker)
- [Throttling](/learning/software-engineer-throttling)
- [Rate Limiting](/learning/software-engineer-rate-limiting)
- [MOC](/learning/devops-cloud) — Resilience, Reliability & Availability
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

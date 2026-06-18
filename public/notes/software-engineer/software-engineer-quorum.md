# Quorum

> Minimum number of nodes that must agree for a read or write to proceed.

## What it is

- Typical: W + R > N for tunable consistency (N replicas).
- Prevents serving stale data from minority partition.
- Sloppy quorums + hinted handoff (Dynamo) relax strictness.

## Why it matters

Understanding **Quorum** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Consensus](/learning/software-engineer-consensus)
- [CAP Theorem](/learning/software-engineer-cap-theorem)
- [BASE](/learning/software-engineer-base)
- [Split Brain](/learning/software-engineer-split-brain)
- [MOC](/learning/devops-cloud) — Distributed Systems Fundamentals
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

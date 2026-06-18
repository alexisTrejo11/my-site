# Write Skew

> Two transactions read overlapping state and write disjoint rows — invariant breaks.

## What it is

- Classic on-call scheduling: two people both think they're on call.
- Needs serializable isolation or explicit locking.
- Not always prevented by snapshot isolation alone.

## Why it matters

Understanding **Write Skew** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Dirty Read](/learning/software-engineer-dirty-read)
- [Phantom Read](/learning/software-engineer-phantom-read)
- [Read Skew](/learning/software-engineer-read-skew)
- [MOC](/learning/devops-cloud) — Transaction Anomalies
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

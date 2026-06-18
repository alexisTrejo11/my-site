# Read Skew

> Reading two related rows at different points in time — inconsistent snapshot.

## What it is

- Example: account total vs sum of line items mismatch mid-transfer.
- Fixed by snapshot isolation or repeatable read.
- Common in multi-row business invariants.

## Why it matters

Understanding **Read Skew** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Dirty Read](/learning/software-engineer-dirty-read)
- [Phantom Read](/learning/software-engineer-phantom-read)
- [Write Skew](/learning/software-engineer-write-skew)
- [MOC](/learning/devops-cloud) — Transaction Anomalies
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

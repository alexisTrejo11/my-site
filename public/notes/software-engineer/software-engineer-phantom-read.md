# Phantom Read

> Same query returns different rows because another txn inserted/deleted.

## What it is

- Range scans affected — new rows **appear** or vanish.
- SERIALIZABLE or gap locks prevent in strict engines.
- Report queries may double-count without care.

## Why it matters

Understanding **Phantom Read** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Dirty Read](/learning/software-engineer-dirty-read)
- [Read Skew](/learning/software-engineer-read-skew)
- [Write Skew](/learning/software-engineer-write-skew)
- [MOC](/learning/devops-cloud) — Transaction Anomalies
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

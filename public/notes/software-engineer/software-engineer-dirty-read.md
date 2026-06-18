# Dirty Read

> Reading uncommitted data from another transaction.

## What it is

- Prevented at READ COMMITTED and above.
- Dangerous: you act on data that gets rolled back.
- Map to SQL isolation level when designing.

## Why it matters

Understanding **Dirty Read** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Phantom Read](/learning/software-engineer-phantom-read)
- [Read Skew](/learning/software-engineer-read-skew)
- [Write Skew](/learning/software-engineer-write-skew)
- [MOC](/learning/devops-cloud) — Transaction Anomalies
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

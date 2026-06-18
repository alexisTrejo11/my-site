# Compaction

> Merging SSTables or reclaiming space in LSM and append-only stores.

## What it is

- Reduces read amplification in [LSM Tree](/learning/software-engineer-lsm-tree).
- Can cause temporary I/O spikes — schedule off-peak.
- Tombstones removed during merge.

## Why it matters

Understanding **Compaction** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Write Ahead Logging](/learning/software-engineer-write-ahead-logging)
- [Checkpointing](/learning/software-engineer-checkpointing)
- [Row Based Storage](/learning/software-engineer-row-based-storage)
- [Columnar Storage](/learning/software-engineer-columnar-storage)
- [MOC](/learning/devops-cloud) — Storage Engine Internals
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

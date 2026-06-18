# Query Planner

> Engine component that chooses execution strategy for a SQL query.

## What it is

- Considers indexes, join order, parallelism, statistics.
- Same query text → different plans as data grows.
- Use EXPLAIN / EXPLAIN ANALYZE to inspect.

## Why it matters

Understanding **Query Planner** helps you reason about trade-offs in production data systems — when to apply it, what breaks at scale, and how it connects to neighboring ideas in this section.

## In practice

- Map the concept to tools you use (PostgreSQL, Kafka, Redis, etc.).
- Look for metrics or symptoms that indicate misuse or missing optimization.
- Cross-read the section index: [MOC](/learning/devops-cloud).

## Related notes

- [Indexing](/learning/software-engineer-indexing)
- [Secondary Indexes](/learning/software-engineer-secondary-indexes)
- [Composite Index](/learning/software-engineer-composite-index)
- [Covering Index](/learning/software-engineer-covering-index)
- [MOC](/learning/devops-cloud) — Indexing & Query Optimization
- [Software Engineer MOC](/learning/software-engineer-master-moc) — full glossary roadmap

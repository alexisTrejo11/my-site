# 02. Indexing & Query Optimization

> How indexes and planners make queries fast — B-trees, LSM, and bloom filters.

← [Software Engineer MOC](/learning/software-engineer-master-moc)

---

## Concepts

| Note | Summary |
| ---- | ------- |
| [Indexing](/learning/software-engineer-indexing) | Auxiliary data structures that let the engine find rows without full table scans. |
| [Secondary Indexes](/learning/software-engineer-secondary-indexes) | Indexes on non-primary-key columns for alternate lookup paths. |
| [Composite Index](/learning/software-engineer-composite-index) | Single index spanning multiple columns in defined order. |
| [Covering Index](/learning/software-engineer-covering-index) | Index that contains all columns needed by a query — no heap fetch. |
| [Bloom Filter](/learning/software-engineer-bloom-filter) | Probabilistic structure: quickly tells you a key is **definitely not** present. |
| [Query Planner](/learning/software-engineer-query-planner) | Engine component that chooses execution strategy for a SQL query. |
| [Cost Based Optimizer](/learning/software-engineer-cost-based-optimizer) | Planner that picks the lowest-estimated-cost plan using table statistics. |
| [B Tree](/learning/software-engineer-b-tree) | Balanced tree index — default for most relational databases. |
| [LSM Tree](/learning/software-engineer-lsm-tree) | Log-Structured Merge tree — write-optimized storage used in Cassandra, RocksDB, LevelDB. |

---

## Suggested order

Read top-to-bottom within this section, or jump to the concept you need and follow **Related notes** links.

## Add a new concept

Create a note in this folder using System/Templates/Template Tech Note, add a row to this table, and link it from [Software Engineer MOC](/learning/software-engineer-master-moc).

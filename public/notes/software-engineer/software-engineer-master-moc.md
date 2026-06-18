# Software Engineer: Data & Systems Concepts

> Master glossary of **73 concepts** across data modeling, distributed systems, storage, and operations — organized for deep study and web publishing.

← Computing Master Index

---

## Sections

| Section | Focus |
| ------- | ----- |
| 01. Data Modeling & Schema Design | How to structure data — normalization, evolution, and precomputed views. |
| 02. Indexing & Query Optimization | How indexes and planners make queries fast — B-trees, LSM, and bloom filters. |
| 03. Partitioning, Sharding & Data Distribution | Splitting data across nodes — hash/range keys, hot spots, and rebalancing. |
| 04. Replication & Data Distribution | Copies of data across nodes — leader/follower, geo-replication, and federation. |
| 05. Distributed Systems Fundamentals | Core ideas for multiple nodes — consensus, quorums, CAP, and split-brain. |
| 06. Consistency Models | Guarantees readers see — ACID, eventual vs strong, snapshots, and MVCC. |
| 07. Distributed Transactions | Coordinating commits across multiple nodes — 2PC and 3PC. |
| 08. Concurrency Control & Locking | How databases serialize concurrent access — deadlocks and lock strategies. |
| 09. Transaction Anomalies | Isolation failures — dirty reads, phantoms, and skew patterns. |
| 10. Storage Engine Internals | How data hits disk — WAL, compaction, row vs columnar layouts. |
| 11. Scalability & Performance | Growing systems — horizontal vs vertical scale, pooling, cache, backpressure. |
| 12. Resilience, Reliability & Availability | Staying up under failure — failover, HA, circuit breakers, and throttling. |
| 13. Data Integration & Change Propagation | Moving and syncing data — CDC, migration, idempotency, exactly-once. |
| 14. Analytics & Data Platforms | Large-scale analytics storage — data lakes vs warehouses. |

---

## How to use this

1. Pick a **section** aligned with what you're building (e.g. replication before multi-region).
2. Open the section **00_MOC** and read concepts in order or by need.
3. Each note has frontmatter ready for your static site (`slug`, `description`, `tags`).
4. Add new notes in the matching numbered folder and update that section's MOC.

---

## Cross-cutting themes

| Theme | Sections |
| ----- | -------- |
| **Correctness** | 06, 07, 08, 09 |
| **Scale-out** | 03, 04, 11 |
| **Performance** | 02, 10, 11 |
| **Operations** | 12, 13 |
| **Analytics** | 14 |

---

## Legacy index

Original flat list preserved at [CONCEPT](/learning/general-concept-glossary) (redirects here).

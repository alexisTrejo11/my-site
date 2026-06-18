# 06. Consistency Models

> Guarantees readers see — ACID, eventual vs strong, snapshots, and MVCC.

← [Software Engineer MOC](/learning/software-engineer-master-moc)

---

## Concepts

| Note | Summary |
| ---- | ------- |
| [ACID](/learning/software-engineer-acid) | Atomicity, Consistency, Isolation, Durability — transactional guarantees in RDBMS. |
| [Eventual Consistency](/learning/software-engineer-eventual-consistency) | Replicas converge over time if no new writes — no immediate global truth. |
| [Strong Consistency](/learning/software-engineer-strong-consistency) | After a write completes, all readers see the new value. |
| [Snapshot Isolation](/learning/software-engineer-snapshot-isolation) | Each transaction reads from a consistent snapshot as of transaction start. |
| [MVCC](/learning/software-engineer-mvcc) | Multi-Version Concurrency Control — keep old row versions for concurrent readers. |

---

## Suggested order

Read top-to-bottom within this section, or jump to the concept you need and follow **Related notes** links.

## Add a new concept

Create a note in this folder using System/Templates/Template Tech Note, add a row to this table, and link it from [Software Engineer MOC](/learning/software-engineer-master-moc).

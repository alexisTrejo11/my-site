# 04. Replication & Data Distribution

> Copies of data across nodes — leader/follower, geo-replication, and federation.

← [Software Engineer MOC](/learning/software-engineer-master-moc)

---

## Concepts

| Note | Summary |
| ---- | ------- |
| [Read Replicas](/learning/software-engineer-read-replicas) | Secondary copies that serve read traffic while leader handles writes. |
| [Leader Follower Replication](/learning/software-engineer-leader-follower-replication) | Single leader accepts writes; followers replicate the log. |
| [Multi Leader Replication](/learning/software-engineer-multi-leader-replication) | Multiple nodes accept writes — conflicts possible. |
| [Logical Replication](/learning/software-engineer-logical-replication) | Replicate row/change events (INSERT/UPDATE/DELETE) at logical level. |
| [Physical Replication](/learning/software-engineer-physical-replication) | Copy WAL/storage pages block-by-block to standby. |
| [Geo Replication](/learning/software-engineer-geo-replication) | Replicating data across geographic regions for latency and DR. |
| [Federation](/learning/software-engineer-federation) | Splitting databases by domain or tenant across independent systems. |

---

## Suggested order

Read top-to-bottom within this section, or jump to the concept you need and follow **Related notes** links.

## Add a new concept

Create a note in this folder using System/Templates/Template Tech Note, add a row to this table, and link it from [Software Engineer MOC](/learning/software-engineer-master-moc).

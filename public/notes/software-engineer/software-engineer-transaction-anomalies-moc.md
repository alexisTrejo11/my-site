# 09. Transaction Anomalies

> Isolation failures — dirty reads, phantoms, and skew patterns.

← [Software Engineer MOC](/learning/software-engineer-master-moc)

---

## Concepts

| Note | Summary |
| ---- | ------- |
| [Dirty Read](/learning/software-engineer-dirty-read) | Reading uncommitted data from another transaction. |
| [Phantom Read](/learning/software-engineer-phantom-read) | Same query returns different rows because another txn inserted/deleted. |
| [Read Skew](/learning/software-engineer-read-skew) | Reading two related rows at different points in time — inconsistent snapshot. |
| [Write Skew](/learning/software-engineer-write-skew) | Two transactions read overlapping state and write disjoint rows — invariant breaks. |

---

## Suggested order

Read top-to-bottom within this section, or jump to the concept you need and follow **Related notes** links.

## Add a new concept

Create a note in this folder using System/Templates/Template Tech Note, add a row to this table, and link it from [Software Engineer MOC](/learning/software-engineer-master-moc).

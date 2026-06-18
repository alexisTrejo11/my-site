# 10. Storage Engine Internals

> How data hits disk — WAL, compaction, row vs columnar layouts.

← [Software Engineer MOC](/learning/software-engineer-master-moc)

---

## Concepts

| Note | Summary |
| ---- | ------- |
| [Write Ahead Logging](/learning/software-engineer-write-ahead-logging) | WAL — log changes before applying to data pages for crash recovery. |
| [Checkpointing](/learning/software-engineer-checkpointing) | Flushing dirty pages to disk so recovery replays less WAL. |
| [Compaction](/learning/software-engineer-compaction) | Merging SSTables or reclaiming space in LSM and append-only stores. |
| [Row Based Storage](/learning/software-engineer-row-based-storage) | Store all columns of a row together — OLTP default. |
| [Columnar Storage](/learning/software-engineer-columnar-storage) | Store each column contiguously — analytics optimized. |

---

## Suggested order

Read top-to-bottom within this section, or jump to the concept you need and follow **Related notes** links.

## Add a new concept

Create a note in this folder using System/Templates/Template Tech Note, add a row to this table, and link it from [Software Engineer MOC](/learning/software-engineer-master-moc).

# 08. Concurrency Control & Locking

> How databases serialize concurrent access — deadlocks and lock strategies.

← [Software Engineer MOC](/learning/software-engineer-master-moc)

---

## Concepts

| Note | Summary |
| ---- | ------- |
| [Deadlock](/learning/software-engineer-deadlock) | Circular wait — each transaction holds a lock the other needs. |
| [Lock Escalation](/learning/software-engineer-lock-escalation) | Engine upgrades many row locks to table lock to save memory. |
| [Optimistic Locking](/learning/software-engineer-optimistic-locking) | Assume no conflict; check version at commit time. |
| [Pessimistic Locking](/learning/software-engineer-pessimistic-locking) | Acquire locks before modifying — SELECT FOR UPDATE. |

---

## Suggested order

Read top-to-bottom within this section, or jump to the concept you need and follow **Related notes** links.

## Add a new concept

Create a note in this folder using System/Templates/Template Tech Note, add a row to this table, and link it from [Software Engineer MOC](/learning/software-engineer-master-moc).

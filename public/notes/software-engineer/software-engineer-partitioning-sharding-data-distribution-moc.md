# 03. Partitioning, Sharding & Data Distribution

> Splitting data across nodes — hash/range keys, hot spots, and rebalancing.

← [Software Engineer MOC](/learning/software-engineer-master-moc)

---

## Concepts

| Note | Summary |
| ---- | ------- |
| [Clustering](/learning/software-engineer-clustering) | Physically ordering or grouping related rows on disk or nodes. |
| [Hash Partitioning](/learning/software-engineer-hash-partitioning) | Assign rows to partitions via hash(partition_key) mod N. |
| [Range Partitioning](/learning/software-engineer-range-partitioning) | Split data by contiguous key ranges (dates, IDs). |
| [Time Series Partitioning](/learning/software-engineer-time-series-partitioning) | Range partitioning by time — common for metrics and logs. |
| [Consistent Hashing](/learning/software-engineer-consistent-hashing) | Hash ring mapping keys to nodes with minimal remapping when nodes change. |
| [Rebalancing](/learning/software-engineer-rebalancing) | Moving partitions or hash ranges between nodes to equalize load. |
| [Resharding](/learning/software-engineer-resharding) | Changing the number of shards or partition scheme. |
| [Data Locality](/learning/software-engineer-data-locality) | Keeping compute close to the data it processes to cut network cost. |
| [Hot Partition](/learning/software-engineer-hot-partition) | One shard receiving disproportionate traffic — bottleneck for the whole system. |
| [Data Skew](/learning/software-engineer-data-skew) | Uneven data or query distribution across partitions or workers. |

---

## Suggested order

Read top-to-bottom within this section, or jump to the concept you need and follow **Related notes** links.

## Add a new concept

Create a note in this folder using System/Templates/Template Tech Note, add a row to this table, and link it from [Software Engineer MOC](/learning/software-engineer-master-moc).

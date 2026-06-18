# What is Kafka?

## Definition
Apache Kafka is a **distributed event streaming platform** used for:
- Publishing and subscribing to streams records (like a message queue)
- Storing streams of records persistently (like a database)
- Processing streams of records in real-time (like stream processing)

## Key characteristics

| Characteristic      | Description                                       |
| ------------------- | ------------------------------------------------- |
| **Distributed**     | Runs a cluster across multiple servers            |
| **Persistent**      | Message are stored on disk, los after consumption |
| **Fault-tolerant**  | Replicates data across brokers                    |
| **Scalable**        | Add more brokers or partitions without downtime   |
| **High throughput** | Millions of messages per second                   |
| **Low latency**     | Millisecond response times                        |
| **Pull-based**      | Consumers pull messages (not pushed)              |

## Kafka vs Traditional Message Brokers

| **Feature**           | **Traditional Brokers (RabbitMQ / ActiveMQ)**                                                         | **Apache Kafka (Distributed Log)**                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Core Concept**      | **Transient Queue:** Messages are treated as temporary tasks and deleted after a successful "ACK".    | **Persistent Log:** Messages are immutable records stored in an ordered history (append-only).           |
| **Routing Logic**     | **Advanced:** Native support for complex routing (Exchanges) based on patterns, headers, and keys.    | **Basic:** Routing is strictly based on Topics and Partitions. Complex logic is handled by the consumer. |
| **Consumption Model** | **Push-based:** The broker pushes messages to consumers as soon as they are available.                | **Pull-based:** Consumers request batches of messages at their own pace (backpressure control).          |
| **Scalability**       | **Vertical:** Harder to scale horizontally without adding significant complexity to the cluster.      | **Horizontal:** Designed to be distributed across many nodes by partitioning data.                       |
| **Message Ordering**  | Guaranteed only with **one consumer per queue**. Supports priority queues (re-ordering).              | Strictly guaranteed **within a partition**, even with millions of messages. No priority support.         |
| **Message Replay**    | **Impossible:** Once a message is acknowledged and deleted, it cannot be retrieved.                   | **Native:** You can "rewind" the offset to re-process historical data (Time Travel).                     |
| **Throughput**        | **Moderate:** High overhead per message because the broker tracks the state of every individual task. | **Massive:** Optimized for high-volume ingestion using sequential disk I/O and zero-copy.                |
| **Latency**           | **Very Low:** Often faster for point-to-point delivery of a single message.                           | **Low but Batch-oriented:** Latency is slightly higher due to the focus on throughput and batching.      |


## When to use Kafka

✅ **Good fit:**
- Event sourcing / event-driven architecture
- Activity tracking (user actions, clicks)
- Log aggregation from multiple services
- Metrics collection
- Real-time data pipelines
- Decoupling microservices with high volume


❌ **Not ideal for:**
- Simple request-reply patterns (use REST/gRPC)
- Very small message volumes (<1000/day)
- When exactly-once processing isn't critical (Kafka can do it but adds complexity)
- When you need a simple queue with one consume

## Real-world example in your Drugstore Platform

```text
[Order Service] --(order.created)--> Kafka Topic: "orders"  
│  
├─► [Payment Service] (process payment)  
├─► [Inventory Service] (reserve stock)  
├─► [Notification Service] (send email)  
└─► [Analytics Service] (track metrics)
```

## Key terms (cheat sheet)

| Term            | Simple definition                               |
| --------------- | ----------------------------------------------- |
| Event           | A record/message (e.g., "user placed order")    |
| Topic           | A category or feed name (like a database table) |
| Partition       | A split of a topic across brokers (parallelism) |
| Offset          | A sequential ID of a message within a partition |
| Broker          | A Kafka server (node in the cluster)            |
| Producer        | An application that writes messages             |
| Consumer        | An application that reads messages              |
| Consumer Group  | A set of consumers working together             |
| Zookeeper/KRaft | Cluster coordination (KRaft is the new way)     |


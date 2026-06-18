# Kafka Core Concepts

## 1. Events (Messages)
An event has:
- **Key** (optional determines partition)
- **Value** (the actual data, required)
- **Timestamp** (when the event occurred)
- **Headers** (metadata, optional)

```json
{
"key": "order-12345",
"value": {
	"eventType": "order.created",
	"orderId" : "12345",
	"userId" : "user-789",
	"totalAmount": 99.99
},
"timestamp": 1704067200000,
"headers": {
    "content-type": "application/json",
    "trace-id": "abc-123"
  }
}
```

## 2. Topics
- A topic is a **named logical channel**
- Analogy: Think of a topic as a **database table** (without schema enforcement by default)
- Naming convention: `domain.event-action` (e.g., `orders.created`, `inventory.reserved`)


```bash
# Create a topic
kafka-topics --create \
  --topic orders.created \
  --partitions 3 \
  --replication-factor 2 \
  --bootstrap-server localhost:9092
```

## 3. Partitions
- Each topic is split into partitions (parallelism unit)
- Messages within a same partition are ordered
- No ordering guarantee across different partitions

```text
Topic: orders.created (3 partitions)
┌─────────────────────────────────────────────────┐
│ Partition 0: [msg0] [msg1] [msg2] [msg3] ...    │
│ Partition 1: [msg0] [msg1] [msg2] ...           │
│ Partition 2: [msg0] [msg1] [msg2] [msg3] [msg4] │
└─────────────────────────────────────────────────┘

How key affects partition:
  partition = hash(key) % numPartitions
  (if no key, round-robin or sticky partitioner)
```


## 4. Offsets
- A **sequential ID** for each message within a partition
- Starts at 0, increments by 1
- Consumers track which offset they've read (commit)

```text

Partition 0:
┌──────┬──────┬──────┬──────┬──────┐
│ off0 │ off1 │ off2 │ off3 │ off4 │
│ msgA │ msgB │ msgC │ msgD │ msgE │
└──────┴──────┴──────┴──────┴──────┘
				▲
				│
	  Consumer last committed: offset 2
	  (next message to read: offset 3)
```

## 5. Brokers
- A Kafka **broker** = one Kafka server process
- You typically run multiple brokers = **Kafka cluster**
- One broker is the **controller** (manages partitions, leader election)
    
```text
Cluster with 3 brokers:
    [Broker 1]  ←──Leader for Partition 0─┐
         ▲                                │
         │                                │
    [Broker 2]  ←──Leader for Partition 1 │
         ▲                                │
         │                                │
    [Broker 3]  ←──Leader for Partition 2 │
                                          │
    Replicas:                             │
      Partition 0 replicas: Broker1(leader), Broker2, Broker3
      Partition 1 replicas: Broker2(leader), Broker3, Broker1
      Partition 2 replicas: Broker3(leader), Broker1, Broker2
```


## 6. Replication Factor
- **Replication factor** = number of copies of each partition
- Example: Replication factor = 3
    - Partition 0: leader on Broker1, followers on Broker2 and Broker3
    - If Broker1 fails, Broker2 or Broker3 becomes leader automatically

|Replication Factor|Pros| Cons                                 |
| ------------------ | ------------------- | ------------------------------------ |
|1|Fastest writes| If broker dies → data loss           |
|2|Balanced| Still risk if both replicas fail     |
|3|Production standard| More storage, slightly slower writes 
## 7. Retention
How long Kafka keeps messages:
```bash
# By time: keep messages for 7 days
kafka-configs --alter --entity-type topics \
  --entity-name orders.created \
  --add-config retention.ms=604800000

# By size: keep up to 1GB per partition
kafka-configs --alter --entity-type topics \
  --entity-name orders.created \
  --add-config retention.bytes=1073741824
```

## Diagram: Complete flow

```text
┌──────────────┐    ┌─────────────────────────────────────┐    ┌──────────────┐
│  Producer    │───►│            Kafka Cluster            │◄───│  Consumer    │
│ (Order Svc)  │    │  ┌─────┐ ┌─────┐ ┌─────┐            │    │ (Payment Svc)│
└──────────────┘    │  │ B1  │ │ B2  │ │ B3  │            │    └──────────────┘
                    │  └─────┘ └─────┘ └─────┘            │
                    │     │        │        │             │
                    │     ▼        ▼        ▼             │
                    │  Topic: orders.created (3 part)     │
                    │  Part0: [0][1][2]...                │
                    │  Part1: [0][1][2]...                │
                    │  Part2: [0][1][2]...                │
                    └─────────────────────────────────────┘
```

## Quick commands reference

```bash
# List all topics
kafka-topics --list --bootstrap-server localhost:9092

# Describe a topic
kafka-topics --describe --topic orders.created --bootstrap-server localhost:9092

# Produce messages (console producer)
kafka-console-producer --topic orders.created --bootstrap-server localhost:9092
# Consume messages (from beginning)
kafka-console-consumer --topic orders.created --from-beginning --bootstrap-server localhost:9092
# Delete a topic
kafka-topics --delete --topic orders.created --bootstrap-server localhost:9092
```


# Serialization Protocols

> Serialization is the translation layer between in-memory objects and bytes on the wire (or disk).

---

## What is Serialization?

**Serialization** converts an in-memory object into a transmittable/storable format (bytes, text). **Deserialization** is the reverse.

Every API call, every Kafka message, every database read involves serialization.

---

## The Three Dominant Formats

### 1. JSON (JavaScript Object Notation)

The lingua franca of web APIs. Human-readable, schema-optional.

```json
{
  "id": 42,
  "name": "Alex",
  "email": "alex@example.com",
  "roles": ["ADMIN", "USER"],
  "createdAt": "2026-01-15T10:30:00Z"
}
```

**Pros:** Human-readable, universally supported, easy to debug
**Cons:** Verbose, no type enforcement, no schema evolution guarantees
**Use when:** Public APIs, debugging, config files, low-throughput messaging

---

### 2. Protocol Buffers (Protobuf)

Binary format from Google. Schema-first, strongly typed, compact.

```protobuf
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  repeated string roles = 4;
  google.protobuf.Timestamp created_at = 5;
}
```

Binary encoding on the wire:
```
Field 1 (varint): 42
Field 2 (length-delimited): "Alex"
Field 3 (length-delimited): "alex@example.com"
```

**Pros:** 3–10x smaller than JSON, fast encode/decode, forward/backward compatible
**Cons:** Not human-readable, requires `.proto` file, tooling overhead
**Use when:** Internal gRPC services, high-throughput APIs, mobile apps

#### Schema Evolution Rules
- ✅ Add new optional fields (old clients ignore unknown fields)
- ✅ Remove fields (they become optional/ignored)
- ❌ Change field numbers (breaks binary compatibility)
- ❌ Change field types

---

### 3. Apache Avro

Binary format with the schema embedded (or stored in a Schema Registry). Canonical format for Kafka/event streaming.

```json
// Avro Schema
{
  "type": "record",
  "name": "User",
  "fields": [
    {"name": "id",    "type": "int"},
    {"name": "name",  "type": "string"},
    {"name": "email", "type": "string"}
  ]
}
```

**Key advantage:** Schema Registry integration — the schema is versioned and centrally managed. Producers write with schema V1; consumers can decode with V1 or V2.

**Pros:** Compact binary, schema evolution via Schema Registry, Kafka-native
**Cons:** Requires Schema Registry infrastructure, less tooling than JSON
**Use when:** Kafka message payloads, data pipelines, data lake ingestion

---

## Performance Comparison

| Format | Size (relative) | Parse speed | Human-readable | Schema required |
|--------|-----------------|-------------|----------------|-----------------|
| JSON | Baseline (100%) | Moderate | Yes | No |
| XML | ~130% | Slow | Yes | Optional |
| Protobuf | ~20–30% | Fast | No | Yes (.proto) |
| Avro | ~25–35% | Fast | No | Yes (Registry) |
| MessagePack | ~50–60% | Fast | No | No |

---

## Choosing a Format

```
Is this a public API or needs human debugging?
  └── Yes → JSON

Is this an internal microservice-to-microservice call?
  └── High frequency → Protobuf + gRPC
  └── Moderate → JSON + REST

Is this a Kafka event stream?
  └── Simple/dev → JSON
  └── Production → Avro + Schema Registry
```

---

## Related Notes

- [[02_gRPC_Deep_Dive]] — Protobuf in gRPC context
- [[01_What_is_Kafka]] — Avro in Kafka pipelines
- [[05_Schema_Registry_Avro]] — Schema Registry deep dive

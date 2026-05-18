# The Three Pillars of Observability

> You cannot debug what you cannot see. Observability turns a black box into a glass box.

---

## The Observability Triad

### Pillar 1: Metrics

**What:** Numeric measurements aggregated over time — counters, gauges, histograms.

```
http_requests_total{method="POST", status="200"} 15234
http_request_duration_seconds{p50=0.023, p95=0.145, p99=0.420}
jvm_memory_used_bytes{area="heap"} 512000000
```

**Tool:** **Prometheus** — pulls metrics via HTTP `/actuator/prometheus` endpoint.

**Spring Boot setup:**
```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: prometheus, health, info
  metrics:
    export:
      prometheus:
        enabled: true
```

**Visualize with:** **Grafana** — dashboards, threshold alerts, SLO/SLA tracking.

**Key metrics to track:**
- **RED** (Rate, Errors, Duration) — for request-serving services
- **USE** (Utilization, Saturation, Errors) — for resource-limited services

---

### Pillar 2: Logs

**What:** Timestamped, structured records of discrete events.

```json
{
  "timestamp": "2026-05-16T21:30:00.000Z",
  "level": "ERROR",
  "traceId": "abc123",
  "spanId": "def456",
  "service": "order-service",
  "message": "Payment declined",
  "userId": 42,
  "orderId": "ord-789",
  "error": "InsufficientFundsException"
}
```

**Tool:** **Grafana Loki** — log aggregation that works natively with Grafana.
Alternative: **ELK Stack** (Elasticsearch + Logstash + Kibana)

**Best practices:**
- Always use **structured JSON logs** (not plain text)
- Include `traceId` and `spanId` to correlate with traces
- Log at appropriate level: DEBUG in dev, INFO+WARNING+ERROR in prod
- Never log PII (passwords, credit card numbers, SSNs)

---

### Pillar 3: Distributed Traces

**What:** End-to-end journey of a single request across multiple services.

```
[Browser] ──── GET /checkout ────▶ [API Gateway] ──── [Order Service]
                                                            │
                                              ┌─────────────┼──────────────┐
                                              ▼             ▼              ▼
                                      [Payment Svc]  [Inventory Svc] [User Svc]
                                       23ms            8ms             5ms

Total: 47ms  |  Spans: 4  |  Errors: 0
```

Each request gets a **Trace ID** that propagates through all services via HTTP headers (`traceparent`).

**Tool:** **Jaeger** or **Zipkin** for trace visualization. **OpenTelemetry** for vendor-neutral instrumentation.

**Spring Boot setup:**
```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing-bridge-otel</artifactId>
</dependency>
```

---

## The Observability Stack (Production Recommendation)

```
Services (Spring Boot / FastAPI / Go)
       │ emit metrics, logs, traces
       ▼
 OpenTelemetry Collector
   ├──▶ Prometheus (metrics)
   ├──▶ Loki (logs)
   └──▶ Tempo/Jaeger (traces)
       │
       ▼
    Grafana (unified dashboard + alerting)
```

---

## Related Notes

- [[02_Authentication_AuthZ]] — Security layer alongside observability
- [[Spring_Profiles]] — Environment-specific observability config
- [[05_Observability]] — Kafka observability patterns

# Actuator & Metrics

> You can't fix what you can't see. **Spring Boot Actuator** exposes health, metrics, and diagnostics — wire them to **Prometheus/Grafana** and protect them like production credentials.

---

## Enable Actuator

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: when_authorized
  metrics:
    tags:
      application: ${spring.application.name}
```

| Endpoint | Purpose |
|----------|---------|
| `/actuator/health` | Liveness/readiness |
| `/actuator/info` | Build/git info |
| `/actuator/metrics` | Micrometer metrics |
| `/actuator/prometheus` | Prometheus scrape format |

---

## Secure Actuator (Production)

```java
@Bean
public SecurityFilterChain actuatorSecurity(HttpSecurity http) throws Exception {
    return http
        .securityMatcher("/actuator/**")
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/actuator/health").permitAll()
            .requestMatchers("/actuator/health/liveness", "/actuator/health/readiness").permitAll()
            .anyRequest().hasRole("ACTUATOR"))
        .httpBasic(Customizer.withDefaults())
        .build();
}
```

Or expose management on a **separate port**:

```yaml
management:
  server:
    port: 9090
```

---

## Custom Health Indicators

```java
@Component
public class PaymentGatewayHealthIndicator implements HealthIndicator {

    private final PaymentClient client;

    public PaymentGatewayHealthIndicator(PaymentClient client) {
        this.client = client;
    }

    @Override
    public Health health() {
        try {
            client.ping();
            return Health.up().withDetail("gateway", "reachable").build();
        } catch (Exception ex) {
            return Health.down(ex).withDetail("gateway", "unreachable").build();
        }
    }
}
```

Kubernetes probes:

```yaml
# application.yml
management:
  endpoint:
    health:
      probes:
        enabled: true
```

---

## Micrometer Custom Metrics

```java
@Service
public class OrderService {
    private final Counter ordersPlaced;
    private final Timer checkoutTimer;

    public OrderService(MeterRegistry registry) {
        this.ordersPlaced = Counter.builder("orders.placed")
            .description("Total orders placed")
            .register(registry);
        this.checkoutTimer = Timer.builder("orders.checkout.duration")
            .register(registry);
    }

    public Order placeOrder(PlaceOrderRequest request) {
        return checkoutTimer.record(() -> {
            Order order = doPlaceOrder(request);
            ordersPlaced.increment();
            return order;
        });
    }
}
```

Prometheus scrapes `/actuator/prometheus` → Grafana dashboards.

---

## Java 21+ Virtual Threads

Project Loom virtual threads massively improve throughput for I/O-bound workloads (many blocking calls).

```yaml
spring:
  threads:
    virtual:
      enabled: true
```

```java
// Spring Boot 3.2+ — Tomcat uses virtual threads for request handling
@SpringBootApplication
public class Application { }
```

### When virtual threads help

| Workload | Benefit |
|----------|---------|
| REST APIs waiting on DB/HTTP | High concurrency, low memory vs platform threads |
| Blocking JDBC | Better than platform thread pools at scale |
| CPU-bound work | **No benefit** — use regular threads or async carefully |

### Combat tip with JPA

Virtual threads don't fix **lazy loading** or **thread-bound** Hibernate session issues — transaction boundaries still matter. See [Transaction Management](/learning/spring-boot-spring-transaction-management).

---

## Structured Logging (Observability Bonus)

```yaml
logging:
  pattern:
    correlation: "[%X{traceId:-},%X{spanId:-}] "
```

Pair with OpenTelemetry or Micrometer Tracing for distributed traces.

---

## Combat Tips

### ✅ DO
- Expose only needed actuator endpoints
- Use readiness vs liveness probes correctly in K8s
- Tag metrics with `application`, `environment`, `region`

### ❌ DON'T
- Don't expose `/actuator/env` publicly (secrets risk)
- Don't enable `show-details: always` in prod without auth
- Don't enable virtual threads without load testing JDBC drivers

---

## Related Notes
- [Spring Security Architecture](/learning/spring-boot-spring-security-architecture) — Securing `/actuator`
- [Testing Slice Annotations](/learning/spring-boot-spring-testing-slices) — `@SpringBootTest` health checks
- [Autoconfiguration Lifecycle](/learning/spring-boot-spring-autoconfiguration) — Conditional actuator auto-config

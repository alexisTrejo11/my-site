# Clean Architecture

> The goal of Clean Architecture is to make the business rules independent of frameworks, databases, UI, and external agencies.
> — Robert C. Martin

---

## The Dependency Rule

The one non-negotiable rule: **source code dependencies must point inward** — toward the domain, away from infrastructure.

```
  ┌─────────────────────────────────────┐
  │          Frameworks & Drivers        │  ← Web, DB, UI, external APIs
  │  ┌───────────────────────────────┐  │
  │  │      Interface Adapters        │  │  ← Controllers, Gateways, Presenters
  │  │  ┌─────────────────────────┐  │  │
  │  │  │    Application Layer     │  │  │  ← Use Cases / Application Services
  │  │  │  ┌───────────────────┐  │  │  │
  │  │  │  │   Domain Layer     │  │  │  │  ← Entities, Domain Services, Events
  │  │  │  └───────────────────┘  │  │  │
  │  │  └─────────────────────────┘  │  │
  │  └───────────────────────────────┘  │
  └─────────────────────────────────────┘
     Outer layers depend on inner layers.
     Inner layers know NOTHING about outer layers.
```

---

## The Four Layers

### 1. Domain Layer (Entities)
Pure business objects. No framework annotations. No database IDs. Just logic.

```java
public class Order {
    private final OrderId id;
    private final List<OrderItem> items;
    private OrderStatus status;

    public void confirm() {
        if (items.isEmpty()) throw new EmptyOrderException();
        this.status = OrderStatus.CONFIRMED;
    }
}
```

### 2. Application Layer (Use Cases)
Orchestrates domain objects to fulfil a specific business operation. Depends on repository **interfaces**, not implementations.

```java
public class PlaceOrderUseCase {
    private final OrderRepository orderRepository;
    private final EventPublisher eventPublisher;

    public OrderId execute(PlaceOrderCommand command) {
        var order = Order.create(command.items());
        order.confirm();
        orderRepository.save(order);
        eventPublisher.publish(new OrderPlacedEvent(order.id()));
        return order.id();
    }
}
```

### 3. Interface Adapters (Controllers, Gateways)
Translates between the application and the outside world. HTTP controllers, CLI handlers, JPA repository implementations.

```java
@RestController
public class OrderController {
    @PostMapping("/orders")
    public ResponseEntity<OrderResponse> place(@RequestBody PlaceOrderRequest req) {
        var orderId = placeOrderUseCase.execute(req.toCommand());
        return ResponseEntity.created(URI.create("/orders/" + orderId)).build();
    }
}
```

### 4. Frameworks & Drivers
Spring, Hibernate, Kafka clients, HTTP clients. Pluggable. Replaceable.

---

## Package Structure Example

```
src/
├── domain/
│   ├── model/          Order.java, OrderItem.java
│   ├── events/         OrderPlacedEvent.java
│   └── ports/          OrderRepository.java (interface)
│
├── application/
│   └── usecases/       PlaceOrderUseCase.java
│
├── adapters/
│   ├── web/            OrderController.java, OrderRequest.java
│   └── persistence/    JpaOrderRepository.java, OrderJpaEntity.java
│
└── config/             Spring beans, Kafka config
```

---

## Key Principles

| Principle | Meaning |
|-----------|---------|
| **Dependency Inversion** | Depend on interfaces, not implementations |
| **Single Responsibility** | Each layer has one reason to change |
| **Testability** | Domain and Use Cases are unit-testable with no Spring context |
| **Framework Agnosticism** | Swapping Spring for Quarkus touches only `adapters/` and `config/` |

---

## Related Notes

- [Modular Monoliths](/learning/architecture-patterns-modular-monoliths) — Applying these boundaries at module level
- Dependency Injection — Spring Boot DI as the wiring mechanism
- [Design Patterns](/learning/java-design-patterns-java) — Repository, Factory, Strategy inside Clean Architecture

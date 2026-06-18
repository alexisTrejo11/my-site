# Modular Monoliths

> A modular monolith gives you 80% of the microservices benefits at 20% of the cost.

---

## The Core Idea

A **modular monolith** is a single deployable unit that is internally structured as a set of **strongly encapsulated modules** with explicit, enforced boundaries between them.

Each module:
- Has its own package/namespace
- Owns its domain models and business logic
- Exposes a **public API** (interfaces, not implementation classes)
- Never directly accesses another module's database tables or internal objects

---

## Structure Example (Java)

```
src/
├── users/
│   ├── api/          ← Public interface (UserService, UserDTO)
│   ├── domain/       ← User, UserRepository
│   ├── infra/        ← JPA adapter, UserJpaRepository
│   └── UsersModule.java
│
├── orders/
│   ├── api/          ← OrderService, OrderDTO
│   ├── domain/       ← Order, OrderRepository
│   ├── infra/        ← JPA adapter
│   └── OrdersModule.java
│
└── shared/           ← Cross-cutting: exceptions, events, base classes
```

**Critical rule:** `orders/` can only import from `users/api/` — never from `users/domain/` or `users/infra/`.

---

## Why It Matters

| Problem | Microservices solution | Modular Monolith solution |
|---------|------------------------|---------------------------|
| Team coupling | Separate deployment | Enforced module boundaries |
| Domain separation | Service per domain | Module per domain |
| Technology choice | Different runtimes | Different libraries per module |
| Data isolation | Separate databases | Separate schemas (or soft separation) |
| Network overhead | Added latency | No overhead (in-process calls) |

---

## Enforcement Strategies

- **ArchUnit** (Java) — Write tests that fail if module boundaries are violated
- **Package-by-feature** structure — Make the module the first level of the package hierarchy
- **Explicit event bus** — Modules communicate via in-memory domain events, not direct calls
- **Separate database schemas** per module, enforced at the connection level

---

## When to Extract to Microservices

Extract a module into a separate service only when:
1. It has a **scaling requirement** different from the rest
2. It needs a **different technology** (e.g., ML in Python, high-throughput in Go)
3. It has its own **independent deployment cadence**
4. Team boundaries have clearly stabilized around it (Conway's Law)

---

## Related Notes

- [Monoliths vs Microservices](/learning/architecture-patterns-monoliths-vs-microservices) — Full comparison
- [Clean Architecture](/learning/architecture-patterns-clean-architecture) — Layer organization within a module
- [Design Patterns](/learning/java-design-patterns-java) — Patterns applicable inside modules

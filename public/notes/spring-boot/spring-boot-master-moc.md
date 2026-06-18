# Spring Boot Master Note 🍃

> **Spring Boot** is opinionated automation on top of the **Spring Framework**. It gives you production-ready defaults, embedded servers, and a massive ecosystem — while keeping **Inversion of Control (IoC)** at the center of everything.

## What is Spring?

Spring is not just a web framework. It's an **application framework** built around:

1. **Inversion of Control (IoC)** — the container owns object creation and wiring
2. **Dependency Injection (DI)** — components receive collaborators instead of constructing them
3. **Modular architecture** — pick Spring Data, Security, Web, etc. as needed

Spring Boot adds **auto-configuration**, embedded Tomcat/Jetty, Actuator, and sane defaults so you ship APIs fast without XML hell.

```mermaid
flowchart TB
    subgraph Spring Boot
        App[@SpringBootApplication]
        Auto[Auto-Configuration]
        App --> Auto
    end
    Auto --> Web[Spring Web / MVC]
    Auto --> Data[Spring Data JPA]
    Auto --> Sec[Spring Security]
    Web --> API[REST Controllers]
    Data --> DB[(Database)]
    Sec --> API
```

---

## Spring vs Spring Boot

| | Spring Framework | Spring Boot |
|---|------------------|-------------|
| **Setup** | Manual `@Configuration`, XML (legacy) | Convention-over-configuration |
| **Server** | Deploy WAR to external container | Embedded server, `java -jar` |
| **Config** | You wire everything | Auto-config + overrides |
| **Best for** | Fine-grained control, libraries | Microservices, APIs, cloud-native apps |

---

## 🎓 Learning Paths

### 🟢 Track 1: "I'm new to Spring"
**Time: 2-3 days**

1. [Spring Core and IoC](/learning/spring-boot-spring-core-ioc) — ApplicationContext, beans, DI
2. [Autoconfiguration Lifecycle](/learning/spring-boot-spring-autoconfiguration) — What `@SpringBootApplication` really does
3. [Properties Profiles and YAML](/learning/spring-boot-spring-properties-profiles-yaml) — Config and environments
4. [REST Controllers and MVC](/learning/spring-boot-spring-rest-controllers-mvc) — Your first REST API

**Build**: CRUD API for a `Product` resource

---

### 🟡 Track 2: "I'm building a data-heavy service"
**Time: 3-4 days**

**Prerequisites**: Track 1

1. [JPA Hibernate and Data JDBC](/learning/spring-boot-spring-jpa-hibernate) — Entities, repositories, N+1
2. [Transaction Management](/learning/spring-boot-spring-transaction-management) — `@Transactional`, propagation, isolation
3. [Global Exception Handling](/learning/spring-boot-spring-global-exception-handling) — RFC 7807 error responses

**Build**: Order service with PostgreSQL and proper transactions

---

### 🔴 Track 3: "Production-ready microservice"
**Time: 2-3 days**

**Prerequisites**: Track 1 + 2

1. [Spring Security Architecture](/learning/spring-boot-spring-security-architecture) — JWT, filter chain, `@PreAuthorize`
2. [Testing Slice Annotations](/learning/spring-boot-spring-testing-slices) — Slice tests, MockMvc
3. [Actuator and Metrics](/learning/spring-boot-spring-actuator-metrics) — Actuator, Prometheus, virtual threads

**Build**: Secured API with metrics and integration tests in CI

---

## 📚 Content Index

### Core & Internals
- [Spring Core and IoC](/learning/spring-boot-spring-core-ioc) — ApplicationContext, bean lifecycle, scopes, DI styles
- [Autoconfiguration Lifecycle](/learning/spring-boot-spring-autoconfiguration) — `@EnableAutoConfiguration`, `@ConditionalOn*`

### Configuration & Environments
- [Properties Profiles and YAML](/learning/spring-boot-spring-properties-profiles-yaml) — Externalized config, `@ConfigurationProperties`, profiles

### Data & Persistence
- [JPA Hibernate and Data JDBC](/learning/spring-boot-spring-jpa-hibernate) — JPA, Hibernate, N+1, L2 cache
- [Transaction Management](/learning/spring-boot-spring-transaction-management) — Declarative transactions, propagation, isolation

### Web & API Layer
- [REST Controllers and MVC](/learning/spring-boot-spring-rest-controllers-mvc) — REST controllers, DTOs, content negotiation
- [Global Exception Handling](/learning/spring-boot-spring-global-exception-handling) — `@ControllerAdvice`, Problem Details

### Security & Identity
- [Spring Security Architecture](/learning/spring-boot-spring-security-architecture) — SecurityFilterChain, JWT, OAuth2 resource server

### Testing & Observability
- [Testing Slice Annotations](/learning/spring-boot-spring-testing-slices) — `@SpringBootTest`, `@WebMvcTest`, `@DataJpaTest`
- [Actuator and Metrics](/learning/spring-boot-spring-actuator-metrics) — Actuator, Micrometer, Java 21 virtual threads

---

## 🛠️ Quick Reference

```bash
# Create project (Spring Initializr CLI or start.spring.io)
spring init --dependencies=web,data-jpa,postgresql,security my-api

# Run
./mvnw spring-boot:run
./mvnw test

# Active profile
java -jar app.jar --spring.profiles.active=prod
```

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

---

## 🔗 External Resources

- [Spring Boot Reference](https://docs.spring.io/spring-boot/reference/)
- [Spring Framework Docs](https://docs.spring.io/spring-framework/reference/)
- [Baeldung Spring](https://www.baeldung.com/spring-tutorial)
- [Spring Guides](https://spring.io/guides)

---

## 📝 Notes

- Difficulty: 🟢 beginner · 🟡 intermediate · 🔴 advanced (in body content)
- Friendly engineering tone — combat tips, not textbook dumps
- All notes tagged `subcategory: spring-boot` for static site navigation

---

*Last updated: {{date}}*

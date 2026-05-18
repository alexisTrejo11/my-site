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

1. [[01_Spring_Core_and_IoC]] — ApplicationContext, beans, DI
2. [[02_Autoconfiguration_Lifecycle]] — What `@SpringBootApplication` really does
3. [[01_Properties_Profiles_and_YAML]] — Config and environments
4. [[01_REST_Controllers_and_MVC]] — Your first REST API

**Build**: CRUD API for a `Product` resource

---

### 🟡 Track 2: "I'm building a data-heavy service"
**Time: 3-4 days**

**Prerequisites**: Track 1

1. [[01_JPA_Hibernate_and_Data_JDBC]] — Entities, repositories, N+1
2. [[02_Transaction_Management]] — `@Transactional`, propagation, isolation
3. [[02_Global_Exception_Handling]] — RFC 7807 error responses

**Build**: Order service with PostgreSQL and proper transactions

---

### 🔴 Track 3: "Production-ready microservice"
**Time: 2-3 days**

**Prerequisites**: Track 1 + 2

1. [[01_Spring_Security_Architecture]] — JWT, filter chain, `@PreAuthorize`
2. [[01_Testing_Slice_Annotations]] — Slice tests, MockMvc
3. [[02_Actuator_and_Metrics]] — Actuator, Prometheus, virtual threads

**Build**: Secured API with metrics and integration tests in CI

---

## 📚 Content Index

### Core & Internals
- [[01_Spring_Core_and_IoC]] — ApplicationContext, bean lifecycle, scopes, DI styles
- [[02_Autoconfiguration_Lifecycle]] — `@EnableAutoConfiguration`, `@ConditionalOn*`

### Configuration & Environments
- [[01_Properties_Profiles_and_YAML]] — Externalized config, `@ConfigurationProperties`, profiles

### Data & Persistence
- [[01_JPA_Hibernate_and_Data_JDBC]] — JPA, Hibernate, N+1, L2 cache
- [[02_Transaction_Management]] — Declarative transactions, propagation, isolation

### Web & API Layer
- [[01_REST_Controllers_and_MVC]] — REST controllers, DTOs, content negotiation
- [[02_Global_Exception_Handling]] — `@ControllerAdvice`, Problem Details

### Security & Identity
- [[01_Spring_Security_Architecture]] — SecurityFilterChain, JWT, OAuth2 resource server

### Testing & Observability
- [[01_Testing_Slice_Annotations]] — `@SpringBootTest`, `@WebMvcTest`, `@DataJpaTest`
- [[02_Actuator_and_Metrics]] — Actuator, Micrometer, Java 21 virtual threads

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

# Properties, Profiles & YAML

> **Externalized configuration** lets you change behavior per environment without recompiling. Spring Boot loads config from files, env vars, and command-line args — with a clear precedence order.

---

## Configuration Sources (Precedence)

Later sources override earlier ones (simplified):

1. Default properties
2. `application.properties` / `application.yml`
3. Profile-specific files (`application-prod.yml`)
4. Environment variables
5. Command-line arguments

```bash
java -jar app.jar --server.port=9090 --spring.profiles.active=prod
```

Env var mapping: `SPRING_DATASOURCE_URL` → `spring.datasource.url`

---

## `application.properties`

```properties
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=app
spring.datasource.password=${DB_PASSWORD}
logging.level.root=INFO
logging.level.com.mycompany=DEBUG
```

---

## `application.yml`

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: app
    password: ${DB_PASSWORD}

logging:
  level:
    root: INFO
    org.springframework.web: DEBUG
```

YAML shines for nested structures; properties work everywhere and are easier for simple keys.

---

## Multi-Document YAML

Separate logical sections in one file with `---`:

```yaml
# Default document
spring:
  application:
    name: order-service

---
spring:
  config:
    activate:
      on-profile: dev
server:
  port: 8081

---
spring:
  config:
    activate:
      on-profile: prod
server:
  port: 8080
logging:
  level:
    root: WARN
```

---

## Spring Profiles

### Activating profiles

```bash
java -jar app.jar --spring.profiles.active=prod
```

```yaml
# application-prod.yml  (loaded when profile prod is active)
spring:
  datasource:
    url: jdbc:postgresql://prod-db.internal:5432/orders
```

```properties
# application-dev.properties
spring.jpa.show-sql=true
spring.h2.console.enabled=true
```

### Profile groups (Boot 2.4+)

```yaml
spring:
  profiles:
    group:
      prod:
        - prod-db
        - prod-kafka
```

```bash
--spring.profiles.active=prod
```

### `@Profile` on beans

```java
@Profile("dev")
@Configuration
public class DevDataLoader {
    @Bean
    CommandLineRunner seedUsers(UserRepository repo) {
        return args -> repo.save(new User("demo@local.dev"));
    }
}

@Profile("prod")
@Bean
public DataSource dataSource(DataSourceProperties props) {
    return props.initializeDataSourceBuilder().build();
}
```

---

## `@ConfigurationProperties` (Type-Safe Config)

```java
@ConfigurationProperties(prefix = "app")
@Validated
public record AppProperties(
    @NotBlank String name,
    @Min(1) int maxUsers,
    Duration sessionTimeout
) {}

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class Application { }
```

```yaml
app:
  name: Order API
  max-users: 500
  session-timeout: 30m
```

```java
@Service
public class SessionService {
    private final AppProperties props;

    public SessionService(AppProperties props) {
        this.props = props;
    }
}
```

**Senior tip:** Use `record` + validation (`@Validated`) instead of stringly-typed `@Value` everywhere.

### `@Value` for one-offs

```java
@Value("${app.name}")
private String appName;

@Value("${feature.enabled:false}")
private boolean featureEnabled;
```

---

## Secrets in Production

### ✅ DO
- Use env vars or secret managers (Vault, AWS Secrets Manager)
- Reference secrets: `password: ${DB_PASSWORD}`
- Keep `application-prod.yml` in repo **without** secrets — only structure

### ❌ DON'T
- Don't commit real passwords or API keys
- Don't use `application.properties` for 200 unrelated keys — group with `@ConfigurationProperties`

---

## Related Notes
- [[02_Autoconfiguration_Lifecycle]] — `@ConditionalOnProperty`
- [[01_JPA_Hibernate_and_Data_JDBC]] — Datasource config
- [[00_Spring_MOC]] — Roadmap

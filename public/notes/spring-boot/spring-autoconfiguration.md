# Auto-Configuration Lifecycle

> Spring Boot's magic is **conditional configuration** — beans appear only when the right classes and properties are on the classpath.

---

## `@SpringBootApplication` — Three in One

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

Equivalent to:

```java
@SpringBootConfiguration   // @Configuration + Boot extras
@EnableAutoConfiguration   // Import auto-config classes
@ComponentScan            // Scan current package + children
public class Application { }
```

```mermaid
flowchart TD
    A[SpringApplication.run] --> B[Create ApplicationContext]
    B --> C[Component Scan]
    B --> D[Load Auto-Config Classes]
    D --> E{@ConditionalOn* met?}
    E -->|Yes| F[Register Bean]
    E -->|No| G[Skip]
    C --> H[Your @Service / @Controller beans]
    F --> I[Ready Application]
    H --> I
```

---

## How Auto-Config Is Discovered

Boot loads candidate configurations from:

`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`

(Older projects used `spring.factories`.)

Example: adding `spring-boot-starter-data-jpa` triggers `DataSourceAutoConfiguration`, `HibernateJpaAutoConfiguration`, etc. — **if** a JDBC driver and JPA are present.

---

## Conditional Annotations (The Real Engine)

| Annotation | Registers bean when... |
|------------|------------------------|
| `@ConditionalOnClass` | Class is on classpath |
| `@ConditionalOnMissingClass` | Class is absent |
| `@ConditionalOnBean` | Another bean exists |
| `@ConditionalOnMissingBean` | Bean not already defined |
| `@ConditionalOnProperty` | Property matches value |
| `@ConditionalOnWebApplication` | Running as servlet/reactive web app |

### Example: feature flag bean

```java
@Configuration
@ConditionalOnProperty(name = "feature.new-checkout", havingValue = "true")
public class NewCheckoutConfiguration {

    @Bean
    public CheckoutService checkoutService() {
        return new NewCheckoutService();
    }
}
```

```yaml
# application.yml
feature:
  new-checkout: true
```

### Example: custom auto-config module

```java
@Configuration
@ConditionalOnClass(RedisTemplate.class)
@EnableConfigurationProperties(CacheProperties.class)
public class CustomCacheAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        return RedisCacheManager.builder(factory).build();
    }
}
```

---

## Overriding Auto-Configuration

Your beans win when you define them explicitly:

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    // Replaces Boot's default security auto-config behavior
    return http
        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
        .build();
}
```

Or exclude auto-config entirely:

```java
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class Application { }
```

```properties
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```

---

## Startup Lifecycle Hooks

```java
@Bean
public ApplicationRunner logActiveProfiles(Environment env) {
    return args -> {
        log.info("Active profiles: {}", Arrays.toString(env.getActiveProfiles()));
    };
}

@Component
public class StartupListener implements ApplicationListener<ApplicationReadyEvent> {
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        // Traffic-safe: app is ready to serve
    }
}
```

| Event | When |
|-------|------|
| `ApplicationStartingEvent` | Before context |
| `ApplicationReadyEvent` | Ready for requests |
| `ContextClosedEvent` | Shutdown |

---

## Combat Tips

### ✅ DO
- Use `spring-boot-autoconfigure` patterns when building internal starters
- Inspect **Conditions Evaluation Report** with `--debug` or Actuator
- Exclude unused auto-config in CLI tools that don't need a DB

### ❌ DON'T
- Don't `@ComponentScan` the entire `org.springframework` package
- Don't fight auto-config with duplicate beans — use `@ConditionalOnMissingBean` in libraries
- Don't assume auto-config order — use `@AutoConfigureAfter` in custom starters

---

## Debug Auto-Config

```bash
java -jar app.jar --debug
```

Look for `CONDITIONS EVALUATION REPORT` in logs — shows which `@ConditionalOn*` passed or failed.

---

## Related Notes
- [[01_Spring_Core_and_IoC]] — Bean fundamentals
- [[01_Properties_Profiles_and_YAML]] — `@ConditionalOnProperty`
- [[02_Actuator_and_Metrics]] — Startup health checks

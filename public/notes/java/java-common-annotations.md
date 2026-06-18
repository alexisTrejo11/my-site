# Common Annotations

> Built-in Java annotations

## java.lang

```java
@Override    // Override method
@Deprecated  // Deprecated element
@SuppressWarnings("unchecked")  // Suppress warnings
@SafeVarargs   // Varargs warning safe
@FunctionalInterface  // Functional interface
```

## java.lang.annotation

```java
@Retention(RetentionPolicy.RUNTIME)  // When to keep
@Target(ElementType.METHOD)       // Where to apply
@Inherited                      // Inherit to subclasses
@Documented                     // In Javadoc
```

## Common Spring

```java 
@Component     // Spring bean
@Service      // Service layer bean
@Repository   // Repository bean
@Controller  // MVC controller
@RestController  // REST controller
@Configuration  // Spring config
@Autowired    // DI
@Bean          // Bean definition
@RequestMapping  // HTTP mapping
@GetMapping    // GET
@PostMapping   // POST
```
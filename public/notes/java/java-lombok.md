# Lombok

> Code generation

## Dependencies

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <scope>provided</scope>
</dependency>
```

## Common Annotations

```java
@Data                   // @Getter + @Setter + @ToString + @EqualsAndHashCode
@Getter               // Generate getters
@Setter               // Generate setters
@NoArgsConstructor   // No-arg constructor
@AllArgsConstructor   // All-args constructor
@RequiredArgsConstructor  // Required fields constructor
@ToString             // toString()
@EqualsAndHashCode   // equals() and hashCode()
```

## @Builder

```java
@Builder
public class Person {
    private String name;
    private int age;
}

// Usage
Person person = Person.builder()
    .name("John")
    .age(30)
    .build();
```
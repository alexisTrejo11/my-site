# java.util.Optional

> Null-safe container

## Creating

```java
Optional<String> empty = Optional.empty();
Optional<String> of = Optional.of("value");
Optional<String> nullable = Optional.ofNullable(null);  // OK with null
```

## Operations

```java
optional.isPresent();
optional.isEmpty();
optional.get();                    // throws if empty
optional.orElse("default");
optional.orElseGet(() -> "computed");
optional.orElseThrow();

// Functional
optional.ifPresent(System.out::println);
optional.filter(predicate);
optional.map(function);
optional.flatMap(function);
```
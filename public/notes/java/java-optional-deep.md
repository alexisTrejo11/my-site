# Optional Deep Dive

> Null-safe container (Java 8+)

## Creating

```java
Optional<String> empty = Optional.empty();
Optional<String> present = Optional.of("value");
Optional<String> nullable = Optional.ofNullable(null);
```

## Common Usage

```java
optional.map(String::toUpperCase)
        .filter(s -> s.length() > 3)
        .orElse("default");

optional.orElseThrow(() -> new Exception("Empty!"));
```

## With Streams

```java
list.stream()
    .flatMap(Optional::stream)
    .filter(Optional::isPresent)
    .map(Optional::get);
```
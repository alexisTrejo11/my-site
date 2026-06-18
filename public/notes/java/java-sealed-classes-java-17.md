# Sealed Classes (Java 17+)

> Controlled inheritance

## Definition

```java
public abstract sealed class Shape
    permits Circle, Rectangle, Triangle {
    // Only these classes can extend
}

public final class Circle extends Shape { }
public final class Rectangle extends Shape { }
public final class Triangle extends Shape { }
```

## Sealed Interface

```java
public sealed interface Comparable<T>
    permits Integer, Long, Double {
    int compareTo(T other);
}
```

## Non-Sealed

```java
public non-sealed class Square extends Shape { }
```
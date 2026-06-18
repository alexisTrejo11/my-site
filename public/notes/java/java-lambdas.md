# Lambdas

> Anonymous functions (Java 8+)

## Syntax

```java
// Full
(a, b) -> { return a + b; }

// Short (single expression)
(a, b) -> a + b

// Single parameter
x -> x * 2

// No parameters
() -> 42
```

## Functional Interface

```java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

Calculator add = (a, b) -> a + b;
System.out.println(add.calculate(2, 3));  // 5
```
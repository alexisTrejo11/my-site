# Var (Java 10+)

> Local variable type inference

## Syntax

```java
var list = new ArrayList<String>();
var map = new HashMap<String, Integer>();
var stream = list.stream();
```

## Rules

- Only for local variables
- Cannot be used in fields or parameters
- Must initialize on same line

```java
var x = 10;        // Infers int
var s = "hello";   // Infers String
var d = 1.0;       // Infers double
```

## Use Cases

```java
// Long generic types
var result = list.stream()
    .filter(x -> x > 5)
    .map(Object::toString)
    .collect(Collectors.joining());
```
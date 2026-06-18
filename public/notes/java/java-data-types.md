# Data Types

> Java data types: primitives and references

## Primitive Types

| Type | Size | Default | Range |
|------|------|---------|-------|
| `byte` | 8-bit | 0 | -128 to 127 |
| `short` | 16-bit | 0 | -32,768 to 32,767 |
| `int` | 32-bit | 0 | -2³¹ to 2³¹-1 |
| `long` | 64-bit | 0L | -2⁶³ to 2⁶³-1 |
| `float` | 32-bit | 0.0f | ±3.4e38 |
| `double` | 64-bit | 0.0d | ±1.8e308 |
| `char` | 16-bit | '\u0000' | 0 to 65,535 |
| `boolean` | 1-bit | false | true/false |

## Reference Types

- Classes
- Interfaces
- Arrays
- Enums

## Type Conversion

```java
// Implicit (widening)
int i = 100;
long l = i;  // int to long

// Explicit (narrowing)
double d = 100.99;
int i = (int) d;  // 100
```
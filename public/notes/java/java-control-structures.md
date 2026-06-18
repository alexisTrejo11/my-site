# Control Structures

> Decision making and loops in Java

## if-else

```java
if (condition) {
    // code
} else if (condition2) {
    // code
} else {
    // code
}
```

## switch (Java 14+)

```java
String day = switch (dayNum) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    default -> "Unknown";
};
```

## Loops

```java
// for
for (int i = 0; i < 10; i++) { }

// enhanced for
for (int item : array) { }

// while
while (condition) { }

// do-while
do { } while (condition);
```
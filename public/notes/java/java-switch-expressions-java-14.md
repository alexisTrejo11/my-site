# Switch Expressions (Java 14+)

> Enhanced switch

## Traditional (still works)

```java
switch (day) {
    case 1:
    case 2:
        System.out.println("Weekday");
        break;
    default:
        System.out.println("Other");
}
```

## Switch Expression (Java 14+)

```java
String result = switch (day) {
    case 1, 2 -> "Weekday";
    case 3 -> "Wednesday";
    default -> "Other";
};
```

## With Yield

```java
String result = switch (day) {
    case 1 -> "Monday";
    case 2 -> {
        yield "Tuesday";
    }
    default -> "Other";
};
```
# java.util.Date and Time

> Legacy date handling (use java.time instead)

## Legacy Date (Deprecated)

```java
Date date = new Date();
date.getTime();  // milliseconds since epoch
date.after(otherDate);
date.before(otherDate);
date.equals(otherDate);
```

## java.time (Modern - Java 8+)

```java
// Current time
LocalDate.now();
LocalTime.now();
LocalDateTime.now();
ZonedDateTime.now();

// Creating
LocalDate.of(2024, 1, 15);
LocalTime.of(10, 30);
LocalDateTime.of(date, time);

// Parsing
LocalDate.parse("2024-01-15");
```
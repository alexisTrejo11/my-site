# DateTime API

> java.time (Java 8+)

## LocalDate/Time

```java
LocalDate date = LocalDate.now();
LocalTime time = LocalTime.of(10, 30);
LocalDateTime dt = LocalDateTime.of(date, time);
```

## ZonedDateTime

```java
ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("America/New_York"));
ZonedDateTime.parse("2024-01-15T10:30:00-05:00");
```

## Period and Duration

```java
Period period = Period.ofDays(5);
Duration duration = Duration.ofHours(2);

// Arithmetic
date.plus(period);
dt.plus(duration);
```

## Formatting

```java
date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
```
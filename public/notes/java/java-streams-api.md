# Streams API

> Functional operations on collections

## Creating Streams

```java
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream();
Stream<String> parallel = list.parallelStream();
Stream<String> of = Stream.of("a", "b", "c");
```

## Operations

```java
// Intermediate (return Stream)
stream.filter(s -> s.startsWith("a"))
     .map(String::toUpperCase)
     .distinct()
     .sorted()
     .limit(5)
     .skip(2);

// Terminal (return result)
List<String> result = stream.collect(Collectors.toList());
List<String> list = stream.toList();
String s = stream.reduce("", String::concat);
stream.forEach(System.out::println);
```

## Common Terminal Operations

```java
stream.count();
stream.min(comparator);
stream.max(comparator);
stream.findAny();
stream.findFirst();
stream.allMatch(predicate);
stream.anyMatch(predicate);
stream.noneMatch(predicate);
```
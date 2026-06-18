# Records (Java 14+)

> Immutable data carriers

## Record Definition

```java
public record Person(String name, int age) {
    // Automatically provides:
    // - Private final fields
    // - Constructor
    // - Getters: name(), age()
    // - equals(), hashCode()
    // - toString()
}
```

## Usage

```java
Person person = new Person("John", 30);
System.out.println(person.name());  // John - more clean getter that does not require get in her naming
System.out.println(person);         // Person[name=John, age=30]
```

## Compact Constructor

```java
public record Person(String name, int age) {
    public Person {
        if (age < 0) throw new IllegalArgumentException();
    }
}
```


> Records are a huge new data structure in Java, reduce verbosity and also arre thread safe 
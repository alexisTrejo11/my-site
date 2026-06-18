# Records (Java 14+)

> Immutable data carriers

## Definition

```java
public record Person(String name, int age) {
    // Auto-generated:
    // - Private final fields
    // - Constructor
    // - Getters: name(), age()
    // - equals(), hashCode()
    // - toString()
}
```

## Usage

```java
Person p = new Person("John", 30);
p.name();    // John
p.age();    // 30
```

## Customization

```java
public record Person(String name, int age) {
    public Person {
        if (age < 0) throw new IllegalArgumentException();
    }
}
```
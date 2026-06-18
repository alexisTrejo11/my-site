# Generics

> Type parameters and generic types

## Generic Class

```java
public class Box<T> {
    private T content;
    
    public T get() { return content; }
    public void set(T content) { this.content = content; }
}

Box<String> box = new Box<>();
box.set("Hello");
String s = box.get();
```

## Generic Methods

```java
public <T> void print(T item) {
    System.out.println(item);
}
```

## Bounded Types

```java
public class Calculator<T extends Number> {
    public double sum(T a, T b) {
        return a.doubleValue() + b.doubleValue();
    }
}
```
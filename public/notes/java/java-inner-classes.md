# Inner Classes

> Nested and inner classes in Java

## Member Inner Class

```java
class Outer {
    class Inner {
        void display() {
            System.out.println("Inner class");
        }
    }
}

// Usage
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
```

## Static Nested Class

```java
class Outer {
    static class StaticInner {
        // Can access static members only
    }
}
```

## Anonymous Class

```java
interface Greeting {
    void sayHello();
}

Greeting greeting = new Greeting() {
    @Override
    public void sayHello() {
        System.out.println("Hello!");
    }
};
```
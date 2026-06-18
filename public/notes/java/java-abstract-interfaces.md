# Abstract Classes and Interfaces

> Abstract types and contracts

## Abstract Class

```java
abstract class Animal {
    abstract void sound();  // No implementation
    
    void sleep() {         // With implementation
        System.out.println("Sleeping...");
    }
}
```

## Interface

```java
interface Drawable {
    void draw();
    
    default void info() {
        System.out.println("Drawable");
    }
    
    static void staticMethod() { }
}
```

## Implementation

```java
class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
}
```
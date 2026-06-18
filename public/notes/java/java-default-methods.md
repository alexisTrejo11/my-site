# Default Methods

> Methods in interfaces (Java 8+)

## Syntax

```java
interface Drawable {
    void draw();
    
    default void info() {
        System.out.println("Drawable");
    }
}
```

## Use Cases

```java
interface Resizable {
    void resize(int width, int height);
    
    default void scale(double factor) {
        // Default implementation
    }
}
```

## Static Methods in Interface

```java
interface Utility {
    static String helper() {
        return "Helper";
    }
}
```
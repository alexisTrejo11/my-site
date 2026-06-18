# Try with Resources

> Auto-closeable resources

## Syntax (Java 7+)

```java
try (FileReader reader = new FileReader("file.txt")) {
    // Use reader - auto closed
} // No need for finally
```

## Multiple Resources

```java
try (
    FileInputStream in = new FileInputStream("a.txt");
    FileOutputStream out = new FileOutputStream("b.txt")
) {
    // Use streams
}
```

## AutoCloseable

```java
public class MyResource implements AutoCloseable {
    @Override
    public void close() {
        // Cleanup
    }
}
```
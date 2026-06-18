# Checked vs Unchecked Exceptions

> Exception classification

## Unchecked (RuntimeException)

```java
// Not required to declare or catch
int[] arr = new int[5];
arr[10] = 1;  // ArrayIndexOutOfBoundsException
```

## Checked (Other Exception)

```java
// Must declare or catch
FileReader reader = new FileReader("file.txt");
// Must handle IOException
```

## Checked Exception Rules

- Must be declared in `throws` clause
- Or must be caught with try-catch

```java
public void read() throws IOException {
    // Method that throws checked exception
}
```
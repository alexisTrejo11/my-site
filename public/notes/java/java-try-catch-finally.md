# Try-Catch-Finally

> Exception handling

## Basic

```java
try {
    int[] arr = new int[5];
    arr[10] = 1;
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Exception: " + e.getMessage());
}
```

## Multiple Catch

```java
try {
    // Code
} catch (IOException e) {
    // Handle IO
} catch (SQLException e) {
    // Handle DB
} catch (Exception e) {
    // Handle any other
}
```

## Finally

```java
try {
    FileReader reader = new FileReader("file.txt");
    // Use reader
} catch (IOException e) {
    // Handle
} finally {
    // Always executes - for cleanup
}
```
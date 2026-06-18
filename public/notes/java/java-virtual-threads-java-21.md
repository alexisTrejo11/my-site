# Virtual Threads (Java 21+)

> Lightweight threads

## Creating

```java
Thread.startVirtualThread(() -> task());

// Or with executor
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
executor.submit(() -> task());
```

## Benefits

- Much lower memory footprint
- Millions of virtual threads
- No thread pool needed

## Usage

```java
for (int i = 0; i < 10_000; i++) {
    final int id = i;
    executor.submit(() -> process(id));
}
```
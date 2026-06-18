# Executor Framework

> Thread pool management

## ExecutorService

```java
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> task());
executor.shutdown();
executor.shutdownNow();
```

## Factory Methods

```java
Executors.newFixedThreadPool(4);
Executors.newCachedThreadPool();
Executors.newSingleThreadExecutor();
Executors.newScheduledThreadPool(4);
```

## Callable and Future

```java
Callable<String> task = () -> "result";
Future<String> future = executor.submit(task);
String result = future.get();        // Blocking
future.get(timeout, TimeUnit.SECONDS);
future.cancel(mayInterrupt);
future.isCancelled();
```
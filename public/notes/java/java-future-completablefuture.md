# Future and CompletableFuture

> Asynchronous results

## Future

```java
Future<Integer> future = executor.submit(() -> 42);
Integer result = future.get();
```

## CompletableFuture (Java 8+)

```java
CompletableFuture<String> cf = new CompletableFuture<>();
cf.complete("result");
cf.completeExceptionally(new Exception());
```

## Chaining

```java
CompletableFuture.supplyAsync(() -> "Hello")
    .thenApply(s -> s.toUpperCase())
    .thenAccept(System.out::println)
    .join();
```

## Combining

```java
CompletableFuture.allOf(cf1, cf2, cf3).join();
CompletableFuture.anyOf(cf1, cf2, cf3).join();
```
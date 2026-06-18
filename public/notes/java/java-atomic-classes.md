# Atomic Classes

> Thread-safe counters

## AtomicInteger

```java
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();
count.decrementAndGet();
count.getAndIncrement();
count.addAndGet(5);
count.getAndSet(10);
count.compareAndSet(expected, newValue);
```

## AtomicLong, AtomicBoolean

```java
AtomicBoolean flag = new AtomicBoolean(true);
flag.getAndSet(false);
flag.compareAndSet(false, true);
```

## AtomicReference

```java
AtomicReference<String> ref = new AtomicReference<>("initial");
ref.set("new");
ref.get();
ref.compareAndSet("initial", "updated");
```
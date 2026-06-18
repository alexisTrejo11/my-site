# Locks

> Explicit locking

## ReentrantLock

```java
Lock lock = new ReentrantLock();
lock.lock();
try {
    // Critical section
} finally {
    lock.unlock();
}
```

## Try Lock

```java
if (lock.tryLock()) {
    try {
        // Acquired
    } finally {
        lock.unlock();
    }
} else {
    // Not acquired
}
```

## ReadWriteLock

```java
ReadWriteLock rwLock = new ReentrantReadWriteLock();
Lock readLock = rwLock.readLock();
Lock writeLock = rwLock.writeLock();
```
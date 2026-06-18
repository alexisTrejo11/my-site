# Synchronization

> Thread synchronization

## Synchronized Method

```java
public synchronized void method() {
    // Only one thread at a time
}
```

## Synchronized Block

```java
public void method() {
    synchronized(this) {
        // Critical section
    }
}
```

## Shared Resource

```java
class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int get() {
        return count;
    }
}
```
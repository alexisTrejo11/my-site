# Queue and Deque

> Queue and Double-Ended Queue

## Queue (FIFO)

```java
Queue<String> queue = new LinkedList<>();
queue.add("A");        // Throws on full
queue.offer("B");      // Returns false on full
queue.remove();        // Throws if empty
queue.poll();          // Returns null if empty
queue.element();        // Throws if empty
queue.peek();          // Returns null if empty
```

## Deque (Double-Ended)

```java
Deque<String> deque = new ArrayDeque<>();
deque.addFirst("A");
deque.addLast("B");
deque.removeFirst();
deque.removeLast();
```
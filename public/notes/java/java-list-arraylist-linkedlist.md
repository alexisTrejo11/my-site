# List Implementations

> ArrayList and LinkedList

## ArrayList

```java
List<String> list = new ArrayList<>();
list.add("Apple");
list.add(0, "Banana");
list.get(0);
list.remove(0);
list.set(0, "Mango");
list.size();
```

## LinkedList

```java
List<String> linked = new LinkedList<>();
linked.addFirst("First");
linked.addLast("Last");
linked.removeFirst();
linked.removeLast();
```

## ArrayList vs LinkedList

| Operation | ArrayList | LinkedList |
|-----------|-----------|-----------|
| get(index) | O(1) | O(n) |
| add | O(1) amortized | O(1) |
| remove | O(n) | O(1) |
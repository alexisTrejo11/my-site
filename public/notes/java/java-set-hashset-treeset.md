# Set Implementations

> HashSet and TreeSet

## HashSet

```java
Set<String> set = new HashSet<>();
set.add("Apple");
set.add("Banana");
set.contains("Apple");
set.remove("Apple");
set.size();
```

## TreeSet

```java
Set<String> treeSet = new TreeSet<>();
treeSet.add("Apple");
treeSet.lower("Mango");    // Element < "Mango"
treeSet.higher("Banana");   // Element > "Banana"
treeSet.first();
treeSet.last();
```

## HashSet vs TreeSet

| Feature | HashSet | TreeSet |
|---------|--------|--------|
| Order | Unordered | Sorted |
| Implementation | HashMap | TreeMap |
| add/contains | O(1) | O(log n) |
# Map Implementations

> HashMap and TreeMap

## HashMap

```java
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 1);
map.get("Apple");
map.containsKey("Apple");
map.containsValue(1);
map.remove("Apple");
map.keySet();
map.values();
map.entrySet();
```

## TreeMap

```java
Map<String, Integer> treeMap = new TreeMap<>();
treeMap.put("B", 2);
treeMap.firstKey();
treeMap.lastKey();
treeMap.lowerKey("C");
treeMap.higherKey("A");
```

## HashMap vs TreeMap

| Feature | HashMap | TreeMap |
|---------|--------|--------|
| Order | Unordered | Sorted by keys |
| get/put | O(1) avg | O(log n) |
| null | Allowed (one) | Not allowed |
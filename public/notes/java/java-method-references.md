# Method References

> Compact lambda syntax (Java 8+)

## Types

```java
// Static: ClassName::staticMethod
Function<String, Integer> parser = Integer::parseInt;

// Instance on object: object::instanceMethod
String str = "hello";
Supplier<Integer> len = str::length;

// Instance on type: ClassName::instanceMethod
Function<String, String> upper = String::toUpperCase;

// Constructor: ClassName::new
Supplier<ArrayList<String>> listFactory = ArrayList::new;
```
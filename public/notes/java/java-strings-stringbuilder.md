# Strings and StringBuilder

> String manipulation in Java

## String (Immutable)

```java
String s = "Hello";
String s = new String("Hello");

// Common methods
s.length();
s.charAt(0);
s.substring(1, 3);
s.toLowerCase();
s.toUpperCase();
s.trim();
s.split(",");
s.equals("hello");
s.compareTo("abc");
```

## StringBuilder (Mutable, Not Thread-Safe)

```java
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" World");
sb.insert(5, "Java ");
sb.delete(0, 5);
sb.reverse();
String result = sb.toString();
```

## StringBuffer (Mutable, Thread-Safe)

```java
StringBuffer sb = new StringBuffer();
```
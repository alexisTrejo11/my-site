# java.lang.String

> The String class

## Common Methods

```java
String s = "Hello";

// Length and char
s.length();
s.charAt(0);

// Comparison
s.equals("hello");
s.equalsIgnoreCase("HELLO");
s.compareTo("abc");
s.compareToIgnoreCase("ABC");

// Search
s.indexOf("l");
s.lastIndexOf("l");
s.contains("ell");
s.startsWith("Hel");
s.endsWith("lo");

// Extraction
s.substring(1, 3);  // "el"
s.replace("l", "r");
s.replaceAll("l", "r");
s.trim();

// Split
String[] parts = "a,b,c".split(",");
```
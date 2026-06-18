# Regular Expressions

> Pattern matching with java.util.regex

## Pattern and Matcher

```java
import java.util.regex.*;

Pattern pattern = Pattern.compile("\\d+");
Matcher matcher = pattern.matcher("123");

// Match
matcher.matches();      // Full match
matcher.find();       // Find next
matcher.find(start);  // Find from index

// Groups
matcher.group();       // Entire match
matcher.group(1);     // First group
```

## Common Patterns

```java
\\d     // Digit [0-9]
\\D     // Non-digit
\\w     // Word [a-zA-Z0-9_]
\\W     // Non-word
\\s     // Whitespace
\\S     // Non-whitespace
.      // Any character
^       // Start
$       // End
```

## String Methods

```java
"abc".matches("\\w+");
"hello".replaceAll("\\w", "X");
"a,b,c".split(",");
```
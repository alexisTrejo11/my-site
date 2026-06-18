# Text Blocks (Java 13+)

> Multiline strings

## Syntax (Java 13+)

```java
String sql = """
    SELECT id, name
    FROM users
    WHERE active = true
    """;
```

## Escapes

```java
String html = """
    <html>
        <body>Hello</body>
    </html>
    """;
```

## Indentation Control

```java
String text = """
    Line 1
    Line 2
    """.stripIndent();
```
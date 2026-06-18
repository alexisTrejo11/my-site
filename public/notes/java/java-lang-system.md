# java.lang.System

> System class utilities

## Standard Streams

```java
System.in;    // InputStream
System.out;   // PrintStream
System.err;   // PrintStream
```

## Common Methods

```java
System.currentTimeMillis();
System.nanoTime();
System.getProperty("user.home");
System.getenv("PATH");
System.arraycopy(src, 0, dst, 0, length);

// Exit
System.exit(0);  // 0 = normal, non-zero = error
```

## GC

```java
System.gc();  // Suggest GC (not guaranteed)
```
# java.nio

> New I/O API

## Paths

```java
Path path = Paths.get("file.txt");
Path absolute = Paths.get("/home/user/file.txt");
path.getFileName();
path.toAbsolutePath();
Files.exists(path);
Files.isRegularFile(path);
```

## Reading

```java
String content = Files.readString(path);
List<String> lines = Files.readAllLines(path);
byte[] bytes = Files.readAllBytes(path);
```

## Writing

```java
Files.writeString(path, "content");
Files.write(path, lines);
Files.write(path, bytes);
```

## Buffers

```java
ByteBuffer buffer = ByteBuffer.allocate(1024);
buffer.put((byte) 1);
buffer.flip();
byte b = buffer.get();
```
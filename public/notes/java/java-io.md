# java.io

> Classic input/output

## File Operations

```java
// Reading
FileReader reader = new FileReader("file.txt");
BufferedReader br = new BufferedReader(reader);
String line = br.readLine();
br.close();

// Writing
FileWriter writer = new FileWriter("file.txt");
BufferedWriter bw = new BufferedWriter(writer);
bw.write("text");
bw.newLine();
bw.close();
```

## Byte Streams

```java
// Reading
FileInputStream fis = new FileInputStream("file.bin");
int b = fis.read();
byte[] bytes = fis.readAllBytes();
fis.close();

// Writing
FileOutputStream fos = new FileOutputStream("file.bin");
fos.write(bytes);
fos.close();
```
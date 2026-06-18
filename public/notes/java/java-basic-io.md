# Basic Input/Output

> Console I/O in Java

## Output

```java
System.out.print("No newline");
System.out.println("With newline");
System.out.printf("Formatted: %s", value);
```

## Input (Scanner)

```java
import java.util.Scanner;

Scanner sc = new Scanner(System.in);
String name = sc.nextLine();
int num = sc.nextInt();
double d = sc.nextDouble();
sc.close();
```

## Buffered Input

```java
BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
String line = reader.readLine();
```
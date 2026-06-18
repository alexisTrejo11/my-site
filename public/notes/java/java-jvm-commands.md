# JVM Commands

> Command-line tools

## java command

```bash
java MyApp                    # Run
java -cp lib/* MyApp        # Classpath
java -jar app.jar          # JAR file
java -Xms256m -Xmx512m  # Heap size
java -XX:+UseG1GC       # GC
```

## javac command

```bash
javac MyApp.java          # Compile
javac -d out MyApp.java # Output dir
javac -cp lib/* MyApp.java
```

## jar command

```bash
jar cf my.jar -C out .  # Create
jar tf my.jar          # Table
jar xf my.jar         # Extract
```

## jcmd command

```bash
jcmd <pid> GC.heap_dump   # Heap dump
jcmd <pid> Thread.print  # Thread dump
jcmd <pid> GC.heap_info  # Heap info
```

## jstat command

```bash
jstat -gc <pid> 1000    # GC stats
```

## jmap command

```bash
jmap -heap <pid>        # Heap info
jmap -dump:format=b,file=heap.bin <pid>
```
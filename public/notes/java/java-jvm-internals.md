# 🔧 Java JVM Internals - GC, Bytecode and More

## 🧠 JVM Architecture (Java Virtual Machine)

```
┌─────────────────────────────────────────────────┐
│           YOUR JAVA CODE (.java files)          │
└─────────────────────┬───────────────────────────┘
                      │ javac (compiler) 
┌─────────────────────────────────────────────────┐
│                 BYTECODE (.class)               │
│           Instructions for the JVM              │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────────────────────────────────┐
│                      JVM                        │
│ ┌─────────────────────────────────────────────┐ │
│ │ ClassLoader (loads .class files)            │ │
│ └─────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────┐ │
│ │              MEMORY AREAS                   │ │
│ │  ┌────────┐ ┌────────┐  ┌────────────┐      │ │
│ │  │ Heap   │ │ Stack  │  │ Metaspace  │      │ │
│ │  │(objects│ │(threads│  │ (classes)  │      │ │
│ │  └────────┘ └────────┘  └────────────┘      │ │
│ └─────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────┐ │
│ │            Execution Engine                 │ │
│ │  ┌────────┐ ┌───────────┐ ┌───────────┐     │ │
│ │  │  JIT   │ │Interpreter│ │ GarbageCol│     │ │
│ │  └────────┘ └───────────┘ └───────────┘     │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## 🗑️ Garbage Collector (GC) in Detail

### What is it?
The GC is an **automatic memory collector** that frees memory occupied by objects that are no longer used.

### Common Myth:
> "In Java there are no memory leaks"

**Reality:** Yes, there are! GC only cleans up unreachable objects. If you have forgotten references (e.g., listeners in a list), there's a leak.

### GC Algorithms (Evolution)

| GC               | Java Version | Ideal Use                    | Pauses      |
| ---------------- | ------------ | ---------------------------- | ----------- |
| **Serial**       | 1.3+         | Small Apps, single-core      | Large       |
| **Parallel**     | 1.4+         | Batch processing, throughput | Large       |
| **CMS**          | 1.4-14       | Fast Response (deprecated)   | Short       |
| **G1 (Default)** | 7+           | Balanced, memory >4GB        | Predictable |
| **ZGC**          | 11+          | Low latency (<10ms)          | Very Short  |
| **Shenandoah**   | 12+          | Low latency                  | Very Short  |

### Visualization of GC:

```java
public class ShowGC {
    public static void main(String[] args) {
        for (int i = 0; i < 100000; i++) {
            new Object(); // Creating garbage objects
            if (i % 10000 == 0) {
                System.gc(); // Suggestion (no guarantee)
                System.out.println("GC suggested on iteration " + i);
            }
        }
    }
}
```

**View GC in real time:** `java -XX:+PrintGCDetails ShowGC`

### Generations in the Heap (Generational GC)

```
HEAP MEMORY (where objects live)
┌────────────────────────────────────────────────────┐
│  YOUNG GENERATION (new objects)                    │
│  ┌──────────┬───────────┬──────────────────────┐   │
│  │ Eden     │ Survivor0 │ Survivor1            │   │
│  │ (80%)    │ (10%)     │ (10%)                │   │
│  └──────────┴───────────┴──────────────────────┘   │ 
│                      │                             │
│                      │ Minor GC (fast)             │
│                      ▼                             │
│  OLD GENERATION (surviving objects)                │
│  ┌────────────────────────────────────────────┐    │
│  │   Objects that survived many collections   │    │
│  └────────────────────────────────────────────┘    │
│                      │                             │
│                      │ Major GC (slow)             │
│                      ▼                             │
│              (Memory released)                     │
└────────────────────────────────────────────────────┘
```

### ❌ Anti-pattern: Creating objects in loops

```java
// BAD: Creates millions of objects
String result = "";
for (int i = 0; i < 100000; i++) {
    result += i;  // Creates new String each time!
}

// GOOD: Use StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100000; i++) {
    sb.append(i);
}
String result = sb.toString();
```

## 📦 What is a .class file?

A `.class` file contains **bytecode** - instructions for the JVM, not your CPU.

### View human-readable bytecode:

```bash
javac MyClass.java
javap -c MyClass   # Shows the bytecode
```

**Example bytecode:**

```java
// Java code:
int sum = a + b;
// Bytecode (simplified):
iload_1    // load 'a'
iload_2    // load 'b'
iadd       // add
istore_3   // store in 'sum'
```

## 🗜️ What is a JAR?

**JAR = Java Archive** - A ZIP of `.class` files and resources.

### Create and execute JAR:

```bash
# Compile
javac -d . MyApp.java

# Create JAR
jar cvfe myApp.jar MyApp *.class

# View content
jar tf myApp.jar

# Execute JAR
java -jar myApp.jar
```

### Typical JAR structure:

```
myApp.jar
├── META-INF/
│   └── MANIFEST.MF    # Metadata (main class)
├── com/
│   └── myapp/
│       ├── Main.class
│       └── Util.class
└── resources/
    └── config.properties
```

## 🔄 JIT Compiler (Just-In-Time)

The JVM starts interpreting bytecode (slow), but detects "hot code" (executed many times) and compiles it to **native CPU code**.

```
First Executions          After Many Executions
Bytecode ──interprets──>  Slow      Bytecode ──JIT──> Native Code (fast)
```

## 🎮 Useful JVM Commands

```bash
# View Java processes
jps
# View GC statistics
jstat -gc <pid> 1000
# Take heap dump for analysis
jmap -dump:live,format=b,file=heap.bin <pid>
# Monitor in real time
jconsole
# View JVM arguments
java -XX:+PrintCommandLineFlags -version
```

## 🚀 JVM Performance Flags

```bash
# For server (more optimizations)
java -server
# Heap size
java -Xms2G -Xmx4G MyApp   # min 2GB, max 4GB
# Use G1 GC (recommended for most)
java -XX:+UseG1GC
# GC log for debugging
java -Xlog:gc*:gc.log MyApp
# Low latency (Java 17+)
java -XX:+UseZGC -XX:+ZGenerational
```

## 🐛 Memory Debugging

### Detect memory leak:

```java
// Classic leak example
public class Service {
    private static List<Listener> listeners = new ArrayList<>();
    
    public void addListener(Listener l) {
        listeners.add(l);  // Never removed!
    }
}
// Solution: Use WeakHashMap or remove manually
```

### Heap Dump and analysis:

```bash
# Generate heap dump on OutOfMemoryError
java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp MyApp
# Analyze with tools:
# - Eclipse MAT (Memory Analyzer)
# - VisualVM (free, comes with JDK)
```

## 📚 Advanced Resources

- [Official JVM Documentation](https://docs.oracle.com/en/java/javase/21/vm/)
- [Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/21/gctuning/)
- Book: "Java Performance" by Scott Oaks

## 🔗 Next Steps

- [Java Practical Examples](/learning/java-practical-examples) - High Detailed Examples
- [Java Best Practices](/learning/java-best-practices) - Best Practices
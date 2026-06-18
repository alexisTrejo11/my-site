---
tags: [java, language, jvm, overview]
created: 26-April-2026

---

#  ☕ Java - Complete Overview

##   🎯 What is Java?

** Java is a general-purpose, object-oriented programming language that operates under the "Write Once, Run Anywhere" (WORA) principle. **


Imagine you write a cooking recipe (your code) and that recipe can be run on any computer in the world (Windows, Linux, Mac) without modification. That's Java.

## 📊 Key Data

| Property            | Key                                                                |
| ------------------- | ------------------------------------------------------------------ |
| ** Creator **       | James Gosling (Sun Microsystems, 1995)                             |
| ** Current Owner ** | Oracle Corporation                                                 |
| Last LTS            | Java 25 (september 2025)                                           |
| Incoming LTS        | Java 26 (may 2026)                                                 |
| Typing              | Strong and Static                                                  |
| ** Paradigms **     | OOP, Imperative, Declarative (Streams),  Functional (since Java 8) |
| ** Compilation **   | Hybrid (Compilator -> Bytecode -> JIT)                             |
| **Memory **         | Automatic (Garbage Collector)                                      |
| ** Popularity **     | High, Top 4/5 TIOBE                                                |

## 🎭 Paradigms Supported


### ** 1. OOP (Object-Oriented Programming)  (Main) **
```java
// All is inside a class
class Dish {
	private String name;
	
	public Dish(String name) {
		this.name = name;
	}
	
	public void prepare() {
		System.out.println("Preparing: " + name + "!");
	}
}
```


###  **  2. Functional (Since Java 8)  ** 

```java
	List<String> employees = Arrays.asList("Ana", "Luis", "Carlos");
	employees.stream()
		.filter(n -> n.startsWith("A"))
		.map(String::toUpperCase)
		.foreach(System.out::println)
```


### ** 3. Imperative (Always has been) ** 
```java
for (int i = 0; i < 10; i++) {
	System.out.println(i);	
}
```


### ** 4. Concurrence (Native Multi threading) **
```java
Thread hilo = new Thread(() -> {
    System.out.println("Executing in parrallel");
});
hilo.start();
```


## 💪 Strengths and Weaknesses

### ✅ **Strengths**
- Maturity: 28+ years of evolution
- Huge Ecosystem: Tons of Libraries
- Employability: Banks, Large Corporation, Android (Legacy)
- Perfomance: Faster than other High Level Languages (Python, JS, Ruby, PHP)
- Security: Sandbox, automatic memory management

### ❌ **Weakness**

- Verbouse: Requires more boilerplate than other modern languages (improves with modern LTS)
- Memory Consume: More consume than fast languages such as Go,Rust, C++
- Boot time: JVM starts slow and requires lot of resources
- Learning Curve: Concepts like JVM, GC
- Environment: Outside corporation environments is not really getting used, for mobile all Java devs are migrating to Kotlin, for games community prefer C# or C++,  low options for modern front end apps  

## 🏢 ¿Where does Java is used?

| Sector             | Examples                     |
| ------------------ | ---------------------------- |
| Banks              | Goldman Sachs, Credit Suisse |
| Big Data           | ELK, Kakfa, Spark            |
| Android            | Legacy (Now Kotlin)          |
| Enterprise Backend | Amazon, Netflix, Spotify     |
| Tools              | IntelliJ, Eclipse, Jenkins   |

## 🔄 Basic Workflow

```text
📝 Souce code               🧬 Bytecode                    🚀 Execution
  (.java)         javac       (.class)          java        (JVM)
┌─────────────┐   ────────> ┌──────────────┐    ───────>   ┌─────────┐
│ Recipe.java │             │ Recipe.class │               │  Output │
└─────────────┘             └──────────────┘               └─────────┘
```

## 📝 New Hello World (since Java 25)

```java
// HelloWorld.java
void main() {
	IO.println("Hello World!")
}
```

## Compile and execute

```bash
javac HelloWorld.java  # Generate HelloWorld.class
java HelloWorld        # Execute .class
```

## 🆚 Java vs Other Languages

| Característica     | Java           | Python      | Go             | Rust               |
| ------------------ | -------------- | ----------- | -------------- | ------------------ |
| **Speed**          | ⚡⚡⚡            | ⚡           | ⚡⚡⚡⚡           | ⚡⚡⚡⚡⚡              |
| **Memory**         | Automatic (GC) | Automatic   | Automatic (GC) | Manual (ownership) |
| **Learning Curve** | Medium         | Low          | Medium        | High               |
| **Multiplatform**  | JVM            | Interpreted | Native         | Native             |
| **Boot Time**      | Slow           | Fast        | Fast           | Fast               |
| **Typing**         | Static         | Dynamic     | Static         | Static             |
|                    |                |             |                |                    |

## Fundamental Concepts (learning path)

### Level 1 - Base

- Basic Syntax (variables, loops, conditionals)
- OOP: classes, objects, inheritance, polymorphism
- Arrays and Collections (Lists, Sets, Maps)

### Level 2 - Medium
- Exception Handling
- File Management (Input and Output)
- Generics
- Lambdas and Streams API

### Level 3 - Advanced

- [Java JVM Internals](/learning/java-jvm-internals) (GC, JVM, bytecode)
- Concurrency (Threads, Executors, Completable Future)
- Reflection
- Custom Annotations

### Level 4 - Professional Ecosystem
- Maven/ Gradle
- Spring
- Testing (JUnit, Mockito)
- Hibernate/JPA

### Quick Links

- [Java JVM Internals](/learning/java-jvm-internals) - More Details About Java Virtual Machine
    
- [Java Practical Examples](/learning/java-practical-examples) -  High Detailed Examples
    
- [Java Best Practices](/learning/java-best-practices) - Best Practices

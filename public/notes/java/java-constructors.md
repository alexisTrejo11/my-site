# Constructors

> Object initialization with constructors

## Default Constructor

```java
public class Dog {
    String name;
    
    // Compiler provides:
    // public Dog() { }
}
```

## Parameterized Constructor

```java
public class Dog {
    String name;
    String breed;
    
    public Dog(String name, String breed) {
        this.name = name;
        this.breed = breed;
    }
}
```

## Constructor Overloading

```java
public Dog() { }

public Dog(String name) {
    this.name = name;
}

public Dog(String name, String breed) {
    this.name = name;
    this.breed = breed;
}
```
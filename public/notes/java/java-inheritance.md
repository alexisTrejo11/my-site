# Inheritance

> Class inheritance in Java

## extends Keyword

```java
// Parent class
public class Animal {
    String name;
    public void eat() {
        System.out.println("Eating...");
    }
}

// Child class
public class Dog extends Animal {
    public void bark() {
        System.out.println("Woof!");
    }
}
```

## super Keyword

```java
public class Dog extends Animal {
    public Dog(String name) {
        super();           // Call parent constructor
        this.name = name;
    }
}
```
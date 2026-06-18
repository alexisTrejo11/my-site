# Classes and Objects

> OOP basics: class and object definition

## Class Definition

```java
public class Dog {
    // Instance variables
    String name;
    String breed;
    int age;
    
    // Methods
    void bark() {
        System.out.println(name + " says Woof!");
    }
    
    void sleep() {
        System.out.println(name + " is sleeping");
    }
}
```

## Creating Objects

```java
Dog myDog = new Dog();
myDog.name = "Buddy";
myDog.breed = "Labrador";
myDog.age = 3;
myDog.bark();
```
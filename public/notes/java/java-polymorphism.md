# Polymorphism

> Method overriding in Java

## Method Overriding

```java
class Animal {
    public void sound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Woof!");
    }
}
```

> Cannot add @Override and still works but for avoid problems always include @Override

## Runtime Polymorphism

```java
Animal animal = new Dog();  // Parent reference, child object
animal.sound();           // Calls Dog's method
```
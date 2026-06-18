# Design Patterns

> Common OOP patterns

## Creational

### Singleton

```java
public class Singleton {
    private static final Singleton INSTANCE = new Singleton();
    private Singleton() { }
    public static Singleton getInstance() { return INSTANCE; }
}
```

### Factory Method

```java
interface Shape {
    void draw();
}

class Circle implements Shape {
    public void draw() { }
}

class ShapeFactory {
    public static Shape create(String type) {
        return switch (type) {
            case "circle" -> new Circle();
            default -> throw new IllegalArgumentException();
        };
    }
}
```

## Structural

### Adapter

```java
class Adapter implements Target {
    private Adaptee adaptee;
    public Result request() { return adaptee.specificRequest(); }
}
```

### Decorator

```java
class Decorator implements Component {
    private Component component;
    public void operation() {
        component.operation();
        extraBehavior();
    }
}
```


## Behavioral

### Observer

```java
interface Observer { void update(); }
class Subject {
    private List<Observer> observers = new ArrayList<>();
    public void addObserver(Observer o) { observers.add(o); }
    public void notifyAll() { observers.forEach(Observer::update); }
}
```

### Strategy

```java
interface SortStrategy {
    void sort(List<String> list);
}

class Context {
    private SortStrategy strategy;
    public void setStrategy(SortStrategy s) { this.strategy = s; }
    public void executeSort(List<String> list) { strategy.sort(list); }
}
```
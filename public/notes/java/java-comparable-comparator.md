# Comparable and Comparator

> Sorting interfaces

## Comparable (natural order)

```java
class Person implements Comparable<Person> {
    private String name;
    
    @Override
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);
    }
}
```

## Comparator (custom order)

```java
Comparator<Person> byName = (p1, p2) -> p1.getName().compareTo(p2.getName());

Comparator<Person> byAge = Comparator.comparingInt(Person::getAge);
```

## Usage

```java
Collections.sort(list);
Collections.sort(list, comparator);
list.sort(comparator);
```
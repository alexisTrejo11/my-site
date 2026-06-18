# Inheritance

> Class inheritance in Python

## Single Inheritance

```python
class Animal:
    def __init__(self, name: str):
        self.name = name
    
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

dog = Dog("Buddy")
print(dog.speak())  # Woof!
print(dog.name)    # Buddy
```

## Multiple Inheritance

```python
class Flyable:
    def fly(self):
        return "Flying!"

class Swimmable:
    def swim(self):
        return "Swimming!"

class Duck(Animal, Flyable, Swimmable):
    pass

duck = Duck("Donald")
print(duck.fly())   # Flying!
print(duck.swim())  # Swimming!
```

## super() Function

```python
class Animal:
    def __init__(self, name: str):
        self.name = name

class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name)
        self.breed = breed

d = Dog("Buddy", "Labrador")
print(d.name, d.breed)  # Buddy Labrador
```

## isinstance() and issubclass()

```python
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal)) # True
print(issubclass(Dog, Animal)) # True
```
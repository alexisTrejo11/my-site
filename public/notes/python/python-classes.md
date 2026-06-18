# Classes

> Class definition in Python

## Basic Class

```python
class Person:
    # Class attribute
    species = "Homo sapiens"
    
    # Instance attributes
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
    
    # Instance method
    def greet(self):
        return f"Hello, I'm {self.name}"
    
    # Class method
    @classmethod
    def from_dict(cls, data: dict):
        return cls(**data)
    
    # Static method
    @staticmethod
    def validate(age: int):
        return age >= 0

# Usage
p = Person("Alice", 30)
print(p.greet())         # Hello, I'm Alice
print(Person.species)   # Homo sapiens
```

## Self

```python
class MyClass:
    def __init__(self, value):
        self.value = value
    
    def get_value(self):
        return self.value
```

## Class vs Instance

```python
class Counter:
    count = 0  # Class attribute
    
    def __init__(self):
        self.count = 0  # Instance attribute
    
c1 = Counter()
c2 = Counter()
print(c1.count, c2.count)  # 0 0
c1.count = 5
print(c1.count, c2.count)    # 5 0
```
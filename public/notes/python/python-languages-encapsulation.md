# Encapsulation

> Private attributes (convention)

## Naming Convention

```python
class Person:
    def __init__(self, name):
        self.name = name      # Public
        self._internal = 1   # Protected (_)
        self.__private = 2   # Name-mangled (__)
    
    def __str__(self):
        return self.name

# Name mangling
p = Person("Alice")
print(p._Person__private)  # Access via mangled name
```

## Properties

```python
class Person:
    def __init__(self, name: str):
        self._name = name
    
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        if len(value) < 2:
            raise ValueError("Name too short")
        self._name = value
    
    @name.deleter
    def name(self):
        del self._name

p = Person("Alice")
print(p.name)   # Alice
p.name = "Bob"
print(p.name)   # Bob
```
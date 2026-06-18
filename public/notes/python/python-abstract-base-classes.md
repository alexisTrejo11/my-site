# Abstract Base Classes

> ABCs from abc module

## Abstract Class

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass
    
    def describe(self):
        return f"Area: {self.area()}"

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

r = Rectangle(3, 4)
print(r.area())      # 12
print(r.describe()) # Area: 12
```

## Abstract Property

```python
class Shape(ABC):
    @property
    @abstractmethod
    def area(self):
        pass
```

## Register Implementation

```python
class Triangle:
    def area(self):
        return 0.5 * 3 * 4

Shape.register(Triangle)
```
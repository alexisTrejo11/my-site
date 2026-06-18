# Dataclasses

> Auto-generated __init__, __repr__, etc.

## Basic

```python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int = 0  # With default

p = Person("Alice", 30)
print(p)  # Person(name='Alice', age=30)
```

## Methods

```python
@dataclass
class Point:
    x: float
    y: float
    
    def distance(self):
        return (self.x**2 + self.y**2) ** 0.5
```

## Comparison

```python
@dataclass(order=True)
class Point:
    x: float
    y: float

p1 = Point(1, 2)
p2 = Point(3, 4)
p1 < p2  # True (ordered)
```

## post_init

```python
@dataclass
class Rectangle:
    width: float
    height: float
    
    def __post_init__(self):
        if self.width < 0 or self.height < 0:
            raise ValueError("Cannot be negative")
```

## field

```python
from dataclasses import field

@dataclass
class Person:
    name: str
    active: bool = field(default=True, compare=False)
    tags: list = field(default_factory=list)

p = Person("Alice")
p.tags.append("dev")
```

## as_dict

```python
from dataclasses import dataclass, asdict

p = Person("Alice", 30)
asdict(p)  # {'name': 'Alice', 'age': 30}
```
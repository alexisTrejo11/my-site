# Types and Classes

> Type annotations and classes

## type() Function

```python
x = 10
print(type(x))          # <class 'int'>
print(type(x) == int)  # True
```

## Class as Type

```python
class Person:
    pass

p = Person()
print(type(p))         # <class '__main__.Person'>
print(isinstance(p, Person)) # True
```

## Type Annotations (Python 3.5+)

```python
# Variable annotation
name: str = "Python"
age: int = 30

# Function annotation
def greet(name: str) -> str:
    return f"Hello, {name}!"

# Class annotation
class Person:
    name: str
    age: int
    
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age
```

## typing Module

```python
from typing import List, Dict, Optional, Union, Any

def process(items: List[int]) -> Dict[str, int]:
    return {"count": len(items)}

value: Optional[str] = None  # Can be None

result: Union[int, str] = 42  # Either type
```

## typing.cast()

```python
from typing import cast

x: str = cast(str, 123)  # Type checker uses str
```
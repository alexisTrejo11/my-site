# Enum

> Enumerated constants

## Basic Enum

```python
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

Color.RED          # Color.RED
Color.RED.name    # 'RED'
Color.RED.value   # 1
```

## auto() Values

```python
from enum import auto, Enum

class Status(Enum):
    PENDING = auto()
    RUNNING = auto()
    COMPLETE = auto()
```

## String Values

```python
class Grade(Enum):
    A = "excellent"
    B = "good"
    C = "average"

Grade.A.value  # "excellent"
```

## Iteration

```python
for color in Color:
    print(color.name, color.value)

list(Color)  # All members
```

## IntEnum (int + Enum)

```python
from enum import IntEnum

class HTTP(IntEnum):
    OK = 200
    NOT_FOUND = 404

HTTP.OK + 1  # 201 (integer-like)
```

## Flag (bitwise)

```python
from enum import Flag, auto

class Perm(Flag):
    READ = auto()
    WRITE = auto()
    EXECUTE = auto()

READ | WRITE  # Perm.READ | Perm.WRITE
```
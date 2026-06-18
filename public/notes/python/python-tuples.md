# Tuples

> Ordered, immutable sequences

## Creating Tuples

```python
# Empty
empty = ()

# Single element (needs comma!)
single = (1,)

# Multiple elements
point = (10, 20)
colors = ("red", "green", "blue")

# Without parentheses
pair = 1, 2

# Tuple from other
t = tuple([1, 2, 3])  # (1, 2, 3)
```

## Access and Slice

```python
colors[0]       # First
colors[-1]      # Last
colors[1:3]      # Slice
```

## Tuple Methods

```python
# Only two methods!
colors.index("red")   # First index
colors.count("red")  # Count
```

## Why Tuples?

- **Faster** than lists
- **Hashable** (can be dict keys)
- **Immutability** for protection
- **Safer** in function returns

## Named Tuples

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p.x, p.y)      # 10 20
print(p._fields)     # ('x', 'y')
```
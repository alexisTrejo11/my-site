# Mutability

> Mutable vs immutable objects

## Immutable Types

```python
# These cannot be changed in-place
int        # 5
float      # 3.14
str       # "hello"
tuple     # (1, 2, 3)
frozenset # frozenset({1, 2})
bytes    # b"hello"
bool     # True
None     # None
```

## Mutable Types

```python
# These CAN be changed in-place
list      # [1, 2, 3]
dict      # {"a": 1}
set      # {1, 2, 3}
bytearray # bytearray(b"hello")
```

## Mutability in Classes

```python
class Container:
    def __init__(self):
        self.immutable = (1, 2, 3)  # Tuple (immutable)
        self.mutable = [1, 2, 3]     # List (mutable!)

c = Container()
c.immutable = (4, 5, 6)   # Replace - OK
c.mutable.append(4)      # Modify - OK (same object!)

# Copy to avoid mutation
c.mutable = c.mutable.copy()
c.mutable = list(c.mutable)
```

## id() Example

```python
a = [1, 2]
b = a
print(id(a) == id(b))  # True

b.append(3)
print(a)              # [1, 2, 3] - a is also changed!
```
# Dunder Methods

> Special (double-underscore) methods

## Common Dunder Methods

```python
class Person:
    def __init__(self, name):
        self.name = name
    
    def __str__(self):
        return f"Person({self.name})"
    
    def __repr__(self):
        return f"Person(name='{self.name}')"
    
    def __eq__(self, other):
        return self.name == other.name
    
    def __lt__(self, other):
        return self.name < other.name
    
    def __len__(self):
        return len(self.name)
    
    def __call__(self):
        return f"Hello, I'm {self.name}"

p = Person("Alice")
print(str(p))     # Person(Alice)
print(repr(p))    # Person(name='Alice')
print(p())        # Hello, I'm Alice
```

## Numeric Dunders

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
    
    def __rmul__(self, scalar):
        return self.__mul__(scalar)

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)    # Vector(x=4, y=6)
print(v1 * 3)     # Vector(x=3, y=6)
print(3 * v1)    # Vector(x=3, y=6)
```

## Container Dunders

```python
class Container:
    def __init__(self, items):
        self.items = items
    
    def __len__(self):
        return len(self.items)
    
    def __getitem__(self, index):
        return self.items[index]
    
    def __setitem__(self, index, value):
        self.items[index] = value
    
    def __contains__(self, item):
        return item in self.items

c = Container([1, 2, 3])
print(len(c))     # 3
print(c[0])      # 1
```
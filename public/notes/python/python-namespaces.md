# Namespaces

> LEGB rule (Local, Enclosing, Global, Built-in)

## LEGB Rule

```python
# Built-in
print(len)  # Built-in function

# Global
x = "global"

def outer():
    # Enclosing
    x = "enclosing"
    
    def inner():
        # Local
        x = "local"
        print(x)  # local
    
    inner()
    print(x)      # enclosing

outer()
print(x)          # global
```

## globals() and locals()

```python
x = 1

def func():
    y = 2
    print(globals())  # {'x': 1, ...}
    print(locals())   # {'y': 2}

func()
```

## namespace

```python
# Simple namespace
from types import SimpleNamespace

ns = SimpleNamespace(name="Python", version=3.12)
print(ns.name)     # Python
ns.version = 3.11
```

## global keyword

```python
counter = 0

def increment():
    global counter
    counter += 1

increment()
print(counter)  # 1
```

## nonlocal keyword

```python
def outer():
    count = 0
    
    def inner():
        nonlocal count
        count += 1
    
    inner()
    print(count)

outer()
```
# Functions

> Function definition and parameters

## Basic Function

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Python"))
```

## Parameters

```python
# Default parameters
def greet(name="World"):
    return f"Hello, {name}!"

# Multiple parameters
def add(a, b=0, *args, **kwargs):
    print(a, b, args, kwargs)
```

## *args and **kwargs

```python
def func(*args, **kwargs):
    print(args)    # Tuple
    print(kwargs) # Dictionary

func(1, 2, name="Python")
# (1, 2)
# {'name': 'Python'}
```

## Lambda Functions

```python
# Anonymous function
square = lambda x: x ** 2
add = lambda a, b: a + b
```

## Function Annotations

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

## Scope

```python
x = "global"

def func():
    x = "local"
    print(x)  # local
    
func()
print(x)      # global
```
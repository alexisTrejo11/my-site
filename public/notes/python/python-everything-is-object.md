# Everything Is Object

> Python's object model

## Everything Is an Object

```python
# Integers
x = 5
print(type(x))     # <class 'int'>
print(x.__class__) # <class 'int'>

# Functions
def foo(): pass
print(type(foo))  # <class 'function'>
print(foo.__class__) # <class 'function'>

# Classes
print(type(int))   # <class 'type'>
```

## id() - Object Identity

```python
a = [1, 2]
b = [1, 2]
c = a

print(id(a))        # Unique integer
print(a is b)      # False (different objects)
print(a is c)      # True (same object)
```

## is and is not

```python
x = None
print(x is None)    # True

a = [1, 2]
b = a
print(a is b)      # True
```

## Object Attributes

```python
s = "Hello"
print(dir(s))       # All attributes/methods
print(hasattr(s, 'upper')) # True
print(getattr(s, 'upper')) # <built-in method upper...>
```
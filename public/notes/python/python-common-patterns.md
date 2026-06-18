# Common Patterns

> Useful patterns in Python

## Singleton

```python
class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
```

## Factory

```python
class Shape:
    @staticmethod
    def create(kind):
        if kind == "circle":
            return Circle()
        elif kind == "square":
            return Square()
```

## Builder

```python
class Builder:
    def __init__(self):
        self = Builder()
    
    def set_name(self, name):
        self.name = name
        return self
    
    def build(self):
        return self

obj = Builder().set_name("Test").build()
```

## Observer

```python
class Observer:
    def __init__(self):
        self.observers = []
    
    def attach(self, observer):
        self.observers.append(observer)
    
    def notify(self):
        for o in self.observers:
            o.update()
```

## Strategy

```python
class Context:
    def __init__(self, strategy):
        self.strategy = strategy
    
    def execute(self, data):
        return self.strategy.execute(data)
```

## Context Manager

```python
class Manager:
    def __enter__(self):
        print("Enter")
        return self
    
    def __exit__(self, *args):
        print("Exit")

with Manager() as m:
    pass
```

## Decorator

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result
    return wrapper
```
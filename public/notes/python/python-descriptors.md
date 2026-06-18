# Descriptors

> Property descriptors

## Descriptor Protocol

```python
class Descriptor:
    def __get__(self, obj, cls=None):
        return self._value
    
    def __set__(self, obj, value):
        self._value = value
    
    def __delete__(self, obj):
        del self._value

class MyClass:
    attr = Descriptor()
    
    def __init__(self):
        self.attr = 10

obj = MyClass()
print(obj.attr)  # 10
```

## property() Function

```python
class Temperature:
    def __init__(self):
        self._temp = 0
    
    @property
    def temp(self):
        return self._temp
    
    @temp.setter
    def temp(self, value):
        if value < -273.15:
            raise ValueError("Too cold!")
        self._temp = value
    
    @temp.deleter
    def temp(self):
        print("Deleting...")
        del self._temp
```

## \_\_get\_\_with\_name\_\_

```python
class Validator:
    def __init__(self, minval, maxval):
        self.minval = minval
        self.maxval = maxval
    
    def __set__(self, obj, value):
        if not (self.minval <= value <= self.maxval):
            raise ValueError(f"Must be {self.minval}-{self.maxval}")
        obj.__dict__[self.name] = value
    
    def __set_name__(self, owner, name):
        self.name = name

class Range:
    value = Validator(0, 100)

r = Range()
r.value = 50    # OK
r.value = 150   # ValueError
```
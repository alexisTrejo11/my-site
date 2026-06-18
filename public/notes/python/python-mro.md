# Method Resolution Order (MRO)

> Diamond inheritance

## Diamond Problem

```python
class A:
    def process(self):
        print("A.process")

class B(A):
    pass

class C(A):
    def process(self):
        print("C.process")

class D(B, C):
    pass

d = D()
d.process()  # Which one?
```

## Viewing MRO

```python
# Method resolution order
print(D.__mro__)
# (<class '__main__.D'>, <class '__main__.B'>, 
#  <class '__main__.C'>, <class '__main__.A'>, 
#  <class 'object'>)

# Or
print(cls.mro())
```

## C3 Linearization

```python
# Subclass appears first
# Then parents in order
# Then parent of parents
# Last: object
B, C, A, object
# D -> B -> C -> A -> object
```

## super() with MRO

```python
class A:
    def process(self):
        print("A")

class B(A):
    def process(self):
        print("B")
        super().process()

class C(A):
    def process(self):
        print("C")
        super().process()

class D(B, C):
    def process(self):
        print("D")
        super().process()

D().process()  # D -> B -> C -> A
```
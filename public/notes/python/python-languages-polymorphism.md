# Polymorphism

> Duck typing in Python

## Duck Typing

```python
# If it walks like a duck...
def make_speak(obj):
    return obj.speak()

class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

print(make_speak(Dog()))  # Woof!
print(make_speak(Cat()))  # Meow!
```

## Polymorphic Operators

```python
# + works with different types
1 + 2          # 3 (int)
1.5 + 2.5      # 4.0 (float)
"a" + "b"      # "ab" (str)
[1, 2] + [3]  # [1, 2, 3] (list)
```

## Method Overriding

```python
class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

animals = [Dog(), Cat()]
for a in animals:
    print(a.speak())  # Woof! Meow!
```
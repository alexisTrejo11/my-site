# sorted() and key Functions

> Sorting with custom order

## sorted() - New List

```python
numbers = [3, 1, 4, 1, 5]
sorted(numbers)       # [1, 1, 3, 4, 5]
sorted(numbers, reverse=True)  # [5, 4, 3, 1, 1]

# Doesn't modify original
print(numbers)  # [3, 1, 4, 1, 5]
```

## list.sort() - In-place

```python
numbers.sort()       # Modifies in-place
numbers.sort(reverse=True)
```

## key Parameter

```python
# By length
words = ["hi", "hello", "hey"]
sorted(words, key=len)  # ['hi', 'hey', 'hello']

# By last character
sorted(words, key=lambda w: w[-1])  # ['hello', 'hey', 'hi']

# Case-insensitive
sorted(words, key=str.lower)
```

## Custom Objects

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

people = [Person("Bob", 30), Person("Alice", 25)]

# Sort by age
sorted(people, key=lambda p: p.age)

# Sort by multiple
sorted(people, key=lambda p: (p.age, p.name))
```

## Using operator module

```python
from operator import itemgetter, attrgetter

# Dictionary sorting
users = [{"name": "Bob", "age": 30}, {"name": "Alice", "age": 25}]
sorted(users, key=itemgetter("age"))

# Object attribute sorting
sorted(people, key=attrgetter("age"))
```
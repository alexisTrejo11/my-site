# map, reduce, filter

> Functional operations

## map() - Transform

```python
# Apply function to each item
numbers = [1, 2, 3, 4]
squares = list(map(lambda x: x**2, numbers))  # [1, 4, 9, 16]

# With multiple iterables
a = [1, 2, 3]
b = [10, 20, 30]
result = list(map(lambda x, y: x + y, a, b))  # [11, 22, 33]
```

## filter() - Select

```python
# Keep items matching condition
numbers = [1, 2, 3, 4, 5]
evens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]
```

## reduce() - Accumulate

```python
from functools import reduce

numbers = [1, 2, 3, 4]
product = reduce(lambda x, y: x * y, numbers)  # 24

# With initial
sum_with_init = reduce(lambda x, y: x + y, numbers, 10)  # 20
```

## Combined

```python
from functools import reduce

# Pipeline: sum of squares of even numbers
numbers = [1, 2, 3, 4, 5, 6]

result = reduce(
    lambda x, y: x + y,
    map(
        lambda x: x**2,
        filter(lambda x: x % 2 == 0, numbers)
    )
)  # 56 (4 + 16 + 36)

# Equivalent list comprehension
result = sum(x**2 for x in numbers if x % 2 == 0)
```
# List Comprehension

> Concise list creation

## Basic

```python
# Simple
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]

# With condition
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
```

## Nested

```python
matrix = [[i*j for j in range(3)] for i in range(3)]
# [[0, 0, 0], [0, 1, 2], [0, 2, 4]]
```

## Set Comprehension

```python
unique = {x**2 for x in range(-2, 3)}  # {0, 1, 4}
```

## Dict Comprehension

```python
squares = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

## Generator Expression

```python
# Don't materialize - yield on demand
gen = (x**2 for x in range(5))
for val in gen:
    print(val)
```

## Performance

```python
# List comprehension: faster than for loop
squares = [x**2 for x in range(1000)]

# vs
squares = []
for x in range(1000):
    squares.append(x**2)
```
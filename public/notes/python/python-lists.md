# Lists

> Ordered, mutable sequences

## Creating Lists

```python
# Empty
empty = []

# With values
numbers = [1, 2, 3]
mixed = [1, "two", 3.0]
nested = [[1, 2], [3, 4]]

# List comprehension
squares = [x**2 for x in range(5)]
```

## Basic Operations

```python
# Access
numbers[0]     # First element
numbers[-1]      # Last element

# Slice
numbers[1:4]    # Elements 1-3
numbers[::2]     # Every other

# Modify
numbers.append(4)   # Add to end
numbers.insert(0, 0) # At index
numbers.remove(2)   # Remove first 2
del numbers[0]     # By index
numbers.pop()       # Remove and return last
numbers.clear()     # Clear all
```

## List Methods

```python
# Search
numbers.count(2)      # Count occurrences
numbers.index(3)      # First index

# Sorting
numbers.sort()            # In-place
sorted(numbers)        # New list
numbers.sort(reverse=True)

# Reverse
numbers.reverse()
reversed(numbers)     # Iterator
```

## Membership

```python
1 in numbers          # True/False
numbers.count(5)     # Count of 5
```
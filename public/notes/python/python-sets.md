# Sets

> Unordered, unique elements

## Creating Sets

```python
# Set
vowels = {"a", "e", "i", "o", "u"}

# From iterable
unique = set([1, 2, 2, 3, 3])  # {1, 2, 3}

# Empty (not {})
empty = set()

# Frozenset (immutable)
frozen = frozenset([1, 2, 3])
```

## Set Operations

```python
# Add/Remove
vowels.add("a")       # Already there
vowels.add("y")
vowels.remove("e")     # KeyError if missing
vowels.discard("e")    # No error if missing
vowels.pop()          # Remove arbitrary
vowels.clear()
```

## Mathematical

```python
A = {1, 2, 3}
B = {2, 3, 4}

A | B         # Union: {1, 2, 3, 4}
A & B         # Intersection: {2, 3}
A - B         # Difference: {1}
A ^ B         # Symmetric: {1, 4}

A.issubset(B)
A.issuperset(B)
A.isdisjoint(B)  # No common elements
```

## frozenset

```python
# Immutable - can be dict keys
frozen = frozenset([1, 2, 3])
d = {frozen: "set data"}
```
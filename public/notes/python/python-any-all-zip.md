# any(), all(), zip()

> Boolean and pairing operations

## any() - At least one

```python
# True if any is truthy
any([False, True, False])  # True
any([0, "", None])        # False (all falsy)

# Practical
valid = any(user.is_valid for user in users)
```

## all() - All match

```python
# True if all are truthy
all([True, True, True])  # True
all([True, False])      # False

# Practical
complete = all(user.name for user in users)
```

## zip() - Pair iterables

```python
# Combine iterables into tuples
names = ["alice", "bob", "charlie"]
ages = [25, 30, 35]

combined = list(zip(names, ages))
# [('alice', 25), ('bob', 30), ('charlie', 35)]

# Unzip
pairs = [('a', 1), ('b', 2)]
letters, numbers = zip(*pairs)
# ('a', 'b'), (1, 2)
```

## enumeraTe() - With indices

```python
for i, item in enumerate(items):
    print(f"{i}: {item}")

# For starting index
for i, item in enumerate(items, start=1):
    print(f"{i}: {item}")
```

## Reversed

```python
# Note: creates new iterator!
list(reversed([1, 2, 3]))  # [3, 2, 1]
```
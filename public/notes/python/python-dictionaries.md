# Dictionaries

> Key-value mappings

## Creating

```python
# Literals
person = {"name": "John", "age": 30}

# dict()
d = dict(name="John", age=30)

# From sequence
pairs = [("name", "John"), ("age", 30)]
d = dict(pairs)
```

## Access

```python
# Get value
person["name"]        # KeyError if missing
person.get("name")    # None if missing
person.get("name", "N/A")  # Default value

# All keys/values
person.keys()
person.values()
person.items()

# Set default
person.setdefault("country", "USA")
```

## Modify

```python
person["age"] = 31          # Update
person.update({"age": 31}) # Batch
person.pop("age")          # Remove
del person["age"]         # Delete
```

## Dictionary Methods

```python
len(d)                 # Count
"key" in d            # Membership

# New in Python 3.10+
d | {"x": 1}         # Merge
d |= {"x": 1}        # Update in-place
```

## Dictionary Views

```python
keys = person.keys()
values = person.values()
items = person.items()

# Dynamic - reflect changes!
person["new"] = "value"
print(keys)  # Includes new key
```
# raise and try/except

> Exception handling

## raise

```python
# Re-raise
def validate(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

# Chaining
def process():
    try:
        divide(1, 0)
    except ZeroDivisionError as e:
        raise RuntimeError("Failed") from e
```

## try/except

```python
try:
    result = divide(a, b)
except ZeroDivisionError:
    result = 0

# Multiple
try:
    data[key]
except KeyError:          # Specific
    data = {}
except (IndexError, KeyError):  # Multiple
    data = []
except Exception:      # Catch all
    raise

# With else (no exception)
try:
    x = divide(5, 1)
except ZeroDivisionError:
    print("Error")
else:
    print(f"Result: {x}")  # Runs if no exception
```

## finally

```python
try:
    file = open("file.txt")
    data = file.read()
finally:
    file.close()  # Always runs
```

## Context Manager

```python
class MyContext:
    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Handle exception or return True to suppress
        return False

with MyContext() as ctx:
    pass
```
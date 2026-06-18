# Custom Exceptions

> Creating your own exceptions

## Basic Custom Exception

```python
class MyError(Exception):
    pass

raise MyError("Something went wrong")
```

## With Additional Data

```python
class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

raise ValidationError("email", "Invalid format")
```

## Exception Hierarchy

```python
class BankError(Exception):
    """Base for bank errors"""
    pass

class InsufficientFunds(BankError):
    """Not enough money"""
    pass

class AccountLocked(BankError):
    """Account is locked"""
    pass
```

## Warning Instead

```python
import warnings

warnings.warn("Deprecated", DeprecationWarning)
warnings.warn("Future warning", FutureWarning)
```

## Traceback

```python
import traceback

try:
    divide(1, 0)
except Exception:
    traceback.print_exc()
    # Or get as string:
    # traceback.format_exc()
```
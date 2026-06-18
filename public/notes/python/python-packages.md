# Packages

> Directory as module

## Folder Structure

```
mypackage/
├── __init__.py      # Package init
├── module1.py
├── module2.py
└── subpackage/
    ├── __init__.py
    └── module3.py
```

## __init__.py

```python
# mypackage/__init__.py
from .module1 import func1
from .module2 import func2

__version__ = "1.0.0"
__all__ = ["func1", "func2"]
```

## __main__.py

```python
# Run: python -m mypackage
# mypackage/__main__.py

if __name__ == "__main__":
    print("Running as main")
```

## Package Alias

```python
# In imports
import mypackage as pkg
pkg.func1()
```

## Namespace Package (Python 3.3+)

```python
# Without __init__.py - implicit namespace package
#PEP 420
```
# Import System

> Import and from statements

## Basic Import

```python
import math
import os.path as op  # Alias

from collections import deque
from os import path as p  # Alias
```

## Relative Import

```python
# mypackage/utils.py
from . import helpers          # Same package
from .sub import module      # Subpackage
from .. import parent       # Parent package
from ..parent import mod  # Parent's module
```

## Import All

```python
from module import *  # BAD - imports all public names

# With __all__
__all__ = ["func1", "func2"]
```

## Dynamic Import

```python
import importlib

# Module name as string
math = importlib.import_module("math")
mod = importlib.import_module("mymodule")
```

## inspect Module

```python
import inspect

# Get source
inspect.getsource(module.func)

# Get signature
inspect.signature(module.func)
```

## Module Caching

```python
import sys

print("math" in sys.modules)  # True if imported
```
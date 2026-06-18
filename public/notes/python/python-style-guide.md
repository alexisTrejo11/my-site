# Style Guide (PEP 8)

> Python coding conventions

## Naming

```python
# Variables, functions: snake_case
my_variable = 1
def my_function():

# Classes: PascalCase
class MyClass:

# Constants: UPPER_SNAKE_CASE
MAX_SIZE = 100

# Private: _leading_underscore
_private = 1

# Dunder: __dunder__
__init__ = 1
```

## Spacing

```python
# 4 spaces for indentation
if True:
    do_something()

# No spaces around = for default params
def func(a, b=1):

# Spaces around operators
x = 1 + 2
```

## Line Length

```python
# Max 79 characters (soft)
# Max 72 for comments

# Line continuation
result = long_function(
    arg1, arg2, arg3,
    arg4, arg5
)
```

## Imports

```python
# Stdlib first
import os
import sys

# Third-party
import numpy as np

# Local
from . import utils

# Alphabetical
from collections import (
    defaultdict,
    OrderedDict
)
```

## Comments

```python
# Complete sentences
# Block comments for complex logic

# Inline (limited)
x = x + 1  # Compensate for border
```
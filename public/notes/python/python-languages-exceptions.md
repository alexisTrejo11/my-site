# Exceptions

> Exception hierarchy

## BaseException

```python
BaseException
├── SystemExit          # sys.exit()
├── KeyboardInterrupt  # Ctrl+C
├── GeneratorExit     # Generator stop
└── Exception        # Most exceptions
    ├── StopIteration
    ├── ArithmeticError
    │   ├── FloatingPointError
    │   ├── OverflowError
    │   └── ZeroDivisionError
    ├── LookupError
    │   ├── IndexError
    │   └── KeyError
    ├── OSError
    │   ├── FileNotFoundError
    │   └── PermissionError
    ├── ValueError
    └── ... many more
```

## Common Exceptions

```python
IndexError       # list index out of range
KeyError        # dict key not found
ValueError     # Wrong argument value
TypeError      # Wrong type
NameError      # Undefined name
SyntaxError    # Invalid syntax
AttributeError  # Undefined attribute
```
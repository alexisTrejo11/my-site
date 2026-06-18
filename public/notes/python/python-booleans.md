# Booleans

> bool type: True/False

## Creation

```python
is_active = True
is_empty = False
```

## bool() Function

```python
bool(1)         # True
bool(0)         # False (falsy)
bool("")         # False
bool([])         # False
bool(None)       # False
```

## Falsy Values

```python
# None
# False
# 0, 0.0, Decimal(0), Fraction(0, 1)
# '', [], (), {}
# set(), frozenset()
```

## Truthy Values

```python
# Everything else!
# Non-zero numbers
# Non-empty strings, lists, etc.
```

## boolean Operators

```python
# and, or, not
True and False  # False
True or False  # True
not True      # False
```

## Comparison Returns bool

```python
5 > 3         # True
1 == 1        # True
```
# Numbers

> int, float, complex

## Integer (int)

```python
# Unlimited precision!
x = 10**100  # Works fine
```

## Floating Point

```python
3.14
1.5e-3      # 0.0015
```

## Number Functions

```python
int(3.7)    # 3 (truncates)
float(3)     # 3.0
complex(1, 2)  # (1+2j)
```

## Decimal (exact)

```python
from decimal import Decimal

0.1 + 0.2  # 0.30000000000000004
Decimal("0.1") + Decimal("0.2")  # Decimal('0.3')
```

## Fraction

```python
from fractions import Fraction

Fraction(1, 3)  # 1/3
Fraction("0.1") # 1/10
```

## Math Module

```python
import math

math.pi       # 3.14159...
math.e        # 2.71828...
math.sqrt(4) # 2.0
math.floor(3.7)  # 3
math.ceil(3.1)   # 4
math.trunc(-3.7) # -3 (toward zero)
math.pow(2, 3)  # 8.0
math.log(2)       # natural log
math.log10(100)   # 2.0
```
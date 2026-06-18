# functools Module

> Higher-order functions

## @lru_cache - Memoization

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

fib(100)  # Fast due to caching
```

## partial - Currying

```python
from functools import partial

def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

square(5)  # 25
cube(5)    # 125
```

## reduce - Already covered above

```python
from functools import reduce
```

## @cache (Python 3.9+)

```python
from functools import cache

@cache
def expensive(n):
    return n * 2
```

## cached_property (Python 3.8+)

```python
from functools import cached_property

class Data:
    @cached_property
    def data(self):
        print("Computing...")
        return 42
    
d = Data()
d.data  # "Computing..." then 42
d.data  # Cached - no message
```

## total_ordering

```python
from functools import total_ordering

@total_ordering
class Version:
    def __init__(self, major, minor):
        self.major = major
        self.minor = minor
    
    def __eq__(self, other):
        return (self.major, self.minor) == (other.major, other.minor)
    
    def __lt__(self, other):
        return (self.major, self.minor) < (other.major, other.minor)
```
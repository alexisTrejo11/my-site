# collections Module

> Specialized container datatypes

## Counter

```python
from collections import Counter

# Count items
colors = ["red", "blue", "red", "green", "blue", "blue"]
cnt = Counter(colors)
# Counter({'blue': 3, 'red': 2, 'green': 1})

cnt.most_common(2)  # [('blue', 3), ('red', 2)]
cnt["red"]         # 2
list(cnt.elements()) # All items
```

## defaultdict

```python
from collections import defaultdict

dd = defaultdict(list)  # Default type: list
dd["key"].append(1)   # Works without KeyError
dd["key"]              # [1]
```

## OrderedDict

```python
from collections import OrderedDict

# Preserves insertion order (Python 3.7+ = regular dict)
od = OrderedDict()
od["a"] = 1
od["b"] = 2
```

## namedtuple

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p.x, p.y)      # 10 20
print(p._fields)      # ('x', 'y')
print(p._asdict())   # {'x': 10, 'y': 20}
```

## ChainMap

```python
from collections import ChainMap

dict1 = {"a": 1}
dict2 = {"b": 2}
cm = ChainMap(dict1, dict2)
print(cm["a"])  # 1 (searches in order)
```

## UserDict / UserList / UserString

```python
from collections import UserDict

class MyDict(UserDict):
    def __setitem__(self, key, value):
        # Custom logic
        super().__setitem__(key, value)
```
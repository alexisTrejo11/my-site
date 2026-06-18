# Standard Library

> Key modules

## os, sys

```python
import os, sys

os.getcwd()
os.listdir(".")
os.path.join("a", "b")
sys.exit(0)
sys.argv
```

## datetime

```python
from datetime import datetime, date, time

datetime.now()
date.today()
time(10, 30)
```

## json

```python
import json

json.dumps(data)
json.loads(text)
```

## re

```python
import re

re.findall(r"\d+", text)
re.sub(r"\d+", "X", text)
```

## iterTOOLS

```python
import itertools

list(itertools.chain([1,2], [3,4]))
list(itertools.combinations([1,2,3], 2))
list(itertools.permutations([1,2,3], 2))
```

## random

```python
import random

random.random()
random.randint(1, 10)
random.choice(items)
random.shuffle(items)
```

## statistics

```python
import statistics

statistics.mean(nums)
statistics.median(nums)
statistics.stdev(nums)
```
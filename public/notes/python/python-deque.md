# Deque

> Double-ended queue

## Creating

```python
from collections import deque

dq = deque([1, 2, 3])
dq = deque(maxlen=5)  # Fixed size
```

## Operations

```python
# Right side
dq.append(4)
dq.appendleft(0)
x = dq.pop()
x = dq.popleft()

# Left side (same as right)
dq.extend([5, 6])
dq.extendleft([-1, 0])

# Clear
dq.clear()

# Rotate
dq.rotate(1)   # Right by 1
dq.rotate(-1)  # Left by 1
```

## Use Cases

```python
# Queue
dq.append(request)
process(dq.popleft())

# Recent history
recent = deque(maxlen=5)
recent.append(item)
# Keeps only last 5 items
```
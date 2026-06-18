# Generator Expressions

> Memory-efficient iteration

## Generator Function

```python
def count_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1

for num in count_to(5):
    print(num)  # 1, 2, 3, 4, 5
```

## Generator Expression

```python
gen = (x**2 for x in range(5))
print(next(gen))  # 0
print(next(gen))  # 1
print(list(gen))  # [4, 9, 16]
```

## yield from

```python
def chain(*iterables):
    for it in iterables:
        yield from it

list(chain([1, 2], [3, 4]))  # [1, 2, 3, 4]
```

## Why Generators?

- **Memory efficient**: Don't store all in memory
- **Lazy**: Compute on demand
- **Chainable**: Pipe operations

## Pipeline

```python
def read_files(files):
    for f in files:
        for line in open(f):
            yield line

def filter_lines(lines, pattern):
    for line in lines:
        if pattern in line:
            yield line

def process_lines(lines):
    for line in lines:
        yield line.strip().upper()

lines = read_files(["a.txt", "b.txt"])
lines = filter_lines(lines, "ERROR")
lines = process_lines(lines)
```
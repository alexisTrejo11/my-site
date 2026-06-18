# Control Flow

> Conditionals and loops

## if-elif-else

```python
age = 20

if age < 13:
    print("Child")
elif age < 20:
    print("Teen")
else:
    print("Adult")
```

## Ternary Expression

```python
status = "Adult" if age >= 18 else "Minor"
```

## while Loop

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

## for Loop

```python
for i in range(5):
    print(i)

# With else (executes if not broken)
for item in items:
    print(item)
else:
    print("Done")
```

## Loop Control

```python
# break - exit loop
for i in range(10):
    if i == 5:
        break
    
# continue - skip iteration
for i in range(5):
    if i == 2:
        continue
    print(i)
```

## Match Statement (Python 3.10+)

```python
status = "active"
match status:
    case "active":
        print("Running")
    case "paused":
        print("Paused")
    case _:
        print("Unknown")
```
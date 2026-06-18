# Strings

> String operations

## Creation

```python
# Single, double, triple quotes
s1 = 'hello'
s2 = "hello"
s3 = """multi
line"""

# str()
s = str(123)  # "123"
```

## Common Methods

```python
s = "Hello, World"

s.upper()           # "HELLO, WORLD"
s.lower()           # "hello, world"
s.capitalize()      # "Hello, world"
s.title()          # "Hello, World"
s.strip()           # Remove whitespace
s.split(",")       # ['Hello', ' World']
s.replace("o", "x") # "Hellx, Wxrld"
s.find("o")        # 4 (first index)
s.startswith("He") # True
s.endswith("ld")   # True
s.isdigit()        # False
s.isalpha()        # False
```

## F-Strings (Python 3.6+)

```python
name = "Python"
age = 30

f"{name} is {age} years old"  # "Python is 30 years old"
f"{age ** 2}"               # "900"
f"{name:>10}"               # "   Python"
```

## String Slicing

```python
s = "Python"
s[0]        # 'P'
s[1:4]     # 'yth'
s[:3]       # 'Pyt'
s[3:]       # 'hon'
s[::2]      # 'Pto'
s[::-1]     # 'nohtyP' (reverse)
```
# Python Virtual Machine (PVM)

> CPython interpreter

## How Python Runs

```
Source (.py) 
    ↓ 
Lexer 
    ↓ 
Parser 
    ↓ 
AST 
    ↓ 
Compiler 
    ↓ 
Bytecode (.pyc) 
    ↓ 
PVM 
    ↓ 
Output
```

## Bytecode

```python
import dis

def add(a, b):
    return a + b

dis.dis(add)
# LOAD_FAST 0 (a)
# LOAD_FAST 1 (b)  
# BINARY_ADD
# RETURN_VALUE
```

## .pyc Files

```python
# Cached bytecode stored in __pycache__/
# mymodule.pyc
# .pyo (optimized - Python 3.5+)
```

## dis Module

```python
import dis

# Disassemble function
dis.dis(my_function)

# Show information
dis.show_code(my_function)
```

## Execution Flow

```python
# 1. Compile to bytecode
code = compile(source, filename, "exec")

# 2. Execute in PVM
exec(code, globals, locals)
```

## Optimization Levels

```python
# -O removes assert statements
# -OO removes assert and docstrings

python -O script.py
```
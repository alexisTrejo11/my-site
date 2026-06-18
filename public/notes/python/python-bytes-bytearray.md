# Bytes and Bytearray

> Binary data

## bytes - Immutable

```python
# Literal
b"hello"

# From bytes()
b"hello".decode()  # "hello"
bytes([72, 101, 108, 108, 111])  # b'Hello'

# Encoding
"hello".encode()  # b'hello'
```

## bytearray - Mutable

```python
ba = bytearray(b"hello")
ba[0] = 72       # Change first byte
ba.append(33)    # Add '!'
bytes(ba)         # Convert back
```

## Common Operations

```python
data = b"Hello"

len(data)      # 5
data[0]       # 72
data[:3]      # b'Hel'
data.startswith(b"He")  # True
data.find(b"l")        # 2
```

## Hex and Base64

```python
import binascii, base64

# Hex
binascii.hexlify(b"hello")  # b'68656c6c6f'

# Base64
base64.b64encode(b"hello")  # b'aGVsbG8='
```
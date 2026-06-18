# Exceptions

> Exception hierarchy in Java

## Hierarchy

```
Throwable
├── Error
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── ...
└── Exception
    ├── RuntimeException (Unchecked)
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   └── ...
    └── Checked Exceptions
        ├── IOException
        ├── SQLException
        └── ...
```

## Common Exceptions

```java
NullPointerException
ArrayIndexOutOfBoundsException
IllegalArgumentException
IllegalStateException
ArithmeticException
ClassCastException
```
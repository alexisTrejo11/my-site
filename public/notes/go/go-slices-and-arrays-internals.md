# Slices and Arrays Internals

> Arrays are fixed-size; slices are the dynamic view everyone uses daily. Understanding the slice header prevents subtle bugs.

## Arrays vs slices

```go
var a [3]int = [3]int{1, 2, 3} // array — size is part of the type
s := []int{1, 2, 3}              // slice — reference type
```

Arrays are rarely passed around; slices are the idiomatic collection.

## The slice header

A slice is a **descriptor** over an underlying array:

```
┌──────────┬────────┬──────────┐
│ Pointer  │ Length │ Capacity │
│  *T      │  len   │   cap    │
└──────────┴────────┴──────────┘
```

| Field | Meaning |
|-------|---------|
| **Pointer** | Address of first element in backing array |
| **Length** | Number of visible elements |
| **Capacity** | Max elements from pointer without reallocation |

```go
s := make([]int, 3, 10) // len=3, cap=10
s = append(s, 4)        // may reuse backing array if cap allows
```

## Sharing backing arrays

Sub-slices share memory—mutations alias:

```go
original := []int{1, 2, 3, 4, 5}
sub := original[1:3] // [2, 3]
sub[0] = 99
// original is now [1, 99, 3, 4, 5]
```

Use `copy` or full slice expressions when you need isolation.

## `append` and reallocation

When `len == cap`, `append` allocates a new, larger array (typically ~2× growth), copies elements, and updates the pointer. Old slice variables may still point at the previous array.

## Performance tips

- Preallocate with `make([]T, 0, n)` when size is known
- Avoid appending in tight loops without capacity hints
- Large slices passed to functions: pass slice (descriptor copy), not `*[]T`, unless you must resize in place

← [Go MOC](/learning/go-master-moc)

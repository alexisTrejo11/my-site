# Pointers and Memory

> When to pass by value vs by pointer—and how Go keeps memory semantics explicit without manual malloc/free.

## Pointers in Go

A pointer holds the **address** of a value. Use `&` to take an address and `*` to dereference.

```go
x := 42
p := &x   // *int
fmt.Println(*p) // 42
*p = 100
fmt.Println(x)  // 100
```

`new(T)` allocates zeroed memory and returns `*T`:

```go
p := new(int) // *int, value 0
```

## Value vs pointer receivers

| Receiver | Copies data? | Mutate caller's struct? | Typical use |
|----------|--------------|-------------------------|-------------|
| **Value** `(s MyStruct)` | Yes | No | Small, immutable types |
| **Pointer** `(s *MyStruct)` | No (copies pointer) | Yes | Large structs, mutation |

```go
type Counter struct{ n int }

func (c *Counter) Inc() { c.n++ } // pointer receiver — mutates

func (c Counter) Value() int { return c.n } // value receiver — read-only
```

**Rule of thumb:** If any method needs to mutate the receiver, use pointer receivers for **all** methods on that type (consistency for the compiler and readers).

## When to pass pointers to functions

| Pass by value | Pass by pointer |
|---------------|-----------------|
| Small primitives (`int`, `bool`) | Large structs (avoid copy cost) |
| You want a copy isolated from caller | You must modify caller's data |
| Immutable semantics | Shared mutation (document carefully) |

Go has **no** pointer arithmetic—unlike C, you cannot do `p++` on arbitrary addresses.

## `nil` pointers

A `nil` pointer means "no value." Dereferencing `nil` panics at runtime—always check before use when interfaces or optional state are involved.

```go
var p *int
if p != nil {
    fmt.Println(*p)
}
```

← [Go MOC](/learning/go-master-moc)

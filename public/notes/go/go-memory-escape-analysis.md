# Memory Allocation and Escape Analysis

> The compiler decides **stack** vs **heap** allocation via **escape analysis**—not every `new` hits the GC.

## Stack allocation

Function-local variables usually live on the goroutine stack—cheap, freed when the function returns.

## Heap allocation (escape)

A value **escapes** to the heap when the compiler cannot prove it won't outlive the stack frame:

- Returning a pointer to a local variable
- Closing over a variable in a goroutine that may outlive the function
- Storing a pointer in global or interface-typed container

```go
func newUser() *User {
    u := User{Name: "Ada"}
    return &u // u escapes to heap
}
```

## Inspect escapes

```bash
go build -gcflags="-m" ./...
```

Output shows `moved to heap` vs stack allocation decisions.

## Performance impact

| Stack | Heap |
|-------|------|
| No GC scan for that object | GC must trace and reclaim |
| Cache-friendly, LIFO | Allocation pressure, latency |

## Practical tips

- Prefer value receivers for small structs when mutation isn't needed
- Reuse buffers with `sync.Pool` for hot paths
- Avoid unnecessary pointers in APIs—each pointer is a GC edge

← [Go MOC](/learning/go-master-moc) · Next: [Garbage Collector Tuning](/learning/go-garbage-collector-tuning)

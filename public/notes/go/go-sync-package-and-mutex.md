# sync Package and Mutex

> Channels orchestrate; `sync` primitives protect shared memory. Know when to use each.

## sync.WaitGroup

Wait for a fleet of goroutines to finish:

```go
var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        work(id)
    }(i)
}
wg.Wait()
```

**Rule:** `Add` before starting goroutine; `Done` in `defer` inside goroutine.

## sync.Mutex and RWMutex

```go
type SafeCounter struct {
    mu sync.Mutex
    n  int
}

func (c *SafeCounter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.n++
}
```

| Lock | Use when |
|------|----------|
| `Mutex` | Exclusive read/write |
| `RWMutex` | Many readers, rare writers |

## Channels vs shared memory

| Prefer **channels** | Prefer **mutex + shared state** |
|----------------------|----------------------------------|
| Passing ownership of data | Protecting a small hot cache |
| Pipeline stages | In-memory metrics counters |
| Fan-in/fan-out | Structures updated by many goroutines with clear invariants |

Go proverb: *"Share memory by communicating."* Mutexes are fine when the critical section is tiny and well-documented.

## sync.Once and sync.Pool

- **Once:** initialize singletons (config, connections) exactly once
- **Pool:** reuse temporary objects to reduce GC pressure (byte buffers)

## Atomic package

`sync/atomic` for lock-free counters when mutex overhead matters—use only with clear memory ordering understanding.

← [Go MOC](/learning/go-master-moc)

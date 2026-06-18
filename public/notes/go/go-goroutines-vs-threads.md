# Goroutines vs Threads

> Goroutines are lightweight, multiplexed onto fewer OS threads by the Go scheduler—not a 1:1 mapping.

## OS threads

- Kernel-scheduled, megabyte-scale stacks (typical)
- Expensive to create; context switches involve the kernel
- Fine for blocking I/O bound to thread pools

## Goroutines

- User-space stacks starting ~2 KB, grow as needed
- Cheap to spawn: `go func() { ... }()`
- Scheduled by the Go runtime on **M** OS threads (see [The Go Scheduler GMP](/learning/go-scheduler-gmp))

```go
func worker(id int) {
    fmt.Println("worker", id)
}

func main() {
    for i := 0; i < 100_000; i++ {
        go worker(i)
    }
    time.Sleep(time.Second)
}
```

Spawning 100k goroutines is routine; 100k OS threads is not.

## Memory sampling

The runtime samples stack usage and coordinates with the GC. Goroutine stacks can shrink and grow—unlike fixed thread stacks.

## Blocking calls

When a goroutine blocks on syscall or cgo, the scheduler may spin up another thread (**M**) so other goroutines keep running—hiding some blocking cost.

## Mental model

| | OS thread | Goroutine |
|---|-----------|-----------|
| Created by | OS / pthread | `go` keyword |
| Stack | Large, fixed tendency | Small, growable |
| Scheduling | Kernel | Go runtime (GMP) |
| Count in prod | Hundreds | Hundreds of thousands |

← [Go MOC](/learning/go-master-moc) · Next: [Channels and Buffering](/learning/go-channels-and-buffering)

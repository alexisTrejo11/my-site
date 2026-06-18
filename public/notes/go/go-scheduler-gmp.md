# The Go Scheduler (G-M-P)

> **G**oroutine, **M**achine (OS thread), **P**rocessor (logical CPU context)—the runtime multiplexes many Gs onto fewer Ms.

## Components

| Symbol | Name | Role |
|--------|------|------|
| **G** | Goroutine | Runnable unit of work |
| **M** | Machine | OS thread executing Go code |
| **P** | Processor | Local run queue + resources; `GOMAXPROCS` controls P count |

```
        ┌──── P ────┐
        │ run queue │──► G, G, G ...
        └─────┬─────┘
              │ bound to
        ┌─────▼─────┐
        │     M     │  (OS thread)
        └───────────┘
```

## Work stealing

When a **P**'s local queue is empty, it **steals** half of another P's goroutines—load balancing without a single global lock hot spot.

## GOMAXPROCS

```go
runtime.GOMAXPROCS(8) // default ≈ number of CPU cores
```

Sets how many Ps run user Go code concurrently. More Ps ≠ always faster (contention, cache effects).

## Blocking and handoff

When G blocks on syscall, M may detach and another M runs that P's queue—keeping CPUs busy.

## Implications for engineers

- CPU-bound work scales with `GOMAXPROCS` until memory bandwidth limits
- Don't fight the scheduler with excessive locking
- Profile with `pprof` before tuning—see [Garbage Collector Tuning](/learning/go-garbage-collector-tuning)

← [Go MOC](/learning/go-master-moc) · Related: [Goroutines vs Threads](/learning/go-goroutines-vs-threads)

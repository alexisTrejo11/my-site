# Garbage Collector Tuning

> Go uses a **non-generational, concurrent, tri-color mark-and-sweep** collector—designed for low pause times in server workloads.

## Tri-color marking

Objects are white (unscanned), gray (scanned, children pending), or black (fully scanned). The mutator runs concurrently with marking; **write barriers** track pointer updates so nothing reachable is missed.

## Phases (simplified)

1. **Sweep termination** — brief STW sync
2. **Mark** — concurrent tracing from roots
3. **Mark termination** — STW finish
4. **Sweep** — reclaim white objects, often concurrent

## GOGC

```go
// default GOGC=100: heap grows to ~2x live data before next cycle
debug.SetGCPercent(50) // more frequent GC, lower peak memory
```

Higher `GOGC` → fewer GC cycles, more RAM. Lower → more CPU on GC, tighter memory.

## Latency goals

Modern Go targets **sub-millisecond** STW pauses on many workloads—but allocation rate dominates:

| Symptom | Likely cause |
|---------|----------------|
| High `GC` CPU in `pprof` | Allocation churn |
| Spiky P99 latency | Large heaps + mark work |

## Tuning playbook

1. **Reduce allocations** — largest win (reuse slices, pools, avoid boxing)
2. **Profile** — `go tool pprof -http=:6060 cpu.prof heap.prof`
3. **Adjust GOGC** only after fixing hot alloc paths
4. **Ballast** (advanced) — rare; prefer fixing allocation patterns

## When GC isn't your problem

Network I/O, lock contention, and DB queries often dominate—don't optimize GC before measuring.

← [Go MOC](/learning/go-master-moc)

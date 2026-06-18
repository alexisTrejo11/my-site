# The Select Statement

> `select` waits on multiple channel operations—Go's answer to multiplexed I/O and timeouts.

## Basic select

```go
select {
case msg := <-ch1:
    fmt.Println("ch1", msg)
case msg := <-ch2:
    fmt.Println("ch2", msg)
}
```

If multiple cases are ready, one is chosen **pseudo-randomly**—avoid assuming priority without design.

## Default: non-blocking

```go
select {
case v := <-ch:
    fmt.Println(v)
default:
    fmt.Println("no data ready")
}
```

Use for polling or try-send/receive patterns.

## Timeouts

```go
select {
case res := <-result:
    fmt.Println(res)
case <-time.After(2 * time.Second):
    fmt.Println("timeout")
}
```

Prefer `context.Context` cancellation in production servers instead of scattered `time.After` (avoids timer leaks in loops).

## Context cancellation

```go
select {
case <-ctx.Done():
    return ctx.Err()
case data := <-ch:
    return process(data)
}
```

## Fan-in pattern

Merge multiple channels into one with a goroutine per source and `select` in a multiplexer—common in pipeline architectures.

← [Go MOC](/learning/go-master-moc) · See also: [Sync Package and Mutex](/learning/go-sync-package-and-mutex)

# Channels and Buffering

> **Don't communicate by sharing memory; share memory by communicating.** Channels are typed conduits for sending values between goroutines.

## Creating channels

```go
ch := make(chan int)      // unbuffered — synchronous handoff
buf := make(chan int, 10) // buffered — up to 10 sends without receiver
```

## Unbuffered channels

Send blocks until receive—and vice versa. This is a **synchronization point** (rendezvous).

```go
ch := make(chan string)
go func() { ch <- "ready" }()
msg := <-ch
```

## Buffered channels

Sends succeed until the buffer fills; then send blocks. Receives drain the buffer.

| Type | Send blocks when | Use case |
|------|------------------|----------|
| Unbuffered | No receiver ready | Strict sync, backpressure |
| Buffered | Buffer full | Decouple producer/consumer briefly |

## Directional channel types

Restrict send-only or receive-only at compile time:

```go
func producer(out chan<- int) { out <- 42 }
func consumer(in <-chan int)   { v := <-in }
```

## Closing channels

```go
close(ch)
v, ok := <-ch // ok=false when closed and drained
```

Only the sender should close (usually). Range over channel until closed:

```go
for v := range ch {
    fmt.Println(v)
}
```

## `select` preview

Multiplex receives/sends—see [The Select Statement](/learning/go-select-statement).

← [Go MOC](/learning/go-master-moc)

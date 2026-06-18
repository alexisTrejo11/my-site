# Go Master Roadmap

> **Go** optimizes for clarity, fast compilation, and first-class concurrency. This path moves from the language spec to CSP primitives, runtime internals, and backend APIs with Gin.
>
> Gin framework deep dives also live under `03_Backend/01_Frameworks/Gin_Go/` when you bridge language → production backend.

---

## Philosophy: Why Go?

| Principle | What it means in practice |
|-----------|---------------------------|
| **Simplicity** | Small language spec; one obvious way to do common tasks |
| **Composition over inheritance** | Struct embedding and interfaces—no class hierarchies |
| **Concurrency as a feature** | Goroutines + channels, not threads + locks by default |
| **Explicit errors** | `if err != nil`—failures are values, not exceptions |
| **Fast toolchain** | Single binary output; `go test`, `go fmt`, modules built-in |

---

## Learning Path

### 1. Language Specification

*Syntax, memory model, and Go's type system.*

| Note | Focus |
|------|--------|
| [Pointers and Memory](/learning/go-pointers-and-memory) | Pointers, value vs reference semantics |
| [Structs and Composition](/learning/go-structs-and-composition) | Structs, embedding, struct tags |
| [Slices and Arrays Internals](/learning/go-slices-and-arrays-internals) | Slice header: pointer, length, capacity |
| [Implicit Interfaces](/learning/go-implicit-interfaces) | Implicit interface satisfaction (duck typing) |

---

### 2. Concurrency Primitives

*CSP—Communicating Sequential Processes.*

| Note | Focus |
|------|--------|
| [Goroutines vs Threads](/learning/go-goroutines-vs-threads) | OS threads vs green goroutines |
| [Channels and Buffering](/learning/go-channels-and-buffering) | Buffered vs unbuffered channels |
| [The Select Statement](/learning/go-select-statement) | Multiplexing, timeouts, non-blocking I/O |
| [Sync Package and Mutex](/learning/go-sync-package-and-mutex) | WaitGroup, Mutex, channels vs shared memory |

---

### 3. Runtime & Internals

*How the Go runtime actually works.*

| Note | Focus |
|------|--------|
| [The Go Scheduler GMP](/learning/go-scheduler-gmp) | G-M-P model and work stealing |
| [Memory Alloc Escape Analysis](/learning/go-memory-escape-analysis) | Stack vs heap, escape analysis |
| [Garbage Collector Tuning](/learning/go-garbage-collector-tuning) | Tri-color concurrent GC, latency tuning |

---

### 4. Ecosystem & Gin

*Tooling and high-performance HTTP APIs.*

| Note | Focus |
|------|--------|
| [Error Handling Idiomatic](/learning/go-error-handling-idiomatic) | Errors as values, panic/recover |
| [Go Modules and Tooling](/learning/go-modules-and-tooling) | `go.mod`, `go.sum`, vendoring |
| [Gin Framework Architecture](/learning/go-gin-framework-architecture) | Gin-Gonic routing, middleware, handlers |

---

## Progress

| Track | Status |
|-------|--------|
| Language Specification | 📝 In progress |
| Concurrency Primitives | 📝 In progress |
| Runtime & Internals | 📝 In progress |
| Ecosystem & Gin | 📝 In progress |

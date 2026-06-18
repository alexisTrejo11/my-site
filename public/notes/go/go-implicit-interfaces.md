# Implicit Interfaces

> If it walks like a duck and quacks like a duck—Go doesn't need an `implements` keyword. Satisfaction is **implicit**.

## Interface definition

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
```

Any type with a matching `Read` method implements `Reader—no declaration required.

## Small interfaces

Go standard library favors **small, focused** interfaces:

```go
type Writer interface {
    Write(p []byte) (n int, err error)
}
```

Compose at call sites:

```go
type ReadWriter interface {
    Reader
    Writer
}
```

## Empty interface: `any`

`interface{}` (alias `any`) holds any value—use sparingly; prefer generics (Go 1.18+) or concrete types.

## Type assertions and switches

```go
var v any = "hello"

s, ok := v.(string) // safe assertion
if !ok { /* not a string */ }

switch x := v.(type) {
case string:
    fmt.Println(x)
case int:
    fmt.Println(x)
}
```

## Design guidance

| Do | Avoid |
|----|-------|
| Define interfaces where **consumers** need them | Huge "god interfaces" |
| Accept interfaces, return structs | Exporting interfaces from packages unnecessarily |
| Test with fakes implementing small interfaces | Premature abstraction |

Implicit interfaces enable **decoupling**—your HTTP handler depends on `UserStore`, not `*PostgresUserStore`.

← [Go MOC](/learning/go-master-moc)

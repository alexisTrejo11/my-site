# Idiomatic Error Handling

> Errors are **values**, not exceptions. Control flow is explicit: `if err != nil`.

## Returning errors

```go
func ReadConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("read config %s: %w", path, err)
    }
    // ...
    return &cfg, nil
}
```

`%w` wraps errors for `errors.Is` / `errors.As` inspection.

## Checking errors

```go
cfg, err := ReadConfig("app.yaml")
if err != nil {
    return err
}
```

Never ignore `err` without a documented reason.

## Custom error types

```go
type ValidationError struct {
    Field string
    Msg   string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Msg)
}
```

Use `errors.As` to branch on typed errors:

```go
var ve *ValidationError
if errors.As(err, &ve) {
    // handle validation
}
```

## panic and recover

| Mechanism | When |
|-----------|------|
| `error` return | Expected failures (I/O, validation) |
| `panic` | Programmer bugs, unrecoverable invariants |
| `recover` | Defer in HTTP middleware to catch panics |

**Production rule:** APIs should return HTTP 4xx/5xx—not panic to clients. Gin middleware can `recover()` and log stack traces.

```go
defer func() {
    if r := recover(); r != nil {
        log.Printf("panic: %v", r)
    }
}()
```

## errors.Is vs ==

Wrapped errors break `==`. Use:

```go
if errors.Is(err, os.ErrNotExist) { /* ... */ }
```

← [Go MOC](/learning/go-master-moc) · Next: [Go Modules and Tooling](/learning/go-modules-and-tooling)

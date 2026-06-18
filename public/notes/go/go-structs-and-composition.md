# Structs and Composition

> Go has **no inheritance**. Behavior and data are composed with structs, embedding, and interfaces.

## Struct basics

```go
type User struct {
    ID   int
    Name string
}
```

Structs are value types—assignment copies all fields unless you use pointers.

## Embedding (composition)

Embedding promotes fields and methods to the outer type—**composition**, not subclassing.

```go
type Logger struct{}

func (Logger) Log(msg string) { fmt.Println(msg) }

type Server struct {
    Logger // embedded — Server gets Log method
    Port int
}

s := Server{Port: 8080}
s.Log("listening") // promoted from Logger
```

## Struct tags

Tags attach metadata for serialization, validation, or ORMs—read via reflection.

```go
type Product struct {
    SKU  string `json:"sku" db:"sku"`
    Name string `json:"name" validate:"required"`
}
```

Common tag consumers: `encoding/json`, GORM, validator libraries.

## Why no inheritance?

| OOP inheritance | Go composition |
|-----------------|----------------|
| Deep hierarchies | Flat structs + small interfaces |
| Fragile base class | Explicit embedding |
| Override surprises | Method sets are static |

Design with **small interfaces** and **compose** concrete types—see [Implicit Interfaces](/learning/go-implicit-interfaces).

← [Go MOC](/learning/go-master-moc)

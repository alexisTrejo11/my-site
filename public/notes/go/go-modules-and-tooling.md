# Go Modules and Tooling

> Modules are the unit of dependency management—`go.mod` declares your module path and requirements.

## Initialize a module

```bash
go mod init github.com/you/project
```

Creates `go.mod`:

```go
module github.com/you/project

go 1.22
```

## go.sum

Cryptographic checksums of module versions—commit `go.sum` to lock dependency integrity. `go mod verify` checks consistency.

## Essential commands

| Command | Purpose |
|---------|---------|
| `go build` | Compile package/binary |
| `go run .` | Build and run |
| `go test ./...` | Run tests |
| `go fmt ./...` | Format (gofmt) |
| `go vet ./...` | Static analysis |
| `go mod tidy` | Add/remove deps from imports |
| `go get pkg@v1.2.3` | Add or upgrade dependency |

## Vendoring

```bash
go mod vendor
```

Copies dependencies into `vendor/` for reproducible offline builds:

```bash
go build -mod=vendor
```

Use when CI/air-gapped environments require pinned source trees.

## Workspace mode (monorepos)

`go.work` ties multiple modules for local development without publishing pseudo-versions.

## Tooling ecosystem

- **golangci-lint** — aggregated linters
- **delve** — debugger (`dlv debug`)
- **pprof** — CPU/heap profiles built into runtime

← [Go MOC](/learning/go-master-moc) · Next: [Gin Framework Architecture](/learning/go-gin-framework-architecture)

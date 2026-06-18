# Namespaces and Projects

## Namespaces

Organize types and avoid name collisions:

```csharp
namespace MyApp.Users;

public class UserService { }
```

File-scoped namespace (C# 10+):

```csharp
namespace MyApp.Users;

public class UserDto { }
```

## Usings

```csharp
using System.Collections.Generic;
using MyApp.Users;

// or global usings in GlobalUsings.cs
```

## Solution layout (typical API)

```
MySolution/
├── MyApi/              # Web API entry
├── MyApi.Application/  # Use cases
├── MyApi.Domain/       # Entities, interfaces
└── MyApi.Infrastructure/ # DB, external services
```

Start simple (single project) until complexity warrants layers.

## Access modifiers

| Modifier | Scope |
|----------|-------|
| `public` | Anywhere |
| `internal` | Same assembly |
| `private` | Same class |

← [CSharp MOC](/learning/csharp-master-moc)

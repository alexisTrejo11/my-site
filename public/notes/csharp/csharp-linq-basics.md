# LINQ Basics

> **LINQ** (Language Integrated Query) queries collections with a SQL-like fluent API.

## Method syntax

```csharp
var users = new List<User> { /* ... */ };

var activeEmails = users
    .Where(u => u.IsActive)
    .OrderBy(u => u.LastName)
    .Select(u => u.Email)
    .ToList();
```

## Common operators

| Operator | Does |
|----------|------|
| `Where` | Filter |
| `Select` | Project / map |
| `OrderBy` / `OrderByDescending` | Sort |
| `FirstOrDefault` | First match or default |
| `Any` / `All` | Existential checks |
| `Count` | Count (or with predicate) |
| `GroupBy` | Group rows |

```csharp
var byRole = users.GroupBy(u => u.Role);
foreach (var group in byRole)
    Console.WriteLine($"{group.Key}: {group.Count()}");
```

## Deferred execution

LINQ on `IEnumerable` is **lazy** until you enumerate (`foreach`, `ToList()`).

## When to use

- In-memory collections in application code
- Readable pipelines instead of nested loops

For databases, use **EF Core** LINQ—which translates to SQL (different performance rules).

← [CSharp MOC](/learning/csharp-master-moc)

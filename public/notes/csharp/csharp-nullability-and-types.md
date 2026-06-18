# Nullability and Types

> **Nullable reference types** (NRT) help document whether `string` can be `null`—the compiler warns you when you forget checks.

## Nullable value types

Value types cannot be `null` unless wrapped:

```csharp
int? maybeCount = null;
if (maybeCount.HasValue)
    Console.WriteLine(maybeCount.Value);
```

## Nullable reference types

```csharp
#nullable enable

string name = "Ada";      // non-nullable
string? nickname = null;  // nullable
```

Compiler warns if you dereference something that might be null.

## Safe patterns

```csharp
// Null-coalescing
var display = nickname ?? "Anonymous";

// Null-conditional
var length = nickname?.Length;

// Pattern (C# 9+)
if (user is not null)
    SendEmail(user.Email);
```

## `is` and casting

```csharp
if (obj is string s)
    Console.WriteLine(s.ToUpper());

// Avoid unchecked casts when possible
var user = obj as User;
if (user != null) { ... }
```

For backend APIs, model optional fields explicitly (`string?`) instead of magic empty strings.

← [CSharp MOC](/learning/csharp-master-moc)

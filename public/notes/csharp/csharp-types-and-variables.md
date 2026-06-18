# Types and Variables

> C# is **statically typed**—the compiler knows types at build time. That catches many bugs before runtime.

## Common built-in types

| Category | Examples |
|----------|----------|
| Integers | `int`, `long`, `byte` |
| Floating | `float`, `double`, `decimal` (money) |
| Text | `string`, `char` |
| Logic | `bool` |
| Date/time | `DateTime`, `DateTimeOffset` |

```csharp
int count = 10;
double price = 19.99;
string name = "Alex";
bool active = true;
```

## Value vs reference types

| Value types | Reference types |
|-------------|-----------------|
| Stored on stack (conceptually) | Live on heap; variable holds a reference |
| `int`, `struct`, `enum` | `class`, `string`, arrays |
| Copy = full duplicate | Copy = same object reference |

```csharp
int a = 1;
int b = a;
b = 2;
// a is still 1

var list1 = new List<int> { 1, 2 };
var list2 = list1;
list2.Add(3);
// list1 now has 1, 2, 3 — shared reference
```

## Declaring variables

```csharp
var message = "Hello"; // compiler infers string
const int MaxItems = 100; // compile-time constant
```

Use `var` when the type is obvious from the right-hand side.

## String basics

```csharp
string full = $"{firstName} {lastName}"; // interpolation
string path = @"C:\logs\app.txt";         // verbatim string
```

← [CSharp MOC](/learning/csharp-master-moc)

# Arrays and Lists

## Arrays

Fixed size:

```csharp
int[] nums = { 1, 2, 3 };
int[] buffer = new int[10];
```

## List&lt;T&gt;

Dynamic size—default choice for ordered collections:

```csharp
var users = new List<string> { "Ada", "Lin" };
users.Add("Grace");
users.Remove("Lin");
users.Contains("Ada"); // true
```

## Common operations

```csharp
foreach (var u in users)
    Console.WriteLine(u);

for (int i = 0; i < users.Count; i++)
    Console.WriteLine(users[i]);

users.Sort();
users.Reverse();
```

## Read-only views

```csharp
IReadOnlyList<string> snapshot = users.AsReadOnly();
```

Expose `IReadOnlyList<T>` from APIs when callers should not mutate your internal list.

← [CSharp MOC](/learning/csharp-master-moc)

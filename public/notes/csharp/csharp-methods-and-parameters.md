# Methods and Parameters

## Basic method

```csharp
public int Add(int a, int b)
{
    return a + b;
}
```

## Optional and named arguments

```csharp
public void Log(string message, bool timestamp = true)
{
    // ...
}

Log("started");
Log("error", timestamp: false);
```

## `ref` and `out` (use sparingly)

| Keyword | Meaning |
|---------|---------|
| `ref` | Pass variable by reference; must be initialized |
| `out` | Caller expects method to assign a value |

```csharp
public bool TryParseId(string input, out int id)
{
    return int.TryParse(input, out id);
}
```

Prefer returning tuples or small result objects for clarity when learning:

```csharp
public (bool Success, int Id) ParseId(string input) { ... }
```

## Method overloading

Same name, different parameter lists:

```csharp
public void Print(int value) => Console.WriteLine(value);
public void Print(string value) => Console.WriteLine(value);
```

## Expression-bodied members

```csharp
public string FullName => $"{First} {Last}";
public int Double(int x) => x * 2;
```

← [CSharp MOC](/learning/csharp-master-moc)

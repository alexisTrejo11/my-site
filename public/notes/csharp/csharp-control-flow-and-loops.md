# Control Flow and Loops

## Conditionals

```csharp
if (score >= 90)
    grade = "A";
else if (score >= 80)
    grade = "B";
else
    grade = "C";

// Ternary
var label = isActive ? "ON" : "OFF";
```

## Switch (modern C#)

```csharp
switch (status)
{
    case "pending":
        ProcessPending();
        break;
    case "done":
        ProcessDone();
        break;
    default:
        throw new ArgumentException("Unknown status");
}
```

Pattern matching (intermediate—use when readable):

```csharp
var message = shape switch
{
    Circle c => $"Circle radius {c.Radius}",
    Rectangle r => $"Rectangle {r.Width}x{r.Height}",
    _ => "Unknown shape"
};
```

## Loops

```csharp
for (int i = 0; i < items.Count; i++)
    Console.WriteLine(items[i]);

foreach (var item in items)
    Console.WriteLine(item);

while (retry < 3)
{
    retry++;
}
```

**Prefer `foreach`** over index loops when you don't need the index.

## Jump statements

- `break` — exit loop/switch
- `continue` — next iteration
- `return` — exit method

← [CSharp MOC](/learning/csharp-master-moc)

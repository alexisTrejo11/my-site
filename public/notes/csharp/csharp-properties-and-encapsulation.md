# Properties and Encapsulation

> **Properties** are C#'s idiomatic way to expose data with optional validation—prefer them over public fields.

## Auto-properties

```csharp
public class Product
{
    public string SKU { get; set; } = "";
    public decimal Price { get; private set; }

    public void UpdatePrice(decimal price)
    {
        if (price < 0) throw new ArgumentOutOfRangeException();
        Price = price;
    }
}
```

## Full properties

```csharp
private string _name = "";

public string Name
{
    get => _name;
    set => _name = value?.Trim() ?? "";
}
```

## Init-only (C# 9+)

```csharp
public record Order
{
    public Guid Id { get; init; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}
```

## Encapsulation goal

| Public API | Hide internally |
|------------|-----------------|
| Properties with validation | Raw fields |
| Methods that enforce rules | Direct state mutation from outside |

← [CSharp MOC](/learning/csharp-master-moc)

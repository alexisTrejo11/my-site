# Classes and Objects

```csharp
public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;

    public User(int id, string email)
    {
        Id = id;
        Email = email;
    }

    public void Greet()
    {
        Console.WriteLine($"Hello, {Email}");
    }
}

var user = new User(1, "ada@example.com");
user.Greet();
```

## Instance vs static

```csharp
public static class MathUtil
{
    public static int Clamp(int value, int min, int max) =>
        value < min ? min : value > max ? max : value;
}
```

Static members belong to the **type**, not an instance.

## `this`

Refers to the current instance—useful in constructors or fluent APIs:

```csharp
public User SetEmail(string email)
{
    Email = email;
    return this;
}
```

← [CSharp MOC](/learning/csharp-master-moc)

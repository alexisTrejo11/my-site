# Inheritance and Polymorphism

## Base and derived classes

```csharp
public class Animal
{
    public virtual void Speak() => Console.WriteLine("...");
}

public class Dog : Animal
{
    public override void Speak() => Console.WriteLine("Woof");
}
```

| Keyword | Purpose |
|---------|---------|
| `virtual` | Method can be overridden |
| `override` | Replace base implementation |
| `sealed` | Prevent further override |

## Calling base

```csharp
public class Employee : Person
{
    public Employee(string name) : base(name) { }
}
```

## Polymorphism

```csharp
Animal a = new Dog();
a.Speak(); // Woof — runtime type decides
```

Use inheritance for **true is-a** relationships. Prefer **composition** when behavior is shared without hierarchy (inject services, use interfaces).

← [CSharp MOC](/learning/csharp-master-moc) · Next: [Interfaces and Abstract Classes](/learning/csharp-interfaces-and-abstract-classes)

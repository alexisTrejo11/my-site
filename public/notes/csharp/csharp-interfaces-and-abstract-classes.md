# Interfaces and Abstract Classes

## Interfaces

Contract without implementation (before C# 8; now can have defaults):

```csharp
public interface IEmailSender
{
    Task SendAsync(string to, string subject, string body);
}

public class SmtpEmailSender : IEmailSender
{
    public async Task SendAsync(string to, string subject, string body)
    {
        // implementation
    }
}
```

Register in DI: `services.AddScoped<IEmailSender, SmtpEmailSender>();`

## Abstract classes

Shared base with partial implementation:

```csharp
public abstract class RepositoryBase<T>
{
    protected readonly DbContext Context;

    protected RepositoryBase(DbContext context) => Context = context;

    public abstract Task<T?> GetByIdAsync(int id);
}
```

## When to use which

| Interface | Abstract class |
|-----------|----------------|
| Capability / role (`IRepository`) | Shared base state + hooks |
| Multiple per class | Single inheritance chain |
| Testing with mocks | Template method pattern |

← [CSharp MOC](/learning/csharp-master-moc)

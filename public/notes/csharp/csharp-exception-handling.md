# Exception Handling

```csharp
try
{
    var user = await repository.GetByIdAsync(id);
    if (user is null)
        throw new NotFoundException($"User {id} not found");
}
catch (NotFoundException ex)
{
    return Results.NotFound(ex.Message);
}
catch (Exception ex)
{
    logger.LogError(ex, "Unexpected error");
    return Results.Problem("Internal error");
}
finally
{
    // optional cleanup — runs always
}
```

## Custom exceptions

```csharp
public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
}
```

## Guidelines (backend)

| Do | Avoid |
|----|-------|
| Catch specific exceptions | Empty `catch { }` |
| Log with context | Using exceptions for normal flow |
| Map to HTTP status in API layer | Leaking stack traces to clients |

← [CSharp MOC](/learning/csharp-master-moc)

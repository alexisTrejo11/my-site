# .NET CLI Essentials

## Create and run

```bash
dotnet new webapi -n MyApi
cd MyApi
dotnet run
```

## Common commands

| Command | Purpose |
|---------|---------|
| `dotnet build` | Compile |
| `dotnet run` | Build + run |
| `dotnet test` | Run test project |
| `dotnet add package Newtonsoft.Json` | Add NuGet package |
| `dotnet restore` | Restore dependencies |
| `dotnet publish -c Release` | Publish deployable output |

## Project file snippet

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>
```

## Packages

NuGet = .NET package manager (like npm for Node, pip for Python).

```bash
dotnet add package Serilog.AspNetCore
```

← [CSharp MOC](/learning/csharp-master-moc)

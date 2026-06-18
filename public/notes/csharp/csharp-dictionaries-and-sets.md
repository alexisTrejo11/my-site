# Dictionaries and Sets

## Dictionary&lt;TKey, TValue&gt;

Key → value lookup (hash table):

```csharp
var scores = new Dictionary<string, int>
{
    ["ada"] = 100,
    ["lin"] = 95
};

if (scores.TryGetValue("ada", out int score))
    Console.WriteLine(score);

scores["bob"] = 88;
```

## HashSet&lt;T&gt;

Unique unordered items—fast `Contains`:

```csharp
var tags = new HashSet<string> { "api", "backend" };
tags.Add("api");   // ignored — duplicate
tags.Add("csharp");
```

## Choosing a structure

| Need | Type |
|------|------|
| Lookup by key | `Dictionary<K,V>` |
| Unique items, membership tests | `HashSet<T>` |
| Ordered list with duplicates | `List<T>` |

← [CSharp MOC](/learning/csharp-master-moc) · Next: [LINQ Basics](/learning/csharp-linq-basics)

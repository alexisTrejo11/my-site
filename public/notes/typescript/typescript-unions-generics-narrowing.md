# Unions, Generics, and Type Narrowing

## Union types

Value can be one of several types:

```typescript
type Status = "pending" | "done" | "failed";

function printId(id: string | number) {
  console.log(id);
}
```

## Type narrowing

```typescript
function format(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

Discriminated unions (common in API responses):

```typescript
type ApiResponse =
  | { success: true; data: User }
  | { success: false; error: string };

function handle(res: ApiResponse) {
  if (res.success) {
    console.log(res.data.email);
  } else {
    console.error(res.error);
  }
}
```

## Generics (intro)

Reuse logic across types:

```typescript
function first<T>(items: T[]): T | undefined {
  return items[0];
}

interface Repository<T> {
  getById(id: number): Promise<T | null>;
}
```

Start simple—add generics when you see duplicated type-specific functions.

## `as` assertions (use rarely)

```typescript
const el = document.getElementById("app") as HTMLDivElement;
```

Prefer narrowing; assertions bypass safety.

← [JS TS MOC](/learning/javascript-master-moc)

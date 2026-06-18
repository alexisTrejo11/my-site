# Basic Types and Interfaces

> TypeScript adds **compile-time** types to JavaScript—errors show in the editor before you run code.

## Primitive annotations

```typescript
let count: number = 0;
let name: string = "Ada";
let active: boolean = true;
let ids: number[] = [1, 2, 3];
let tags: Array<string> = ["api"];
```

## Type inference

```typescript
const port = 8080; // inferred number — often skip explicit type
```

## Interfaces

Describe object shapes:

```typescript
interface User {
  id: number;
  email: string;
  isActive?: boolean; // optional
}

const user: User = {
  id: 1,
  email: "ada@example.com",
};
```

## Type aliases

```typescript
type UserId = number;
type Result<T> = { ok: true; data: T } | { ok: false; error: string };
```

Use `interface` for object contracts; `type` for unions and utilities.

## Functions

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}

const add = (a: number, b: number): number => a + b;
```

← [JS TS MOC](/learning/javascript-master-moc)

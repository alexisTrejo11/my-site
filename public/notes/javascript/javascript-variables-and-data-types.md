# Variables and Data Types

> JavaScript is **dynamically typed**—variables don't declare a fixed type; the value carries the type at runtime.

## Declaring variables

```javascript
const maxRetries = 3;   // cannot reassign
let count = 0;          // block-scoped, can reassign
// avoid var in new code — function-scoped, hoisting quirks
```

**Default:** use `const` unless you need to reassign, then `let`.

## Primitive types

| Type | Example |
|------|---------|
| `string` | `"hello"` |
| `number` | `42`, `3.14` |
| `boolean` | `true` |
| `undefined` | missing value |
| `null` | intentional empty |
| `bigint` | `100n` |
| `symbol` | unique identifiers (advanced) |

```javascript
typeof "hi"      // "string"
typeof null      // "object" (historical quirk)
```

## Truthy and falsy

Falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`.

```javascript
if (user) { /* runs if user is truthy */ }
const name = input || "Guest";
const label = input ?? "N/A"; // nullish coalescing — only null/undefined
```

## Template literals

```javascript
const msg = `Hello, ${user.name}!`;
```

← [JS TS MOC](/learning/javascript-master-moc)

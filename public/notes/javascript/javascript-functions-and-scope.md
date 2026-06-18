# Functions and Scope

## Function declarations

```javascript
function add(a, b) {
  return a + b;
}
```

## Arrow functions

```javascript
const double = (n) => n * 2;
const sum = (a, b) => a + b;

users.forEach((u) => console.log(u.email));
```

Arrows don't have their own `this`—they inherit from enclosing scope (important in classes vs callbacks).

## Parameters

```javascript
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

function log(...args) {
  console.log(...args);
}
```

## Scope

| Scope | Created by |
|-------|------------|
| Block | `{ }` with `let` / `const` |
| Function | `function` body |
| Module | ES module file (top level) |

## Closures (medium concept, used daily)

A function remembers variables from where it was defined:

```javascript
function makeCounter() {
  let n = 0;
  return () => ++n;
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
```

Useful for private state and factory functions.

← [JS TS MOC](/learning/javascript-master-moc)

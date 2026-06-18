# Event Loop Basics

> You don't need V8 internals yet—just know **why** `setTimeout(fn, 0)` doesn't run immediately and why order matters.

## Call stack

Synchronous code runs line by line on the **call stack**. One thread executes your JS (in Node and browser main thread).

## Web APIs / Node APIs

`setTimeout`, `fetch`, `fs.readFile` hand work to the environment. When done, callbacks join **queues**.

## Microtasks vs macrotasks (simplified)

| Queue | Examples |
|-------|------------|
| **Microtask** | Promise `.then`, `await` continuations |
| **Macrotask** | `setTimeout`, I/O callbacks |

After each macrotask, the runtime drains **all** microtasks.

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");
// Output: 1, 4, 3, 2
```

## Practical takeaway

- Don't block the main thread with heavy CPU loops
- Use `async` I/O for network and disk
- Understand Promise order when debugging race conditions

← [JS TS MOC](/learning/javascript-master-moc)

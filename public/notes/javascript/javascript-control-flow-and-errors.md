# Control Flow and Error Handling

## Conditionals and loops

```javascript
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else {
  grade = "C";
}

for (const item of items) {
  console.log(item);
}

for (const [key, value] of Object.entries(map)) {
  console.log(key, value);
}
```

## switch

```javascript
switch (status) {
  case "pending":
    handlePending();
    break;
  case "done":
    handleDone();
    break;
  default:
    throw new Error(`Unknown status: ${status}`);
}
```

## Errors

```javascript
try {
  const data = JSON.parse(raw);
} catch (err) {
  console.error(err.message);
} finally {
  cleanup();
}

throw new Error("Invalid input");
```

Custom errors:

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
```

← [JS TS MOC](/learning/javascript-master-moc) · Next: [Callbacks and Promises](/learning/javascript-callbacks-and-promises)

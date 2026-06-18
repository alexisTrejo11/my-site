# Callbacks and Promises

> JavaScript is **non-blocking**—I/O uses callbacks or Promises instead of freezing the thread.

## Callback style (legacy pattern)

```javascript
function fetchUser(id, callback) {
  setTimeout(() => {
    if (!id) return callback(new Error("missing id"));
    callback(null, { id, name: "Ada" });
  }, 100);
}

fetchUser(1, (err, user) => {
  if (err) return console.error(err);
  console.log(user);
});
```

**Callback hell** — nested callbacks become hard to read → Promises fix this.

## Promises

A Promise is **pending → fulfilled or rejected**:

```javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (!id) return reject(new Error("missing id"));
    resolve({ id, name: "Ada" });
  });
}

fetchUser(1)
  .then((user) => console.log(user))
  .catch((err) => console.error(err))
  .finally(() => console.log("done"));
```

## Chaining

```javascript
fetchUser(1)
  .then((user) => fetchOrders(user.id))
  .then((orders) => orders.length)
  .then((count) => console.log(count));
```

## Promise utilities

```javascript
await Promise.all([fetchUser(1), fetchUser(2)]);
await Promise.race([slow(), timeout(5000)]);
```

← [JS TS MOC](/learning/javascript-master-moc) · Next: [Async Await](/learning/javascript-async-await)

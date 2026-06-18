# Async and Await

> `async`/`await` is **syntactic sugar** over Promises—easier to read sequential async code.

## Basic usage

```javascript
async function loadDashboard(userId) {
  try {
    const user = await fetchUser(userId);
    const orders = await fetchOrders(user.id);
    return { user, orders };
  } catch (err) {
    console.error("Dashboard failed", err);
    throw err;
  }
}
```

`async` functions **always return a Promise**.

## Parallel work

Sequential (slow if independent):

```javascript
const a = await fetchA();
const b = await fetchB();
```

Parallel:

```javascript
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

## In Express / Node handlers

```javascript
app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
```

Always forward errors to middleware—unhandled rejections crash the process.

← [JS TS MOC](/learning/javascript-master-moc)

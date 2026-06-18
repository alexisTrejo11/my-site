# Objects and Arrays

## Objects

```javascript
const user = {
  id: 1,
  email: "ada@example.com",
  isActive: true,
};

user.email = "ada@dev.com";
user["role"] = "admin";

const { email, id } = user; // destructuring
const updated = { ...user, role: "admin" }; // shallow copy + override
```

## Arrays

```javascript
const nums = [1, 2, 3];
nums.push(4);

nums.map((n) => n * 2);        // [2, 4, 6, 8]
nums.filter((n) => n > 2);     // [3, 4]
nums.find((n) => n === 2);     // 2
nums.reduce((acc, n) => acc + n, 0); // 10
```

## JSON

```javascript
const json = JSON.stringify(user);
const parsed = JSON.parse(json);
```

Common in REST APIs—dates become strings unless you revive them.

## Optional chaining

```javascript
const city = user.address?.city;
```

← [JS TS MOC](/learning/javascript-master-moc)

# 🍳 Java Practical Examples

> Real-world examples inspired by cooking and cuisine to master OOP concepts

## 1. Classes & Objects - The Recipe & Dishes

```java
// Class = The Recipe (blueprint)
// Object = A prepared Dish (instance)

class PastaRecipe {
    String name;
    List<String> ingredients;
    int cookingTime;
    
    PastaRecipe(String name, List<String> ingredients, int cookingTime) {
        this.name = name;
        this.ingredients = ingredients;
        this.cookingTime = cookingTime;
    }
    
    void cook() {
        System.out.println("🍝 Cooking " + name + " for " + cookingTime + " minutes...");
    }
}

// Create objects (prepare dishes)
PastaRecipe Carbonara = new PastaRecipe(
    "Carbonara", 
    List.of("pasta", "eggs", "bacon", "cheese"),
    20
);

Carbonara.cook(); // Output: 🍝 Cooking Carbonara for 20 minutes...
```

---

## 2. Encapsulation - The Kitchen Chef

```java
// Encapsulation = Protecting the kitchen from unauthorized access

class Chef {
    private String secretIngredient;  // Private = hidden
    
    Chef(String secretIngredient) {
        this.secretIngredient = secretIngredient;
    }
    
    // Controlled access through methods
    public String addSecretSpice() {
        return secretIngredient + " added!";
    }
    
    public String getSecretSpice() {
        return "🔒 Secret recipe protected";
    }
}

Chef myChef = new Chef("Mysterious Spice");
myChef.addSecretSpice();  // ✅ Works
// myChef.secretIngredient  ❌ compilation error - private!
```

---

## 3. Inheritance - Italian Cuisine Hierarchy

```java
// Parent class
class ItalianDish {
    String name;
    
    ItalianDish(String name) {
        this.name = name;
    }
    
    void serve() {
        System.out.println("🍽️ Serving " + name);
    }
}

// Child class extending parent
class Pizza extends ItalianDish {
    String topping;
    
    Pizza(String name, String topping) {
        super(name);  // Call parent constructor
        this.topping = topping;
    }
    
    @Override
    void serve() {
        System.out.println("🍕 Pizza " + name + " with " + topping + " served!");
    }
}

// Usage
ItalianDish margherita = new Pizza("Margherita", "mozzarella");
margherita.serve();  // Output: 🍕 Pizza Margherita with mozzarella served!
```

---

## 4. Polymorphism - Many Dishes, One Method

```java
interface Dish {
    void prepare();
}

class Salad implements Dish {
    @Override
    public void prepare() {
        System.out.println("🥗 Washing and cutting vegetables...");
    }
}

class Steak implements Dish {
    @Override
    public void prepare() {
        System.out.println("🥩 Grilling the meat...");
    }
}

class Sushi implements Dish {
    @Override
    public void prepare() {
        System.out.println("🍣 Preparing fresh fish...");
    }
}

// One method, many implementations
public static void prepareMenu(Dish dish) {
    dish.prepare();
}

// Usage
prepareMenu(new Salad());   // Output: 🥗 Washing and cutting vegetables...
prepareMenu(new Steak());   // Output: 🥩 Grilling the meat...
prepareMenu(new Sushi());   // Output: 🍣 Preparing fresh fish...
```

---

## 5. Abstraction - The Restaurant Menu

```java
// Abstract class = Menu template (can't instantiate directly)

abstract class MenuItem {
    String name;
    double price;
    
    MenuItem(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    abstract void prepare();  // Abstract method - no implementation
    
    void display() {
        System.out.println(name + " - $" + price);
    }
}

class Dessert extends MenuItem {
    Dessert(String name, double price) {
        super(name, price);
    }
    
    @Override
    void prepare() {
        System.out.println("🍰 Preparing dessert...");
    }
}

// Usage
MenuItem tiramisu = new Dessert("Tiramisu", 8.50);
tiramisu.display();   // Output: Tiramisu - $8.5
tiramisu.prepare();  // Output: 🍰 Preparing dessert...
```

---

## 6. Composition Over Inheritance - The Restaurant Team

```java
class Ingredient {
    String name;
    
    Ingredient(String name) {
        this.name = name;
    }
}

class Dish {
    String name;
    List<Ingredient> ingredients = new ArrayList<>();  // Composition
    
    Dish(String name) {
        this.name = name;
    }
    
    void addIngredient(Ingredient ingredient) {
        ingredients.add(ingredient);
    }
    
    void showIngredients() {
        System.out.println("📋 Ingredients for " + name + ":");
        ingredients.forEach(i -> System.out.println("  - " + i.name));
    }
}

// Usage
Dish pasta = new Dish("Spaghetti");
pasta.addIngredient(new Ingredient("Pasta"));
pasta.addIngredient(new Ingredient("Tomato Sauce"));
pasta.addIngredient(new Ingredient("Basil"));

pasta.showIngredients();
// Output:
// 📋 Ingredients for Spaghetti:
//   - Pasta
//   - Tomato Sauce
//   - Basil
```

---

## 7. Interface - The Waiter Service

```java
interface RestaurantService {
    void takeOrder();
    void serveDish();
    void processPayment();
}

class Waiter implements RestaurantService {
    @Override
    public void takeOrder() {
        System.out.println("👨‍🍳 Taking your order...");
    }
    
    @Override
    public void serveDish() {
        System.out.println("🍽️ Here is your dish!");
    }
    
    @Override
    public void processPayment() {
        System.out.println("💳 Payment processed!");
    }
}

// Usage
RestaurantService waiter = new Waiter();
waiter.takeOrder();      // Output: 👨‍🍳 Taking your order...
waiter.serveDish();      // Output: 🍽️ Here is your dish!
waiter.processPayment(); // Output: 💳 Payment processed!
```

---

## Quick References

| Concept | Cooking Analogy | Key Word |
| --------- | -------------- | -------- |
| Class | Recipe | `class` |
| Object | Prepared Dish | `new` |
| Encapsulation | Kitchen Rules | `private` |
| Inheritance | Italian Cuisine | `extends` |
| Polymorphism | Many Recipes | `@Override` |
| Abstraction | Menu Template | `abstract` |
| Interface | Waiter Service | `implements` |

---

## Related Notes

- [Java Overview](/learning/java-overview) - Language overview and fundamentals
- [Java JVM Internals](/learning/java-jvm-internals) - How Java executes (bytecode, GC)
- [Java Best Practices](/learning/java-best-practices) - Clean code guidelines
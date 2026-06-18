# 🍽️ Java Best Practices

> Chef-quality code using cooking analogies

---

## 1. Streams vs Traditional Loops

### 🍳 Traditional Loop (The Old Recipe)

```java
// Old way - like cooking over open fire
List<String> dishes = getDishes();
List<String> veganDishes = new ArrayList<>();

for (Iterator<String> it = dishes.iterator(); it.hasNext(); ) {
    String dish = it.next();
    if (dish.isVegan()) {
        veganDishes.add(dish);
    }
}
```

| ✅ Pros | ❌ Cons |
|--------|--------|
| Simple, familiar to all devs | Verbose, hard to read |
| Easy to debug | Cannot parallelize easily |
| Works everywhere | Must manage iterator manually |

---

### 🚀 Stream API (Modern Kitchen)

```java
// New way - like using a smart oven
List<String> veganDishes = getDishes().stream()
    .filter(Dish::isVegan)
    .collect(Collectors.toList());

// Parallel for large datasets - like having multiple chefs
List<String> veganDishes = getDishes().parallelStream()
    .filter(Dish::isVegan)
    .collect(Collectors.toList());
```

| ✅ Pros | ❌ Cons |
|--------|--------|
| Concise and readable | Small datasets add overhead |
| Parallel processing easy | Debugging can be tricky |
| Functional, no mutations | Not always intuitive |
| Chain operations beautifully | Performance can vary |

---

### 🍽️ Practical Examples with Cooking

```java
// Get all vegetarian dish names sorted by price
List<String> names = menu.stream()
    .filter(Dish::isVegetarian)
    .map(Dish::getName)
    .sorted(Comparator.naturalOrder())
    .collect(Collectors.toList());

// Count dishes by cuisine type
Map<String, Long> countByCuisine = menu.stream()
    .collect(Collectors.groupingBy(
        Dish::getCuisine,
        Collectors.counting()
    ));

// Find the cheapest dish
Optional<Dish> cheapest = menu.stream()
    .min(Comparator.comparing(Dish::getPrice));

// Get top 3 most expensive dishes
List<Dish> top3 = menu.stream()
    .sorted(Comparator.comparing(Dish::getPrice).reversed())
    .limit(3)
    .collect(Collectors.toList());
```

---

## 2. Naming Conventions 🍴

### Class Names (Dishes)

```java
// ✅ Good - describes the recipe
class PastaCarbonara {}
class GrilledSalmon {}

// ❌ Bad - too vague, not descriptive
class Food {}
class Stuff {}
```

### Method Names (Actions)

```java
// ✅ Good - verb + description
void prepareDish() {}
String getIngredientName() {}
void addSpice(Spice spice) {}

// ❌ Bad - too short, unclear
void doIt() {}
void get() {}
```

### Variable Names (Ingredients)

```java
// ✅ Good - descriptive
List<Pasta> italianPastaDishes = new ArrayList<>();
int cookingTimeMinutes = 30;

// ❌ Bad - single letters (except loop counters)
List<P> p = new ArrayList<>();
int n = 30;
```

### Constants (Secret Recipes)

```java
// ✅ Good - UPPER_SNAKE_CASE
private static final int MAX_COOKING_TIME = 3600;
private static final String DEFAULT_CUISINE = "Italian";

// ❌ Bad
private static final int maxtime = 3600;
```

---

## 3. Null Pointer Exception (NPE) Prevention 🥗

### ❌ Never Do This

```java
// This will throw NPE!
String dish = getDish();
dish.toLowerCase();  // NPE if dish is null
```

### ✅ Better: Null Check

```java
String dish = getDish();
if (dish != null) {
    dish.toLowerCase();
}
```

### ✅ Good: Optional (The Safety Net)

```java
// Like having a backup dish
Optional<String> dish = Optional.ofNullable(getDish());
dish.map(String::toLowerCase).orElse("No dish");

// With default value
String dishName = getDishOptional()
    .orElse("Daily Special");
```

### 🍽️ NPE Prevention Patterns

```java
// Pattern 1: Optional for return types
public Optional<Dish> findDish(String name) {
    return menu.stream()
        .filter(d -> d.getName().equals(name))
        .findFirst();
}

// Pattern 2: Optional with orElseGet (lazy)
String name = findDish("Pasta")
    .orElseGet(() -> createDailySpecial());

// Pattern 3: Optional chaining
String result = findDish("Salad")
    .filter(Dish::isAvailable)
    .map(Dish::getName)
    .orElse("Not available");

// Pattern 4: isPresent() check
Optional<Dish> dish = findDish("Pasta");
if (dish.isPresent()) {
    System.out.println(dish.get().getPrice());
}

// Pattern 5: orElseThrow for required values
String name = findDish("Pasta")
    .orElseThrow(() -> new DishNotFoundException("Pasta not found!"));
```

---

## 4. Builder Pattern (The Kitchen Builder) 👷

```java
// Instead of many constructors
class Dish {
    private String name;
    private List<String> ingredients;
    private int price;
    private boolean vegetarian;
    
    // Builder inner class
    public static class Builder {
        private String name;
        private List<String> ingredients = new ArrayList<>();
        private int price = 0;
        private boolean vegetarian = false;
        
        public Builder name(String name) {
            this.name = name;
            return this;
        }
        
        public Builder ingredients(List<String> ingredients) {
            this.ingredients = ingredients;
            return this;
        }
        
        public Builder price(int price) {
            this.price = price;
            return this;
        }
        
        public Builder vegetarian(boolean vegetarian) {
            this.vegetarian = vegetarian;
            return this;
        }
        
        public Dish build() {
            return new Dish(this);
        }
    }
}

// Usage - like building a custom dish
Dish carbonara = new Dish.Builder()
    .name("Carbonara")
    .ingredients(List.of("pasta", "eggs", "bacon", "cheese"))
    .price(15)
    .vegetarian(false)
    .build();
```

---

## 5. Records (The Menu Card) 📋

```java
// Simple immutable data holder (Java 16+)
record DishRecord(
    String name,
    List<String> ingredients,
    int price,
    boolean vegetarian
) {}

// Usage - like reading a menu
DishRecord salad = new DishRecord(
    "Caesar Salad",
    List.of("lettuce", "croutons", "cheese"),
    10,
    true
);

// Automatically gets:
// - Constructors
// - equals(), hashCode()
// - toString()
// - Getters: name(), ingredients(), price(), vegetarian()
```

---

## 6. Code Organization (Kitchen Layout) 🏠

### File Structure

```
src/
├── main/
│   └── java/
│       └── com/
│           └── restaurant/
│               ├── Main.java                 # Entry point
│               ├── model/                   # Recipes (data)
│               │   ├── Dish.java
│               │   ├── Ingredient.java
│               │   └── Menu.java
│               ├── service/                # Chefs (logic)
│               │   ├── KitchenService.java
│               │   └── OrderService.java
│               └── util/                  # Tools
│                   └── CookingUtils.java
```

### Class Organization

```java
// 1. Package declaration
package com.restaurant.model;

// 2. Imports
import java.util.List;
import java.util.ArrayList;

// 3. Class javadoc
/** Represents a dish in the restaurant. */
public class Dish {
    // 4. Constants
    private static final int MAX_PORTIONS = 100;
    
    // 5. Fields
    private String name;
    private List<Ingredient> ingredients;
    
    // 6. Constructors
    public Dish() {}
    public Dish(String name) { this.name = name; }
    
    // 7. Methods (public first)
    public void prepare() {}
    
    // 8. Getters/Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

---

## 7. Best Practices Summary 📝

| Category | ✅ Do | ❌ Don't |
|----------|------|----------|
| **Nulls** | Use `Optional` | Don't chain without null checks |
| **Streams** | Use for transformations | Don't use for everything |
| **Naming** | Be descriptive | Don't use single letters |
| **Classes** | Single responsibility | Don't create god classes |
| **Methods** | Small, focused | Don't create 100-line methods |
| **Imports** | Explicit | Don't use `.*` |
| **Constants** | Static final | Don't use magic numbers |
| **Collections** | Program to interfaces | Don't use concrete types |

---

## 🔗 Related Notes

- [Java Overview](/learning/java-overview) - Language fundamentals
- [Java JVM Internals](/learning/java-jvm-internals) - Memory and execution
- [Java Practical Examples](/learning/java-practical-examples) - OOP examples with cuisine theme
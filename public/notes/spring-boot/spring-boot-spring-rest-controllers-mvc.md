# REST Controllers & MVC

> Spring MVC maps HTTP requests to controller methods. **`@RestController`** = `@Controller` + `@ResponseBody` — every return value is serialized to JSON (by default).

---

## Basic Controller

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse create(@RequestBody @Valid UserCreateRequest request) {
        return userService.create(request);
    }

    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Long id, @RequestBody @Valid UserUpdateRequest request) {
        return userService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
```

---

## Mapping Cheat Sheet

| Annotation | Purpose |
|------------|---------|
| `@GetMapping` | HTTP GET |
| `@PostMapping` | HTTP POST |
| `@PutMapping` | HTTP PUT (full replace) |
| `@PatchMapping` | HTTP PATCH (partial) |
| `@DeleteMapping` | HTTP DELETE |
| `@RequestBody` | Deserialize JSON body |
| `@PathVariable` | URI segment `/users/{id}` |
| `@RequestParam` | Query `?page=0&size=20` |
| `@RequestHeader` | Header value |
| `@Valid` | Trigger Bean Validation |

```java
@GetMapping
public Page<UserResponse> list(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(required = false) String search
) {
    return userService.search(search, PageRequest.of(page, size));
}
```

---

## DTO Pattern (Never Expose Entities)

```java
public record UserCreateRequest(
    @NotBlank String name,
    @Email String email,
    @Size(min = 8) String password
) {}

public record UserResponse(Long id, String name, String email, boolean active) {}

@Service
public class UserService {
    public UserResponse create(UserCreateRequest req) {
        User user = new User(req.name(), req.email(), passwordEncoder.encode(req.password()));
        User saved = repository.save(user);
        return new UserResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.isActive());
    }
}
```

**Combat tip:** Password hash never appears on `UserResponse` — security by schema design (same idea as FastAPI/Pydantic).

---

## Content Negotiation

```java
@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
public UserResponse getJson(@PathVariable Long id) { ... }

@GetMapping(value = "/{id}/export", produces = "text/csv")
public ResponseEntity<byte[]> exportCsv(@PathVariable Long id) {
    byte[] csv = userService.exportCsv(id);
    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users.csv")
        .body(csv);
}
```

Client sends `Accept: application/json` — Spring picks the best handler/`HttpMessageConverter`.

---

## `ResponseEntity` — Full Control

```java
@GetMapping("/{id}")
public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
    return userService.findById(id)
        .map(user -> ResponseEntity.ok().cacheControl(CacheControl.maxAge(60, TimeUnit.SECONDS)).body(user))
        .orElse(ResponseEntity.notFound().build());
}
```

---

## Validation Errors (Before Controller Advice)

```java
public record ValidationErrorResponse(
    Instant timestamp,
    int status,
    String error,
    Map<String, String> fieldErrors
) {}

// Handled globally — see [Global Exception Handling](/learning/spring-boot-spring-global-exception-handling)
```

---

## Senior Controller Structure

```java
// Thin controller — orchestration only
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse placeOrder(@RequestBody @Valid PlaceOrderRequest request,
                                    @AuthenticationPrincipal UserPrincipal principal) {
        return orderService.placeOrder(request, principal.getUserId());
    }
}
```

Business rules live in **services**, not controllers.

---

## Combat Tips

### ✅ DO
- Version APIs: `/api/v1/`
- Use `Page` / `Slice` for collections
- Return `201` + `Location` header on create (optional with `ServletUriComponentsBuilder`)

### ❌ DON'T
- Don't put `@Transactional` on controllers
- Don't return `null` — use `Optional` + 404
- Don't use `GET` for state-changing operations

---

## Related Notes
- [Global Exception Handling](/learning/spring-boot-spring-global-exception-handling) — Centralized errors
- [Spring Security Architecture](/learning/spring-boot-spring-security-architecture) — Securing endpoints
- [Testing Slice Annotations](/learning/spring-boot-spring-testing-slices) — `@WebMvcTest`

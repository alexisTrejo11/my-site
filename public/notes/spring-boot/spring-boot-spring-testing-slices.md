# Testing & Slice Annotations

> Not every test needs the full application context. **Slice tests** load only the layer you care about — faster CI, clearer failures.

---

## Testing Pyramid in Spring

```text
        /\
       /  \     Few @SpringBootTest (full integration)
      /----\
     /      \   Some @WebMvcTest / @DataJpaTest
    /--------\
   /          \ Many plain unit tests (no Spring)
  /____________\
```

---

## Plain Unit Tests (Fastest)

```java
class PricingServiceTest {

  private final PricingService service = new PricingService(new FixedDiscountPolicy());

  @Test
  void appliesTenPercentDiscount() {
    Money result = service.calculate(new Money("100.00"), DiscountCode.SAVE10);
    assertThat(result).isEqualTo(new Money("90.00"));
  }
}
```

No Spring context — pure JUnit 5 + AssertJ.

---

## `@SpringBootTest` — Full Integration

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class OrderIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void createsOrderEndToEnd() {
        var request = new PlaceOrderRequest(1L, List.of(new LineItem(2L, 3)));
        ResponseEntity<OrderResponse> response =
            restTemplate.postForEntity("/api/v1/orders", request, OrderResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(orderRepository.findById(response.getBody().id())).isPresent();
    }
}
```

**Heavy** — loads entire context. Use for critical paths, not every branch.

---

## `@WebMvcTest` — Controller Slice

```java
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void returnsUser() throws Exception {
        when(userService.findById(1L)).thenReturn(new UserResponse(1L, "Alex", "a@b.com", true));

        mockMvc.perform(get("/api/v1/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Alex"));
    }

    @Test
    void returns404WhenMissing() throws Exception {
        when(userService.findById(99L)).thenThrow(new UserNotFoundException(99L));

        mockMvc.perform(get("/api/v1/users/99"))
            .andExpect(status().isNotFound());
    }
}
```

Only MVC layer + mocked collaborators. **No database.**

---

## `@DataJpaTest` — Persistence Slice

```java
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // use Testcontainers PG
class UserRepositoryTest {

    @Autowired
    private UserRepository repository;

    @Test
    void findsByEmail() {
        repository.save(new User("Alex", "alex@example.com"));
        Optional<User> found = repository.findByEmail("alex@example.com");
        assertThat(found).isPresent();
    }
}
```

Loads JPA + in-memory or Testcontainers DB — **no web layer**.

---

## `@MockBean` vs `@Mock`

| | `@Mock` (Mockito) | `@MockBean` |
|---|-------------------|-------------|
| **Context** | Unit test | Spring test |
| **Replaces** | Local variable | Spring bean in context |

---

## Testcontainers (Production-Like DB)

```java
@SpringBootTest
@Testcontainers
class UserRepositoryIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

    @DynamicPropertySource
    static void configure(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
}
```

---

## `@Transactional` on Tests

```java
@SpringBootTest
@Transactional
class OrderServiceTest {
    // Rolls back after each test — no dirty data
}
```

---

## Combat Tips

### ✅ DO
- Prefer slices over full context when possible
- Use AssertJ for readable assertions
- Test security with `@WithMockUser` or `@AutoConfigureMockMvc(addFilters = false)` when isolating controllers

### ❌ DON'T
- Don't `@SpringBootTest` every service method
- Don't share mutable state between tests
- Don't mock what you don't own without adapter tests

---

## Related Notes
- [REST Controllers and MVC](/learning/spring-boot-spring-rest-controllers-mvc) — Controllers under test
- [JPA Hibernate and Data JDBC](/learning/spring-boot-spring-jpa-hibernate) — `@DataJpaTest`
- [Actuator and Metrics](/learning/spring-boot-spring-actuator-metrics) — Health in integration tests

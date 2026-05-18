# Global Exception Handling

> Clients deserve **predictable error JSON**. Scatter `try/catch` in every controller and you'll ship inconsistent APIs. Use **`@ControllerAdvice`** once, handle everything centrally.

---

## `@ControllerAdvice` Basics

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(UserNotFoundException ex) {
        return new ErrorResponse("USER_NOT_FOUND", ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fields = ex.getBindingResult().getFieldErrors().stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                fe -> fe.getDefaultMessage() != null ? fe.getDefaultMessage() : "invalid",
                (a, b) -> a
            ));
        return new ValidationErrorResponse("VALIDATION_ERROR", "Invalid request", fields);
    }
}
```

`@RestControllerAdvice` = `@ControllerAdvice` + `@ResponseBody` on every handler.

---

## Custom Domain Exceptions

```java
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User not found: " + id);
    }
}

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, Object id) {
        super("%s not found: %s".formatted(resource, id));
    }
}
```

Throw from services — let advice translate to HTTP.

---

## RFC 7807 Problem Details

Standard shape for HTTP APIs (Spring 6+ has built-in support):

```java
@RestControllerAdvice
public class ProblemDetailsExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleNotFound(UserNotFoundException ex, HttpServletRequest request) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.NOT_FOUND, ex.getMessage()
        );
        problem.setTitle("User Not Found");
        problem.setType(URI.create("https://api.example.com/problems/user-not-found"));
        problem.setProperty("timestamp", Instant.now());
        problem.setInstance(URI.create(request.getRequestURI()));
        return problem;
    }
}
```

Example response:

```json
{
  "type": "https://api.example.com/problems/user-not-found",
  "title": "User Not Found",
  "status": 404,
  "detail": "User not found: 42",
  "instance": "/api/v1/users/42",
  "timestamp": "2026-05-17T12:00:00Z"
}
```

Enable in Spring Boot 3:

```yaml
spring:
  mvc:
    problemdetails:
      enabled: true
```

---

## Catch-All Handler (Production)

```java
@ExceptionHandler(Exception.class)
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public ProblemDetail handleUnexpected(Exception ex, HttpServletRequest request) {
    log.error("Unhandled error on {}", request.getRequestURI(), ex);
    return ProblemDetail.forStatusAndDetail(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred"
    );
    // Never expose stack traces to clients in prod
}
```

---

## `ResponseEntity` for Flexible Status

```java
@ExceptionHandler(PaymentDeclinedException.class)
public ResponseEntity<ProblemDetail> handlePayment(PaymentDeclinedException ex) {
    ProblemDetail body = ProblemDetail.forStatus(HttpStatus.PAYMENT_REQUIRED);
    body.setDetail(ex.getMessage());
    return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).body(body);
}
```

---

## Validation Integration

```java
public record UserCreateRequest(
    @NotBlank String name,
    @Email String email
) {}
```

`@Valid` on `@RequestBody` → `MethodArgumentNotValidException` → your handler returns 422/400 with field map.

---

## Combat Tips

### ✅ DO
- One error contract for the entire API
- Log server-side details; return safe messages to clients
- Map business errors to 4xx, infrastructure to 5xx

### ❌ DON'T
- Don't return HTML error pages from REST APIs
- Don't use exceptions for normal control flow
- Don't leak SQL or file paths in `detail`

---

## Related Notes
- [[01_REST_Controllers_and_MVC]] — `@Valid` on controllers
- [[02_Transaction_Management]] — Rollback + error mapping
- [[03_Global_Error_Handling]] — FastAPI equivalent (vault)

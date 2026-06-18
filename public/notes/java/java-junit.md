# JUnit

> Testing framework

## @Test

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MyTest {
    @Test
    void testAddition() {
        assertEquals(4, 2 + 2);
    }
    
    @Test
    void testNull() {
        assertNotNull(new Object());
    }
}
```

## Assertions

```java
assertEquals(expected, actual);
assertTrue(condition);
assertFalse(condition);
assertNull(object);
assertNotNull(object);
assertThrows(Exception.class, () -> code);
```

## @BeforeEach/@AfterEach

```java
@BeforeEach
void setup() { }

@AfterEach
void teardown() { }
```
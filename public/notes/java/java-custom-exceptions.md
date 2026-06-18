# Custom Exceptions

> Creating your own exceptions

## Unchecked Custom Exception

```java
public class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(String message) {
        super(message);
    }
}
```

## Checked Custom Exception

```java
public class DataReadException extends Exception {
    public DataReadException(String message) {
        super(message);
    }
}
```

## Usage

```java
if (age < 0 || age > 150) {
    throw new InvalidAgeException("Invalid age: " + age);
}
```
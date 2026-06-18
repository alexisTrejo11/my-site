# Logging

> java.util.logging

## Logger Creation

```java
Logger logger = Logger.getLogger(MyClass.class.getName());
```

## Log Levels

```java
logger.severe("Error");    // Level.SEVERE
logger.warning("Warning"); // Level.WARNING
logger.info("Info");       // Level.INFO
logger.config("Config");   // Level.CONFIG
logger.fine("Fine");      // Level.FINE
logger.finer("Finer");    // Level.FINER
logger.finest("Finest");   // Level.FINEST
```

## Configuration

```java
logger.setLevel(Level.INFO);
// Also uses logging.properties
```
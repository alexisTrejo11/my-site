# Log4j and SLF4J

> Logging frameworks

## SLF4J (API)

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class MyClass {
    private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
    
    public void method() {
	    // can use many levels according to operation
        logger.debug("Debug message");
        logger.info("Info message");
        logger.warn("Warning message");
        logger.error("Error message");
    }
}
```

## Log4j2 (Implementation)

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.20.0</version>
</dependency>
```

## Configuration (log4j2.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss} [%t] %-5level %logger{36} - %msg%n"/>
        </Console>
    </Appenders>
    <Loggers>
        <Root level="info">
            <AppenderRef ref="Console"/>
        </Root>
    </Loggers>
</Configuration>
```

> with this  you can modify application logging without modify any java code
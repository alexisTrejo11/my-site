# Maven

> Build tool

## pom.xml

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0.0</version>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>6.1.0</version>
        </dependency>
    </dependencies>
</project>
```

## Commands

```bash
mvn clean compile     # Compile
mvn test           # Run tests
mvn package        # Package
mvn install        # Install
mvn dependency:tree   # Show deps
```
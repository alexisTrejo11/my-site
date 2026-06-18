# Gradle

> Build tool alternative

## build.gradle

```groovy
plugins {
    id 'java'
    id 'application'
}

group = 'com.example'
version = '1.0.0'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework:spring-core:6.1.0'
    testImplementation 'org.junit:junit-bom:5.10.0'
}

application {
    mainClass = 'com.example.App'
}
```

## Commands

```bash
gradle build        # Build
gradle test         # Run tests
gradle run         # Run
gradle dependencies # Show deps
```
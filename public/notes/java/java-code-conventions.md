# Code Conventions

> Naming and style guidelines

## Classes

```java
// PascalCase
class UserAccount { }
class OrderProcessor { }
class HttpResponse { }
```

## Methods and Variables

```java
// camelCase
void calculateTotal() { }
String userName = "John";
int maxCount = 100;
var minCount = 50; // Supported only in moder versions
```

## Constants

```java
// UPPER_SNAKE_CASE
static final int MAX_CONNECTIONS = 100;
static final String DEFAULT_CHARSET = "UTF-8";
```

## Packages

```java
// lowercase 
// common naming are io and com
package com.example.myapp;
package io.github.project.component;
```

## Files

```java
// Same as class name
public class UserService { }  // UserService.java

// Can Add more clases but not only one can be public
class EmployeeService {}
```

## Indentation

```java
// 4 spaces but I like 2 :D
if (condition) {
    doSomething();
}
```
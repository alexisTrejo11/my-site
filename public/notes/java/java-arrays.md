# Arrays

> Single and multidimensional arrays in Java

## Declaration and Initialization

```java
// Single dimension
int[] numbers = {1, 2, 3, 4, 5};
int[] arr = new int[5];

// Multidimensional
int[][] matrix = {{1, 2}, {3, 4}};
int[][] arr = new int[3][3];
```

## Common Operations

```java
// Length
int len = array.length;

// Iterate
for (int i = 0; i < arr.length; i++) { }
for (int num : arr) { }

// Arrays utility
Arrays.sort(arr);
Arrays.fill(arr, 0);
Arrays.toString(arr);
```
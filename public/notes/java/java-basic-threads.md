# Basic Threads

> Thread creation and execution

## Extending Thread

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Running");
    }
}

new MyThread().start();
```

## Implementing Runnable

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Running");
    }
}

new Thread(new MyRunnable()).start();

// Lambda (Java 8+)
new Thread(() -> System.out.println("Running")).start();
```

## Thread Methods

```java
Thread.currentThread();      // Current thread
thread.getName();
thread.setName("name");
thread.isAlive();
thread.join();             // Wait for completion
thread.interrupt();
```
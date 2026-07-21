# Comprehensive Java Cheatsheet (Modern Java 2026)

A complete, high-density reference guide for Java developers covering core syntax, memory management, JVM internals, Collections framework, Stream API, Concurrency, and modern Java features (Java 8 through Java 21).

---

## Table of Contents
1. [Java Basics & Syntax](#1-java-basics--syntax)
2. [JVM Architecture & Memory Management](#2-jvm-architecture--memory-management)
3. [Java Collections Framework](#3-java-collections-framework)
4. [Stream API & Functional Programming](#4-stream-api--functional-programming)
5. [Object-Oriented Programming & Interfaces](#5-object-oriented-programming--interfaces)
6. [Multithreading & Concurrency](#6-multithreading--concurrency)
7. [Exception Handling & I/O](#7-exception-handling--io)
8. [Modern Java Features (Java 11 - 21)](#8-modern-java-features-java-11---21)

---

## 1. Java Basics & Syntax

### Primitive Data Types
```java
byte b = 127;           // 8-bit (-128 to 127)
short s = 32767;        // 16-bit
int i = 2147483647;     // 32-bit
long l = 9223372036854775807L; // 64-bit

float f = 3.14f;        // 32-bit floating point
double d = 3.14159265;  // 64-bit floating point
char c = 'A';           // 16-bit Unicode
boolean isJava = true;  // true / false
```

### String Operations
```java
String s1 = "Hello";                  // Stored in String Constant Pool
String s2 = new String("Hello");      // Stored in Heap
String s3 = "Hello";

System.out.println(s1 == s3);         // true (Same reference in Pool)
System.out.println(s1 == s2);         // false (Different objects)
System.out.println(s1.equals(s2));    // true (Content equality)

// StringBuilder (Mutable, Non-thread-safe, Fast)
StringBuilder sb = new StringBuilder("Java");
sb.append(" 21").reverse();

// StringBuffer (Mutable, Thread-safe / Synchronized, Slower)
StringBuffer sbuf = new StringBuffer("Thread-Safe");
```

---

## 2. JVM Architecture & Memory Management

```
+-------------------------------------------------------------+
|                      JVM Memory Structure                   |
+-------------------------------------------------------------+
|  +-------------------------------------------------------+  |
|  | Heap Memory (Shared across all threads)               |  |
|  | +-----------------------+ +-------------------------+ |  |
|  | | Young Gen (Eden, S0, S1)| | Old/Tenured Gen         | |  |
|  | +-----------------------+ +-------------------------+ |  |
|  +-------------------------------------------------------+  |
|  +-------------------------------------------------------+  |
|  | Metaspace (Native OS Memory, Class Metadata)          |  |
|  +-------------------------------------------------------+  |
|  +-------------------------------------------------------+  |
|  | Thread Stacks (Per thread: Local vars, Method frames) |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

### Key Memory Areas
- **Heap**: Stores all objects and arrays. Divided into Young Generation (Eden, Survivor 0, Survivor 1) and Old (Tenured) Generation.
- **Stack**: Per-thread memory storing method invocation frames, primitive local variables, and object reference pointers.
- **Metaspace**: Native memory area storing class metadata, method bytecode, and static variables (replaced PermGen in Java 8).

---

## 3. Java Collections Framework

| Data Structure | Interface | Ordered? | Duplicates? | Thread-Safe? | Search Time |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ArrayList` | `List` | Yes | Yes | No | $O(N)$ |
| `LinkedList` | `List/Deque`| Yes | Yes | No | $O(N)$ |
| `HashSet` | `Set` | No | No | No | $O(1)$ avg |
| `TreeSet` | `NavigableSet`| Sorted | No | No | $O(\log N)$ |
| `HashMap` | `Map` | No | Keys: No | No | $O(1)$ avg |
| `ConcurrentHashMap`| `ConcurrentMap`| No | Keys: No | Yes (Segment/Node locks) | $O(1)$ avg |

### HashMap Operations & Basics
```java
Map<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.put("Bob", 85);
map.putIfAbsent("Charlie", 95);

int score = map.getOrDefault("David", 0); // Returns default if key absent
map.computeIfAbsent("Eva", k -> 88);

// Iterating over HashMap
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

---

## 4. Stream API & Functional Programming

### Common Stream Operations
```java
List<String> names = List.of("Anna", "Bob", "Alexander", "Brian", "Alice");

// Filter, Map, Sort, Collect
List<String> result = names.stream()
    .filter(n -> n.startsWith("A"))
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());
// Output: ["ALEXANDER", "ALICE", "ANNA"]

// Grouping By
Map<Integer, List<String>> byLength = names.stream()
    .collect(Collectors.groupingBy(String::length));

// Reduce
int sum = List.of(1, 2, 3, 4, 5).stream()
    .reduce(0, Integer::sum); // 15
```

---

## 5. Object-Oriented Programming & Interfaces

```java
// Abstract Class vs Interface
public interface Payable {
    void processPayment(double amount); // Abstract method
    
    default void logTransaction() {     // Java 8 Default method
        System.out.println("Payment logged.");
    }
    
    static boolean isValidAmount(double amt) { // Java 8 Static method
        return amt > 0;
    }
}

public abstract class Employee {
    private final String id;            // Encapsulation
    
    public Employee(String id) {
        this.id = id;
    }
    
    public abstract double calculateSalary(); // Abstract method
}
```

---

## 6. Multithreading & Concurrency

### Creating Threads
```java
// Option 1: Implementing Runnable
Runnable task = () -> System.out.println("Running in thread: " + Thread.currentThread().getName());
new Thread(task).start();

// Option 2: ExecutorService Thread Pool
ExecutorService executor = Executors.newFixedThreadPool(4);
Future<Integer> future = executor.submit(() -> 42);
int result = future.get(); // Blocks until completed
executor.shutdown();
```

### Synchronization & Locks
```java
public class Counter {
    private int count = 0;
    
    // Synchronized Method
    public synchronized void increment() {
        count++;
    }
    
    // Explicit ReentrantLock
    private final Lock lock = new ReentrantLock();
    public void safeIncrement() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock(); // Always unlock in finally block!
        }
    }
}
```

---

## 7. Exception Handling & I/O

```java
// Try-With-Resources (AutoCloseable)
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (FileNotFoundException e) {
    System.err.println("File missing: " + e.getMessage());
} catch (IOException e) {
    System.err.println("I/O Error: " + e.getMessage());
}
```

---

## 8. Modern Java Features (Java 11 - 21)

### Records (Java 14+)
```java
// Immutable data carrier class (auto-generates getters, equals, hashCode, toString)
public record UserRecord(String id, String name, String email) {}

UserRecord user = new UserRecord("1", "Alice", "alice@company.com");
System.out.println(user.name()); // "Alice"
```

### Sealed Classes (Java 17+)
```java
// Restricts which subclasses can inherit from this class
public sealed class Shape permits Circle, Rectangle {}

public final class Circle extends Shape {}
public final class Rectangle extends Shape {}
```

### Virtual Threads (Java 21 - Project Loom)
```java
// Light-weight threads managed by JVM (millions can run concurrently)
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(1000);
            return i;
        });
    });
} // Auto-flushes and waits for tasks
```

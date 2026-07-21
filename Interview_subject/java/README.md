# Java Interview Question Bank

> **Java Interview Questions for Freshers, Mid-Level & Backend Developers**

This repository contains frequently asked Java interview questions collected from product companies, enterprise backend architectures, FAANG hiring trends, and modern Java features (Java 8, Java 17 LTS, Java 21 Virtual Threads).

---

## Resource Modules

| Module | Description | Target Use Case |
| :--- | :--- | :--- |
| ⚡ [Java Cheatsheet](file:///s:/Interview_Preperation/Interview_subject/java/Java_Cheatsheet.md) | Reference guide covering JVM Architecture, Memory Layout, Collections, Stream API, Concurrency, and Modern Java 21 features. | Quick revision before interview |
| ❓ [Java Interview Questions](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md) | Theoretical and architectural questions with detailed technical answers, code snippets, and JVM memory diagrams. | Core concept & system architecture mastery |
| 💻 [Java Coding Practice](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md) | Practical Java coding problems (Array/String algorithms, Stream API, Thread-safe LRU Cache, Producer-Consumer pattern) with complete Java solutions, complexities, and test cases. | Coding round & concurrency practice |

---

# Table of Contents

- [Java Fundamentals & Core Concepts](#java-fundamentals--core-concepts)
- [Java Collections Framework & Data Structures](#java-collections-framework--data-structures)
- [Object-Oriented Programming (OOP) in Java](#object-oriented-programming-oop-in-java)
- [Stream API & Modern Java (Java 8 - 21)](#stream-api--modern-java-java-8---21)
- [Concurrency, Multithreading & Memory Model](#concurrency-multithreading--memory-model)
- [Advanced Java, JVM Tuning & Backend Architecture](#advanced-java-jvm-tuning--backend-architecture)
- [Bonus Coding Questions](#bonus-coding-questions)
- [Recommended Learning Path](#recommended-learning-path)

---

# Quick Topic Map & Navigation

## Java Fundamentals & Core Concepts
1. [What are the key features of Java?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#1-what-are-the-key-features-of-java)
2. [Explain JVM Architecture & Memory Management.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#2-explain-jvm-architecture--memory-management-heap-vs-stack-vs-metaspace)
3. [What is the difference between JDK, JRE, and JVM?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#3-difference-between-jdk-jre-and-jvm)
4. [Primitives vs Wrapper Classes & Autoboxing/Unboxing.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#4-primitives-vs-wrapper-classes--autoboxingunboxing)
5. [Difference between `==` and `.equals()` & `hashCode()` contract.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#5-equals-vs-equals--the-hashcode-contract)
6. [String immutability, String Constant Pool, StringBuilder, and StringBuffer.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#6-string-immutability-string-pool-stringbuilder-and-stringbuffer)
7. [Explain Java Access Modifiers.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#7-java-access-modifiers)
8. [Keywords: static, final, finally, volatile, transient.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#8-keywords-static-final-finally-volatile-transient)
9. [Is Java Pass-by-Value or Pass-by-Reference?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#9-is-java-pass-by-value-or-pass-by-reference)
10. [Abstract Class vs Interface in Java.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#10-abstract-class-vs-interface-post-java-8917)
11. [Functional Interfaces & Lambda Expressions.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#11-functional-interfaces--lambda-expressions)
12. [Exception Hierarchy & Try-with-Resources.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#12-exception-hierarchy--try-with-resources)
13. [Generics, Type Erasure, and Wildcards.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#13-generics-type-erasure-and-wildcards)
14. [Annotations and Reflection API.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#14-annotations--reflection-api)
15. [Comparable vs Comparator interfaces.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#15-comparable-vs-comparator)

## Java Collections Framework & Data Structures
16. [Overview of Java Collections Framework.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#16-collections-hierarchy-overview)
17. [ArrayList vs LinkedList.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#17-arraylist-vs-linkedlist)
18. [How does HashMap work internally in Java?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#18-how-hashmap-works-internally-in-java)
19. [HashSet vs TreeSet vs LinkedHashSet.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#19-hashset-vs-treeset-vs-linkedhashset)
20. [ConcurrentHashMap vs Hashtable vs SynchronizedMap.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#20-concurrenthashmap-vs-hashtable-vs-synchronizedmap)
21. [How does PriorityQueue work?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#21-how-priorityqueue-works)
22. [Fail-Fast vs Fail-Safe Iterators.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#22-fail-fast-vs-fail-safe-iterators)
23. [ArrayDeque vs Stack / LinkedList.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#23-arraydeque-vs-stack--linkedlist)
24. [Time Complexity of Java Collections.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#24-collections-time-complexities)
25. [What is CopyOnWriteArrayList?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#25-what-is-copyonwritearraylist)

## Object-Oriented Programming (OOP) in Java
26. [Explain Core OOP Principles in Java.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#26-core-oop-principles-in-java)
27. [Method Overloading vs Method Overriding.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#27-method-overloading-vs-overriding)
28. [Dynamic Binding vs Static Binding.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#28-dynamic-binding-vs-static-binding)
29. [What are Covariant Return Types?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#29-covariant-return-types)
30. [Composition vs Inheritance.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#30-composition-vs-inheritance)
31. [Object Cloning (Shallow vs Deep Copy).](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#31-shallow-copy-vs-deep-copy)
32. [What are Marker Interfaces?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#32-marker-interfaces)
33. [Implement a Thread-Safe Singleton Pattern in Java.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#33-thread-safe-singleton-pattern)

## Stream API & Modern Java (Java 8 - 21)
34. [Explain Java Stream API core operations.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#34-stream-api-core-operations)
35. [Explain Lazy Evaluation in Streams.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#35-lazy-evaluation-in-streams)
36. [What is Optional<T> usage?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#36-optionalt-usage)
37. [Parallel Streams vs Sequential Streams.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#37-parallel-streams-vs-sequential-streams)
38. [Key features in Java 11 and Java 17 LTS.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#38-java-11--java-17-lts-features)
39. [What are Java 21 Virtual Threads (Project Loom)?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#39-java-21-virtual-threads-project-loom)
40. [Explain CompletableFuture.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#40-completablefuture)

## Concurrency, Multithreading & Memory Model
41. [Java Thread Lifecycle and Thread Creation options.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#41-thread-creation--lifecycle)
42. [synchronized vs ReentrantLock.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#42-synchronized-vs-reentrantlock)
43. [Explain volatile and Java Memory Model (JMM).](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#43-volatile--java-memory-model-jmm)
44. [Executor Framework & ThreadPoolExecutor Parameters.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#44-executor-framework--threadpoolexecutor)
45. [What is a Deadlock and how is it detected/prevented in Java?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#45-deadlocks-in-java)

## Advanced Java, JVM Tuning & Backend Architecture
46. [Explain Java Garbage Collection Algorithms (G1GC, ZGC).](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#46-garbage-collection-g1gc-vs-zgc)
47. [How do you profile and tune JVM performance in production?](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#47-jvm-profiling--tuning)
48. [Java Reflection API & Dynamic Proxies.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#48-reflection-api--dynamic-proxies)
49. [Connection Pooling & ORM Caching (HikariCP, Hibernate L1/L2 Cache).](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#49-hikaricp--hibernate-caching)
50. [Best Practices for Designing Scalable Java Spring Boot Microservices.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Interview_Questions.md#50-scalable-spring-boot-microservice-best-practices)

---

# Bonus Coding Questions

Practice these essential coding solutions in [Java Coding Practice](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md):

1. [Reverse a string in Java without using built-in `reverse()`.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md#1-reverse-a-string-without-built-in-reverse)
2. [Find duplicate elements using Java 8 Streams.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md#2-find-duplicate-elements-using-java-8-streams)
3. [Check whether two strings are anagrams.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md#3-check-whether-two-strings-are-anagrams)
4. [Find first non-repeating character in a string.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md#4-find-first-non-repeating-character-in-a-string)
5. [Count word frequencies using HashMap and Streams.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md#5-count-word-frequencies-using-hashmap-and-streams)
6. [Merge two sorted arrays.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md#6-merge-two-sorted-arrays)
7. [Find second largest element in an array.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md#7-find-second-largest-element-in-an-array)
8. [Remove duplicates preserving insertion order.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md#8-remove-duplicates-preserving-order)
9. [Implement a Thread-Safe LRU Cache.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md#9-implement-a-thread-safe-lru-cache)
10. [Implement Producer-Consumer pattern using `ArrayBlockingQueue`.](file:///s:/Interview_Preperation/Interview_subject/java/Java_Coding_Practice.md#10-implement-producer-consumer-pattern-using-arrayblockingqueue)

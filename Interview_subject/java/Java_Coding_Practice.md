# Java Coding Practice Questions (Modern Java 2026)

A curated collection of 10 practical Java coding interview questions frequently asked in technical interviews. Each problem includes a problem statement, optimal Java 17/21 implementation, time and space complexity analysis, and test verification cases.

---

## Table of Contents
1. [Reverse a String Without Built-in `reverse()`](#1-reverse-a-string-without-built-in-reverse)
2. [Find Duplicate Elements Using Java 8 Streams](#2-find-duplicate-elements-using-java-8-streams)
3. [Check Whether Two Strings Are Anagrams](#3-check-whether-two-strings-are-anagrams)
4. [Find First Non-Repeating Character in a String](#4-find-first-non-repeating-character-in-a-string)
5. [Count Word Frequencies Using HashMap and Streams](#5-count-word-frequencies-using-hashmap-and-streams)
6. [Merge Two Sorted Arrays](#6-merge-two-sorted-arrays)
7. [Find Second Largest Element in an Array](#7-find-second-largest-element-in-an-array)
8. [Remove Duplicates Preserving Order](#8-remove-duplicates-preserving-order)
9. [Implement a Thread-Safe LRU Cache](#9-implement-a-thread-safe-lru-cache)
10. [Implement Producer-Consumer Pattern Using `ArrayBlockingQueue`](#10-implement-producer-consumer-pattern-using-arrayblockingqueue)

---

## 1. Reverse a String Without Built-in `reverse()`

**Problem**: Reverse a string in Java without using `StringBuilder.reverse()`.

### Implementation
```java
public class StringReversal {
    public static String reverse(String input) {
        if (input == null) return null;
        char[] chars = input.toCharArray();
        int left = 0, right = chars.length - 1;
        while (left < right) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
        return new String(chars);
    }

    public static void main(String[] args) {
        System.out.println(reverse("Java21")); // Output: "12avaJ"
    }
}
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(N)$

---

## 2. Find Duplicate Elements Using Java 8 Streams

**Problem**: Given a list of integers, find all duplicate values using Java 8 Stream API.

### Implementation
```java
import java.util.*;
import java.util.stream.Collectors;

public class FindDuplicatesStream {
    public static List<Integer> findDuplicates(List<Integer> list) {
        Set<Integer> seen = new HashSet<>();
        return list.stream()
                .filter(n -> !seen.add(n)) // HashSet.add() returns false if item already exists
                .distinct()
                .collect(Collectors.toList());
    }

    public static void main(String[] args) {
        List<Integer> nums = List.of(10, 20, 30, 20, 40, 10, 50);
        System.out.println(findDuplicates(nums)); // Output: [20, 10]
    }
}
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(N)$

---

## 3. Check Whether Two Strings Are Anagrams

**Problem**: Check if two strings are valid anagrams in $O(N)$ time.

### Implementation
```java
public class AnagramChecker {
    public static boolean isAnagram(String s1, String s2) {
        if (s1 == null || s2 == null) return false;
        String clean1 = s1.replaceAll("\\s+", "").toLowerCase();
        String clean2 = s2.replaceAll("\\s+", "").toLowerCase();
        if (clean1.length() != clean2.length()) return false;

        int[] counts = new int[26];
        for (int i = 0; i < clean1.length(); i++) {
            counts[clean1.charAt(i) - 'a']++;
            counts[clean2.charAt(i) - 'a']--;
        }

        for (int count : counts) {
            if (count != 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("Listen", "Silent")); // Output: true
    }
}
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(1)$ (Fixed size 26 array)

---

## 4. Find First Non-Repeating Character in a String

**Problem**: Find the first character in a string that does not repeat.

### Implementation
```java
import java.util.*;

public class FirstUniqueChar {
    public static Character findFirstNonRepeating(String s) {
        if (s == null || s.isEmpty()) return null;

        Map<Character, Integer> counts = new LinkedHashMap<>();
        for (char c : s.toCharArray()) {
            counts.put(c, counts.getOrDefault(c, 0) + 1);
        }

        for (Map.Entry<Character, Integer> entry : counts.entrySet()) {
            if (entry.getValue() == 1) {
                return entry.getKey();
            }
        }
        return null;
    }

    public static void main(String[] args) {
        System.out.println(findFirstNonRepeating("swiss")); // Output: 'w'
    }
}
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(1)$

---

## 5. Count Word Frequencies Using HashMap and Streams

**Problem**: Given a text block, count frequency of words using Java Streams.

### Implementation
```java
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class WordFrequencyCounter {
    public static Map<String, Long> countFrequencies(String text) {
        if (text == null || text.isBlank()) return Map.of();

        return Arrays.stream(text.toLowerCase().split("\\W+"))
                .filter(w -> !w.isEmpty())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }

    public static void main(String[] args) {
        String text = "Java is powerful and Java is fast!";
        System.out.println(countFrequencies(text));
        // Output: {java=2, is=2, powerful=1, and=1, fast=1}
    }
}
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(U)$ where $U$ is unique word count

---

## 6. Merge Two Sorted Arrays

**Problem**: Merge two sorted arrays into a single sorted array.

### Implementation
```java
import java.util.Arrays;

public class MergeSortedArrays {
    public static int[] merge(int[] arr1, int[] arr2) {
        int n1 = arr1.length, n2 = arr2.length;
        int[] result = new int[n1 + n2];
        int i = 0, j = 0, k = 0;

        while (i < n1 && j < n2) {
            if (arr1[i] <= arr2[j]) {
                result[k++] = arr1[i++];
            } else {
                result[k++] = arr2[j++];
            }
        }

        while (i < n1) result[k++] = arr1[i++];
        while (j < n2) result[k++] = arr2[j++];

        return result;
    }

    public static void main(String[] args) {
        int[] a = {1, 3, 5, 7};
        int[] b = {2, 4, 6, 8};
        System.out.println(Arrays.toString(merge(a, b))); // [1, 2, 3, 4, 5, 6, 7, 8]
    }
}
```

- **Time Complexity**: $O(N + M)$
- **Space Complexity**: $O(N + M)$

---

## 7. Find Second Largest Element in an Array

**Problem**: Find the second-largest distinct element in an array without sorting.

### Implementation
```java
public class SecondLargest {
    public static Integer findSecondLargest(int[] nums) {
        if (nums == null || nums.length < 2) return null;

        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;

        for (int num : nums) {
            if (num > first) {
                second = first;
                first = num;
            } else if (num > second && num != first) {
                second = num;
            }
        }
        return second == Integer.MIN_VALUE ? null : second;
    }

    public static void main(String[] args) {
        int[] numbers = {12, 35, 1, 10, 34, 1};
        System.out.println(findSecondLargest(numbers)); // Output: 34
    }
}
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(1)$

---

## 8. Remove Duplicates Preserving Order

**Problem**: Remove duplicates from a list while maintaining original insertion order.

### Implementation
```java
import java.util.*;

public class DeduplicatePreserveOrder {
    public static <T> List<T> removeDuplicates(List<T> list) {
        return new ArrayList<>(new LinkedHashSet<>(list));
    }

    public static void main(String[] args) {
        List<String> list = List.of("apple", "banana", "apple", "cherry", "banana");
        System.out.println(removeDuplicates(list)); // Output: [apple, banana, cherry]
    }
}
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(N)$

---

## 9. Implement a Thread-Safe LRU Cache

**Problem**: Implement a thread-safe LRU Cache using `LinkedHashMap`.

### Implementation
```java
import java.util.*;

public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCache(int capacity) {
        // accessOrder = true specifies ordering by access frequency
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity; // Evict eldest if capacity exceeded
    }

    public synchronized V getCache(K key) {
        return super.get(key);
    }

    public synchronized void putCache(K key, V value) {
        super.put(key, value);
    }

    public static void main(String[] args) {
        LRUCache<Integer, String> cache = new LRUCache<>(2);
        cache.putCache(1, "One");
        cache.putCache(2, "Two");
        cache.getCache(1);       // Access 1 (makes 2 eldest)
        cache.putCache(3, "Three"); // Evicts 2!
        System.out.println(cache); // Output: {1=One, 3=Three}
    }
}
```

- **Time Complexity**: $O(1)$ for get and put operations
- **Space Complexity**: $O(Capacity)$

---

## 10. Implement Producer-Consumer Pattern Using `ArrayBlockingQueue`

**Problem**: Implement a multi-threaded Producer-Consumer pattern using Java Concurrency utilities.

### Implementation
```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class ProducerConsumerDemo {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);

        // Producer Thread
        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    System.out.println("Producing: " + i);
                    queue.put(i); // Blocks if queue is full
                    Thread.sleep(200);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // Consumer Thread
        Thread consumer = new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    int val = queue.take(); // Blocks if queue is empty
                    System.out.println("Consumed: " + val);
                    Thread.sleep(400);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
    }
}
```

- **Time Complexity**: $O(1)$ per produce/consume event
- **Space Complexity**: $O(QueueCapacity)$

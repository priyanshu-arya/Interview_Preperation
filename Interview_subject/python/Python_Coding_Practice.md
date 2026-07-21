# Python Bonus Coding Practice Questions (2026 Edition)

A collection of 10 practical coding interview questions frequently asked in technical interviews. Each problem includes a problem statement, optimal Python implementation, time and space complexity analysis, and test verification cases.

---

## Table of Contents
1. [Reverse a String Without Slicing](#1-reverse-a-string-without-slicing)
2. [Find Duplicate Elements in a List](#2-find-duplicate-elements-in-a-list)
3. [Check Whether Two Strings are Anagrams](#3-check-whether-two-strings-are-anagrams)
4. [Find the First Non-Repeating Character](#4-find-the-first-non-repeating-character)
5. [Count Word Frequencies Using a Dictionary](#5-count-word-frequencies-using-a-dictionary)
6. [Merge Two Sorted Lists](#6-merge-two-sorted-lists)
7. [Find the Second-Largest Element in a List](#7-find-the-second-largest-element-in-a-list)
8. [Remove Duplicates While Preserving Order](#8-remove-duplicates-while-preserving-order)
9. [Implement an LRU Cache](#9-implement-an-lru-cache)
10. [Design a Simple URL Shortener Class](#10-design-a-simple-url-shortener-class)

---

## 1. Reverse a String Without Slicing

**Problem**: Reverse a string without using `[::-1]` slice notation.

### Implementation
```python
def reverse_string(s: str) -> str:
    chars = list(s)
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    return "".join(chars)

# Test Verification
print(reverse_string("python"))  # Output: "nohtyp"
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(N)$

---

## 2. Find Duplicate Elements in a List

**Problem**: Given a list of elements, return all duplicate values.

### Implementation
```python
def find_duplicates(lst: list) -> list:
    seen = set()
    duplicates = set()
    for item in lst:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    return list(duplicates)

# Test Verification
print(find_duplicates([1, 2, 3, 2, 4, 5, 1, 6]))  # Output: [1, 2]
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(N)$

---

## 3. Check Whether Two Strings are Anagrams

**Problem**: Determine if string `s1` and string `s2` are valid anagrams of each other.

### Implementation
```python
from collections import Counter

def is_anagram(s1: str, s2: str) -> bool:
    # Clean whitespace and case sensitivity if required
    s1_clean = s1.replace(" ", "").lower()
    s2_clean = s2.replace(" ", "").lower()
    return Counter(s1_clean) == Counter(s2_clean)

# Test Verification
print(is_anagram("listen", "silent"))  # Output: True
print(is_anagram("hello", "billion")) # Output: False
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(1)$ (since alphabet size is fixed to 26/ASCII bounds)

---

## 4. Find the First Non-Repeating Character

**Problem**: Find the first character in a string that does not repeat. If all characters repeat, return `None`.

### Implementation
```python
from collections import Counter

def first_non_repeating_char(s: str) -> str | None:
    counts = Counter(s)
    for char in s:
        if counts[char] == 1:
            return char
    return None

# Test Verification
print(first_non_repeating_char("swiss"))     # Output: "w"
print(first_non_repeating_char("repeating")) # Output: "p"
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(1)$

---

## 5. Count Word Frequencies Using a Dictionary

**Problem**: Given a text paragraph, return a dictionary containing the frequency of each unique word.

### Implementation
```python
import re
from collections import defaultdict

def count_word_frequencies(text: str) -> dict[str, int]:
    words = re.findall(r'\b\w+\b', text.lower())
    freq = defaultdict(int)
    for word in words:
        freq[word] += 1
    return dict(freq)

# Test Verification
sample_text = "Python is great. Python is fast and readable!"
print(count_word_frequencies(sample_text))
# Output: {'python': 2, 'is': 2, 'great': 1, 'fast': 1, 'and': 1, 'readable': 1}
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(U)$ where $U$ is number of unique words

---

## 6. Merge Two Sorted Lists

**Problem**: Merge two sorted lists into a single sorted list in linear time.

### Implementation
```python
def merge_sorted_lists(l1: list[int], l2: list[int]) -> list[int]:
    merged = []
    i, j = 0, 0
    while i < len(l1) and j < len(l2):
        if l1[i] <= l2[j]:
            merged.append(l1[i])
            i += 1
        else:
            merged.append(l2[j])
            j += 1
    merged.extend(l1[i:])
    merged.extend(l2[j:])
    return merged

# Test Verification
print(merge_sorted_lists([1, 3, 5], [2, 4, 6, 8])) # Output: [1, 2, 3, 4, 5, 6, 8]
```

- **Time Complexity**: $O(N + M)$
- **Space Complexity**: $O(N + M)$

---

## 7. Find the Second-Largest Element in a List

**Problem**: Find the second distinct largest element in a list of numbers.

### Implementation
```python
def second_largest(nums: list[int]) -> int | None:
    first = second = float('-inf')
    for num in nums:
        if num > first:
            second = first
            first = num
        elif first > num > second:
            second = num
    return second if second != float('-inf') else None

# Test Verification
print(second_largest([10, 20, 4, 45, 99, 99])) # Output: 45
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(1)$

---

## 8. Remove Duplicates While Preserving Order

**Problem**: Remove duplicate values from a list while maintaining the original sequence order.

### Implementation
```python
def remove_duplicates_preserve_order(lst: list) -> list:
    # dict.fromkeys preserves key insertion order in Python 3.7+
    return list(dict.fromkeys(lst))

# Test Verification
print(remove_duplicates_preserve_order([4, 5, 2, 4, 1, 2, 5])) # Output: [4, 5, 2, 1]
```

- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(N)$

---

## 9. Implement an LRU Cache

**Problem**: Design a Least Recently Used (LRU) Cache using `collections.OrderedDict`.

### Implementation
```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key) # Mark as recently used
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False) # Evict oldest (least recently used)

# Test Verification
cache = LRUCache(2)
cache.put(1, 10)
cache.put(2, 20)
print(cache.get(1)) # 10 (moves key 1 to end)
cache.put(3, 30)    # Evicts key 2!
print(cache.get(2)) # -1 (Not found)
```

- **Time Complexity**: $O(1)$ for both `get` and `put`
- **Space Complexity**: $O(Capacity)$

---

## 10. Design a Simple URL Shortener Class

**Problem**: Design a functional URL Shortener that encodes long URLs into base62 short keys and decodes them back.

### Implementation
```python
import string

class URLShortener:
    def __init__(self):
        self.url_map = {}
        self.short_map = {}
        self.base_url = "https://short.ly/"
        self.chars = string.ascii_letters + string.digits # Base62
        self.counter = 100000 # Unique auto-increment seed

    def _encode_id(self, num: int) -> str:
        res = []
        while num > 0:
            res.append(self.chars[num % 62])
            num //= 62
        return "".join(reversed(res))

    def shorten(self, long_url: str) -> str:
        if long_url in self.url_map:
            return self.base_url + self.url_map[long_url]

        short_key = self._encode_id(self.counter)
        self.counter += 1

        self.url_map[long_url] = short_key
        self.short_map[short_key] = long_url
        return self.base_url + short_key

    def restore(self, short_url: str) -> str | None:
        short_key = short_url.replace(self.base_url, "")
        return self.short_map.get(short_key, None)

# Test Verification
shortener = URLShortener()
short_url = shortener.shorten("https://www.example.com/very/long/path/to/article")
print("Shortened URL:", short_url)
print("Original URL:", shortener.restore(short_url))
```

- **Time Complexity**: $O(1)$ lookup and generation
- **Space Complexity**: $O(N)$ where $N$ is number of shortened URLs

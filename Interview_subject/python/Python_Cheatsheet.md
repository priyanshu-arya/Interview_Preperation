# Comprehensive Python Cheatsheet (2026 Edition)

A quick, exhaustive reference guide for Python programming covering syntax, built-in data structures, OOP, functional programming, memory management, decorators, generators, and concurrency.

---

## Table of Contents
1. [Python Basics & Data Types](#1-python-basics--data-types)
2. [Data Structures](#2-data-structures)
3. [Control Flow & Functions](#3-control-flow--functions)
4. [Object-Oriented Programming (OOP)](#4-object-oriented-programming-oop)
5. [Advanced Python (Decorators, Generators, Context Managers)](#5-advanced-python-decorators-generators-context-managers)
6. [Memory Management & GIL](#6-memory-management--gil)
7. [Exception Handling & File I/O](#7-exception-handling--file-io)
8. [Built-in Modules & Packages](#8-built-in-modules--packages)

---

## 1. Python Basics & Data Types

### Primitive Data Types
```python
x = 10          # int
y = 3.14        # float
name = "Python" # str
is_valid = True # bool
nothing = None  # NoneType
```

### Type Conversion & Type Checking
```python
type(42)              # <class 'int'>
isinstance(3.14, float) # True
issubclass(bool, int)  # True (bool is a subclass of int in Python)

int("100")            # 100
float("3.14")         # 3.14
str(25)               # "25"
list("abc")           # ['a', 'b', 'c']
```

---

## 2. Data Structures

| Structure | Mutable? | Ordered? | Duplicates? | Syntax | Time Complexity (Search) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **List** | Yes | Yes | Yes | `[1, 2, 3]` | $O(N)$ |
| **Tuple** | No | Yes | Yes | `(1, 2, 3)` | $O(N)$ |
| **Set** | Yes | No | No | `{1, 2, 3}` | $O(1)$ Average |
| **Dict** | Yes | Yes (3.7+) | Keys: No | `{'a': 1}` | $O(1)$ Average |

### List Operations
```python
lst = [10, 20, 30]
lst.append(40)         # Add to end: [10, 20, 30, 40]
lst.insert(1, 15)      # Insert at index: [10, 15, 20, 30, 40]
lst.extend([50, 60])   # Append iterable elements
popped = lst.pop()     # Remove and return last element (60)
lst.remove(15)         # Remove first occurrence of 15
del lst[0]             # Delete element at index 0
```

### Slicing Syntax: `list[start:stop:step]`
```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
nums[2:5]    # [2, 3, 4]
nums[:4]     # [0, 1, 2, 3]
nums[6:]     # [6, 7, 8, 9]
nums[::2]    # [0, 2, 4, 6, 8]
nums[::-1]   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (Reverse)
```

### Dictionary Operations
```python
d = {"name": "Alice", "age": 25}
d["role"] = "Engineer"      # Add key-value
val = d.get("salary", 0)     # Safe get with default (0)
keys = d.keys()             # dict_keys(['name', 'age', 'role'])
values = d.values()         # dict_values(['Alice', 25, 'Engineer'])
items = d.items()           # dict_items([('name', 'Alice'), ...])
d.pop("age", None)          # Remove key safely
```

### Set Operations
```python
a = {1, 2, 3}
b = {3, 4, 5}
union = a | b               # {1, 2, 3, 4, 5}
intersection = a & b        # {3}
difference = a - b          # {1, 2}
symmetric_diff = a ^ b      # {1, 2, 4, 5}
```

---

## 3. Control Flow & Functions

### Comprehensions
```python
# List Comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]

# Dict Comprehension
word_len = {word: len(word) for word in ["python", "code", "ai"]}

# Set Comprehension
unique_lens = {len(w) for w in ["apple", "banana", "pear"]}

# Generator Expression (Memory Efficient)
gen = (x**2 for x in range(1000000))
```

### `*args` and `**kwargs`
```python
def flex_func(*args, **kwargs):
    print("Positional (tuple):", args)
    print("Keyword (dict):", kwargs)

flex_func(1, 2, 3, name="Alice", role="Dev")
```

### Lambda, Map, Filter, Zip, Enumerate
```python
# Lambda Function
add = lambda x, y: x + y

# Map
nums = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, nums)) # [1, 4, 9, 16]

# Filter
evens = list(filter(lambda x: x % 2 == 0, nums)) # [2, 4]

# Enumerate
for idx, val in enumerate(["a", "b", "c"]):
    print(f"Index {idx}: {val}")

# Zip
names = ["Alice", "Bob"]
scores = [85, 92]
combined = list(zip(names, scores)) # [('Alice', 85), ('Bob', 92)]
```

---

## 4. Object-Oriented Programming (OOP)

```python
class Animal:
    species = "Living Organism" # Class Attribute

    def __init__(self, name: str, age: int):
        self.name = name       # Instance Attribute
        self._protected = 42    # Protected attribute (convention)
        self.__private = 100    # Private attribute (name mangling)

    def speak(self):            # Instance Method
        return f"{self.name} makes a sound."

    @classmethod
    def get_species(cls):       # Class Method
        return cls.species

    @staticmethod
    def is_adult(age):          # Static Method
        return age >= 18

class Dog(Animal):              # Inheritance
    def speak(self):            # Polymorphism / Method Overriding
        return f"{self.name} barks!"

dog = Dog("Buddy", 3)
print(dog.speak())              # "Buddy barks!"
```

---

## 5. Advanced Python (Decorators, Generators, Context Managers)

### Decorator Pattern
```python
from functools import wraps

def my_decorator(func):
    @wraps(func) # Preserves original function metadata (__name__, __doc__)
    def wrapper(*args, **kwargs):
        print("Before function execution")
        result = func(*args, **kwargs)
        print("After function execution")
        return result
    return wrapper

@my_decorator
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
```

### Generators & `yield`
```python
def fibonacci(limit):
    a, b = 0, 1
    for _ in range(limit):
        yield a
        a, b = b, a + b

for num in fibonacci(5):
    print(num) # 0, 1, 1, 2, 3
```

### Context Managers (`with` statement)
```python
# Custom Context Manager using class
class ManagedFile:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()

# Usage
with ManagedFile("test.txt", "w") as f:
    f.write("Hello World")
```

---

## 6. Memory Management & GIL

- **Reference Counting**: Python tracks the number of references to every object. When `ref_count == 0`, memory is immediately deallocated.
- **Garbage Collector (`gc`)**: Handles reference cycles (e.g., Object A points to Object B and B points to A) using generational garbage collection (Generations 0, 1, 2).
- **GIL (Global Interpreter Lock)**: A mutex that allows only **one thread** to execute Python bytecode at a time in CPython.
  - **I/O-Bound Tasks**: Multithreading works well (threads release GIL during I/O wait).
  - **CPU-Bound Tasks**: Use Multiprocessing (`multiprocessing` module) to bypass GIL and utilize multi-core CPUs.

---

## 7. Exception Handling & File I/O

```python
try:
    with open("data.txt", "r", encoding="utf-8") as f:
        content = f.read()
except FileNotFoundError as e:
    print(f"File not found: {e}")
except IOError as e:
    print(f"I/O error occurred: {e}")
else:
    print("File read successfully.")
finally:
    print("Execution completed.")
```

---

## 8. Built-in Modules & Packages

```python
import collections
from collections import Counter, defaultdict, deque

# Counter
counts = Counter(["apple", "banana", "apple"]) # {'apple': 2, 'banana': 1}

# Defaultdict
dd = defaultdict(list)
dd["fruits"].append("apple") # No KeyError!

# Deque (Double-Ended Queue, O(1) appends/pops from both ends)
dq = deque([1, 2, 3])
dq.appendleft(0)
dq.pop()
```

# Top 50 Python Interview Questions & Answers (2026 Edition)

A curated compilation of the 50 most frequently asked Python interview questions tailored for Freshers and Mid-Level Developers (0–5 YOE). Focuses on core mechanics, data structures, object-oriented design, memory management, concurrency, and production best practices asked in product companies and tech interviews.

---

# Table of Contents
- [Python Fundamentals (Q1 - Q15)](#python-fundamentals)
- [Data Structures (Q16 - Q25)](#data-structures)
- [Functions & Object-Oriented Programming (Q26 - Q35)](#functions--object-oriented-programming)
- [Exception Handling & Modules (Q36 - Q40)](#exception-handling--modules)
- [File Handling & Advanced Python (Q41 - Q45)](#file-handling--advanced-python)
- [Interview Coding & Advanced Concepts (Q46 - Q50)](#interview-coding--advanced-concepts)

---

# Python Fundamentals

## 1. What are the key features of Python?

**Answer:**
Python is a high-level, interpreted, dynamically typed, and multi-paradigm programming language. Key features include:
1. **Readable & Clean Syntax**: Emphasizes code readability (PEP 8 guidelines) using indentation rather than braces.
2. **Dynamically Typed**: Variable types are evaluated at runtime, eliminating boilerplate type declarations.
3. **Interpreted**: Source code is compiled into bytecode (`.pyc`) and executed by the Python Virtual Machine (PVM).
4. **Automatic Memory Management**: Features built-in reference counting and generational garbage collection.
5. **Extensive Standard Library**: Built-in modules for I/O, networking, data processing, math, and async execution.
6. **Multi-Paradigm**: Supports Procedural, Object-Oriented (OOP), and Functional programming paradigms.

---

## 2. Explain Python's memory management.

**Answer:**
Memory management in CPython is handled automatically through a private heap containing all Python objects and data structures.

1. **Private Heap**: Python manages memory in an internal heap inaccessible directly to programmers.
2. **Reference Counting**: Primary memory reclamation. Tracks reference count (`ob_refcnt`) for every object. When count drops to 0, memory is immediately freed.
3. **Garbage Collection (`gc` module)**: Resolves **cyclic references** using 3 generational queues (Generation 0, 1, 2).

---

## 3. What is the difference between `==` and `is`?

**Answer:**
- `==` (Equality Operator): Checks if the **values** of two objects are equal.
- `is` (Identity Operator): Checks if two variables refer to the **exact same memory address** (`id(a) == id(b)`).

```python
a = [1, 2]
b = [1, 2]

print(a == b) # True  (Values match)
print(a is b) # False (Different object references)
```

*Note*: Always use `is` when comparing singleton objects like `None` (`if x is None:`).

---

## 4. What are mutable and immutable objects?

**Answer:**
- **Mutable Objects**: Internal state can be modified after creation without changing memory address `id()` (e.g., `list`, `dict`, `set`).
- **Immutable Objects**: State cannot be modified after creation. Any modification creates a new object in memory (e.g., `int`, `float`, `str`, `tuple`, `frozenset`).

---

## 5. Explain Python's Pass-by-Object-Reference.

**Answer:**
Python passes function arguments by **Object Reference**:
- If you pass a **mutable object** (e.g., list) and mutate it in-place (`lst.append(100)`), changes **persist** outside the function.
- If you reassign the parameter reference (`lst = [100]`), the local pointer changes and the outer variable remains unaffected.

---

## 6. Explain Python Namespaces.

**Answer:**
A Namespace is a dictionary mapping variable names to objects, preventing naming conflicts across scopes:
1. **Built-in Namespace**: Built-in functions (`len`, `print`). Created on interpreter start.
2. **Global Namespace**: Module-level names. Created when module is imported/loaded.
3. **Enclosing Namespace**: Outer enclosing functions (closures).
4. **Local Namespace**: Defined inside current function. Created on call and destroyed on return.

---

## 7. Explain the LEGB Rule.

**Answer:**
Dictates variable lookup order in Python:
1. **L (Local)**: Inside current function or lambda.
2. **E (Enclosing)**: Enclosing outer functions (from inside out).
3. **G (Global)**: Module-level variables or `global` declared.
4. **B (Built-in)**: Pre-assigned built-in keywords/functions.

---

## 8. Compare List, Tuple, Set, and Dictionary.

**Answer:**

| Feature | List | Tuple | Set | Dictionary |
| :--- | :--- | :--- | :--- | :--- |
| **Syntax** | `[1, 2]` | `(1, 2)` | `{1, 2}` | `{'a': 1}` |
| **Mutability** | Mutable | Immutable | Mutable | Mutable |
| **Ordering** | Ordered | Ordered | Unordered | Ordered (3.7+) |
| **Duplicates** | Allowed | Allowed | Not Allowed | Keys: No, Values: Yes |
| **Search Time**| $O(N)$ | $O(N)$ | $O(1)$ avg | $O(1)$ avg |

---

## 9. Explain Shallow Copy vs Deep Copy.

**Answer:**
- **Shallow Copy (`copy.copy()`)**: Creates a new outer container, but copies references to nested child objects. Modifying nested objects affects the original.
- **Deep Copy (`copy.deepcopy()`)**: Recursively copies every child object, creating a completely independent duplicate tree.

---

## 10. What are `*args` and `**kwargs`?

**Answer:**
- `*args`: Passes a variable number of positional arguments as a `tuple`.
- `**kwargs`: Passes a variable number of keyword arguments as a `dict`.

```python
def func(*args, **kwargs):
    print(args)   # Tuple: (1, 2)
    print(kwargs)  # Dict: {'a': 3}

func(1, 2, a=3)
```

---

## 11. What is Duck Typing?

**Answer:**
A dynamic typing concept where an object's suitability is determined by the presence of specific methods/attributes, rather than explicit class inheritance.

> *"If it walks like a duck and quacks like a duck, it's a duck."*

---

## 12. Explain Dynamic Typing vs Static Typing.

**Answer:**
In Python, type checking occurs at **runtime**. Variables are generic references bound to objects; variables themselves do not carry static types.
- **Benefit**: Fast prototyping, clean syntax.
- **Mitigation**: Use Type Hints (`typing` module) and static analyzers (`mypy`) for compile-time safety.

---

## 13. Syntax Errors vs Runtime Exceptions.

**Answer:**
- **Syntax Errors**: Discovered during parsing before execution starts (e.g., missing colons).
- **Runtime Exceptions**: Occur during execution when evaluating illegal operations (e.g., `ZeroDivisionError`, `KeyError`).

---

## 14. What are Python Keywords?

**Answer:**
Reserved words that cannot be used as variable identifiers (e.g., `def`, `class`, `if`, `else`, `while`, `yield`, `async`, `await`, `lambda`, `pass`, `break`).

---

## 15. Difference between `None`, `False`, and `0`.

**Answer:**
- `None`: Singleton object of `NoneType` representing missing value (Truthy: `False`).
- `False`: Boolean value (subclass of integer `0`). `False == 0` is `True`.
- `0`: Numeric integer value zero.

---

# Data Structures

## 16. Explain List Comprehensions.

**Answer:**
Concise syntax for creating lists from iterables:

```python
# [expression for item in iterable if condition]
squares = [x**2 for x in range(10) if x % 2 == 0]
```
Faster than explicit `for` loops because iteration bytecode runs directly in C.

---

## 17. List Comprehension vs Dictionary Comprehension.

**Answer:**
- **List Comprehension**: Returns `list` enclosed in `[...]`.
- **Dict Comprehension**: Returns `dict` enclosed in `{k: v ...}`.

```python
# Dict Comprehension
lens = {word: len(word) for word in ["apple", "banana"]}
```

---

## 18. How do Sets work in Python?

**Answer:**
Sets store unique, hashable elements using an internal Hash Table. Searching (`x in set`), adding, and deleting operate in $O(1)$ average time complexity.

---

## 19. `append()` vs `extend()` vs `insert()`.

**Answer:**
- `append(obj)`: Adds `obj` as a **single element** at the end ($O(1)$).
- `extend(iterable)`: Iterates and appends **each item** from iterable at the end ($O(K)$).
- `insert(index, obj)`: Inserts `obj` at **specific index**, shifting elements ($O(N)$).

---

## 20. `remove()` vs `pop()` vs `del` vs `clear()`.

**Answer:**
- `remove(val)`: Removes first occurrence of value `val`.
- `pop(index)`: Removes and **returns** item at index (default last item).
- `del statement`: Deletes item by index/slice or deletes variable.
- `clear()`: Removes all items from list (`len == 0`).

---

## 21. Explain List Slicing.

**Answer:**
Syntax: `lst[start:stop:step]`
- Positive indices count from start (`0`), negative from end (`-1`).
- `lst[::-1]` creates a reversed copy of the list.

---

## 22. How are Dictionaries implemented internally?

**Answer:**
Implemented as memory-compact **Hash Tables** maintaining insertion order (Python 3.6+). Key hash computed via `hash(key)`. Uses Open Addressing with pseudo-random probing to resolve collisions.

---

## 23. What makes an object Hashable?

**Answer:**
An object is **hashable** if it has a constant hash value (`hash()`) during its lifecycle and supports equality (`__eq__()`). Immutable types (`int`, `str`, `tuple`) are hashable; mutable types (`list`, `dict`, `set`) are unhashable.

---

## 24. Time Complexities of Collections.

**Answer:**

| Operation | List | Dict | Set | Deque |
| :--- | :--- | :--- | :--- | :--- |
| **Search (`x in s`)**| $O(N)$ | $O(1)$ avg | $O(1)$ avg | $O(N)$ |
| **Append End** | $O(1)$ | N/A | N/A | $O(1)$ |
| **Pop Left** | $O(N)$ | N/A | N/A | $O(1)$ |

---

## 25. `deque` vs `list`.

**Answer:**
- `list`: Dynamic array. Fast random indexing ($O(1)$), but slow left inserts/pops ($O(N)$).
- `collections.deque`: Doubly Linked List. Fast $O(1)$ appends and pops from **both ends** (`appendleft()`, `popleft()`).

---

# Functions & Object-Oriented Programming

## 26. What are First-Class Functions?

**Answer:**
Functions in Python can be assigned to variables, passed as arguments to other functions, and returned from functions like any standard object.

---

## 27. What are Lambda Functions?

**Answer:**
Anonymous, single-expression inline functions (`lambda args: expression`). Best used as short arguments for higher-order functions (`map`, `filter`, `sorted`).

---

## 28. Explain Decorators.

**Answer:**
A function that takes another function as an argument and extends its behavior without modifying original code.

```python
from functools import wraps

def log_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper
```

---

## 29. Generators (`yield` vs `return`).

**Answer:**
- `return`: Terminates function and returns single result.
- `yield`: Suspends execution, returns intermediate value, and preserves state for next iteration (`next()`). Saves memory by producing items lazily.

---

## 30. Iterator vs Iterable.

**Answer:**
- **Iterable**: Object that can return members one at a time (implements `__iter__()`). Examples: `list`, `str`.
- **Iterator**: Object representing data stream (implements `__iter__()` and `__next__()`).

---

## 31. Explain OOP Principles in Python.

**Answer:**
1. **Encapsulation**: Bundling attributes/methods and restricting access (`_protected`, `__private`).
2. **Abstraction**: Hiding complex logic using Abstract Base Classes (`abc.ABC`).
3. **Inheritance**: Subclasses acquiring properties from parent classes.
4. **Polymorphism**: Overriding methods in subclasses with identical interfaces.

---

## 32. Method Overloading vs Overriding.

**Answer:**
- **Method Overloading**: Multiple methods with same name but different signatures. *Python does not support traditional overloading natively* (handled via default parameters or `*args`).
- **Method Overriding**: Child class redefining parent method.

---

## 33. Multiple Inheritance & Diamond Problem.

**Answer:**
Multiple Inheritance allows a class to inherit from multiple parent classes. Diamond Problem is resolved using **MRO (Method Resolution Order)** via C3 Linearization.

---

## 34. What is MRO and `super()`?

**Answer:**
- **MRO**: Deterministic lookup order Python follows to search for methods across inheritance trees (`Class.__mro__`).
- **`super()`**: Calls next method in MRO chain.

---

## 35. Common Magic (Dunder) Methods.

**Answer:**
- `__init__`: Instance constructor.
- `__str__`: User-friendly string representation (`str(obj)`).
- `__repr__`: Developer debugging representation (`repr(obj)`).
- `__len__`: Called by `len(obj)`.
- `__call__`: Allows instances to be called like functions (`obj()`).

---

# Exception Handling & Modules

## 36. Explain Exception Handling.

**Answer:**
`try` (test code), `except` (catch errors), `else` (runs if no exception occurs), `finally` (always runs for cleanup).

---

## 37. How to create Custom Exceptions?

**Answer:**
By inheriting from built-in `Exception` class:

```python
class CustomError(Exception):
    pass
```

---

## 38. Module vs Package.

**Answer:**
- **Module**: Single `.py` source file.
- **Package**: Directory containing multiple modules and optional `__init__.py`.

---

## 39. Explain Virtual Environments.

**Answer:**
Isolated Python environment containing independent installed packages, preventing global dependency version conflicts between projects (`venv`, `poetry`).

---

## 40. `pip` & Dependency Management.

**Answer:**
`pip` installs PyPI packages. `requirements.txt` lists explicit version dependencies; `pyproject.toml` is modern PEP 518 standard build specification.

---

# File Handling & Advanced Python

## 41. File Handling Modes.

**Answer:**
`'r'` (read), `'w'` (write/truncate), `'a'` (append), `'rb'`/`'wb'` (read/write binary).

---

## 42. Why use `with open()` (Context Managers)?

**Answer:**
Guarantees file descriptors are automatically closed upon block exit even if exceptions are raised, avoiding resource leaks.

---

## 43. `JSON` vs `Pickle`.

**Answer:**
- **`json`**: Human-readable, language-agnostic, safe text serialization.
- **`pickle`**: Python-specific binary format. Can serialize custom objects, but unsafe for untrusted inputs.

---

## 44. Multithreading & GIL.

**Answer:**
- **GIL (Global Interpreter Lock)**: Mutex preventing multiple threads from executing Python bytecode concurrently in CPython.
- **Use Case**: Multithreading works great for **I/O-bound tasks** (network/file operations) where threads release GIL during wait states.

---

## 45. Multithreading vs Multiprocessing.

**Answer:**
- **Multithreading**: Shared memory, single CPU core execution for Python bytecode due to GIL. Best for I/O tasks.
- **Multiprocessing**: Separate OS processes, bypasses GIL across multiple CPU cores. Best for CPU-bound math/data processing.

---

# Interview Coding & Advanced Concepts

## 46. Can Python execute threads in true parallel?

**Answer:**
For **CPU-bound Python code**, CPython **cannot** execute threads in parallel due to the GIL. For **I/O tasks** or **C-extensions** (`NumPy`), GIL is released, enabling true parallelism.

---

## 47. Asynchronous Programming (`asyncio`).

**Answer:**
Single-threaded cooperative concurrency using an Event Loop and `async`/`await` coroutines. Higher throughput and lower memory cost than multithreading for high-concurrency network services.

---

## 48. Higher-Order Functions (`map`, `filter`, `reduce`).

**Answer:**
- `map(func, iter)`: Applies function to every element.
- `filter(func, iter)`: Keeps elements evaluating to True.
- `reduce(func, iter)`: Cumulative aggregation (`functools.reduce`).

---

## 49. Most Useful Built-in Modules.

**Answer:**
`collections` (`Counter`, `defaultdict`, `deque`), `itertools`, `functools` (`lru_cache`), `os`/`sys`, `pathlib`, `datetime`, `json`, `re`, `typing`.

---

## 50. Best Practices for Scalable Python Backend Services.

**Answer:**
1. Use **FastAPI** / **Flask** with `async` endpoints for high I/O performance.
2. Enforce Type Hints (`typing`) and validate inputs with `Pydantic`.
3. Use Virtual Environments (`poetry`/`docker`).
4. Write unit tests using `pytest`.
5. Enforce PEP 8 formatting automatically using `ruff` or `black`.
6. Cache heavy lookups using Redis / `functools.lru_cache`.

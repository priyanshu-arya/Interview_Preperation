# Comprehensive DBMS Cheatsheet (2026 Edition)

A high-density technical reference guide for Database Management Systems covering relational architecture, ER modeling, relational algebra, functional dependencies, normalization formulas, transaction concurrency control, lock protocols, indexing (B+ Trees), and recovery algorithms.

---

## Table of Contents
1. [DBMS Architecture & ER Modeling](#1-dbms-architecture--er-modeling)
2. [Relational Algebra Operators](#2-relational-algebra-operators)
3. [Functional Dependencies & Normalization Rules](#3-functional-dependencies--normalization-rules)
4. [Transactions & ACID Properties](#4-transactions--acid-properties)
5. [Concurrency Control Protocols](#5-concurrency-control-protocols)
6. [Storage & B+ Tree Indexing](#6-storage--b-tree-indexing)
7. [Recovery Systems & Log-Based WAL](#7-recovery-systems--log-based-wal)

---

## 1. DBMS Architecture & ER Modeling

### Three-Schema Architecture (ANSI/SPARC)
```
+-------------------------------------------------------+
|  External Level (User Views / Virtual Schemas)        |
+-------------------------------------------------------+
                           |  (Logical Data Independence)
+-------------------------------------------------------+
|  Conceptual Level (Logical Schema: Tables, Constraints|
+-------------------------------------------------------+
                           |  (Physical Data Independence)
+-------------------------------------------------------+
|  Internal Level (Physical Storage, Indexes, B-Trees)  |
+-------------------------------------------------------+
```

### ER Model Symbols Summary
- **Entity**: Rectangle `[ Employee ]`
- **Weak Entity**: Double Rectangle `[[ Dependent ]]`
- **Attribute**: Oval `( Name )`
- **Key Attribute**: Oval with underlined text `( <u>SSN</u> )`
- **Multivalued Attribute**: Double Oval `(( PhoneNumbers ))`
- **Derived Attribute**: Dashed Oval `( Age )`
- **Relationship**: Diamond `< Works_For >`
- **Identifying Relationship**: Double Diamond `<< Depends_On >>`

---

## 2. Relational Algebra Operators

| Operator | Symbol | Type | Description |
| :--- | :--- | :--- | :--- |
| **Selection** | $\sigma_{condition}(R)$ | Unary | Filters rows satisfying condition |
| **Projection** | $\pi_{attr1, attr2}(R)$ | Unary | Selects specified columns (removes duplicates) |
| **Rename** | $\rho_{S(A1..An)}(R)$ | Unary | Renames relation $R$ to $S$ and columns |
| **Union** | $R \cup S$ | Binary | Combines tuples from two union-compatible relations |
| **Set Difference** | $R - S$ | Binary | Tuples in $R$ but not in $S$ |
| **Cartesian Product**| $R \times S$ | Binary | Combines every tuple of $R$ with every tuple of $S$ |
| **Natural Join** | $R \bowtie S$ | Binary | Equi-join on common attribute names |
| **Division** | $R \div S$ | Binary | Tuples in $R$ associated with **all** tuples in $S$ |

---

## 3. Functional Dependencies & Normalization Rules

### Armstrong's Axioms for FD Inference
- **Reflexivity**: If $Y \subseteq X$, then $X \rightarrow Y$.
- **Augmentation**: If $X \rightarrow Y$, then $XZ \rightarrow YZ$.
- **Transitivity**: If $X \rightarrow Y$ and $Y \rightarrow Z$, then $X \rightarrow Z$.
- **Union**: If $X \rightarrow Y$ and $X \rightarrow Z$, then $X \rightarrow YZ$.
- **Decomposition**: If $X \rightarrow YZ$, then $X \rightarrow Y$ and $X \rightarrow Z$.

### Normal Forms Summary Table

| Normal Form | Condition / Requirement | Primary Anomaly Eliminated |
| :--- | :--- | :--- |
| **1NF** | Attributes are atomic; no non-atomic arrays or repeating groups | Non-atomic values |
| **2NF** | In 1NF + No non-prime attribute is partially dependent on any candidate key | Partial Dependency |
| **3NF** | In 2NF + For every non-trivial $X \rightarrow Y$, $X$ is a Super Key **OR** $Y$ is a Prime Attribute | Transitive Dependency |
| **BCNF** | For every non-trivial $X \rightarrow Y$, $X$ must be a **Super Key** | All functional dependency anomalies |
| **4NF** | In BCNF + For every non-trivial MVD $X \twoheadrightarrow Y$, $X$ is a Super Key | Multi-Valued Dependency |
| **5NF** | Every join dependency in relation is implied by candidate keys | Join Dependency |

---

## 4. Transactions & ACID Properties

```
[ Active ] ---> [ Partially Committed ] ---> [ Committed ] (Final State)
    |                     |
    v                     v
[ Failed ] -------> [ Aborted ] (Rollback & Final State)
```

### ACID Summary
- **Atomicity**: Transaction executes completely or aborts fully ($0$ or $100\%$).
- **Consistency**: Database moves from one valid state to another, preserving all integrity constraints.
- **Isolation**: Concurrent execution results match some serial execution order.
- **Durability**: Committed updates persist permanently on disk even during crashes.

### Concurrency Read Anomalies vs Isolation Levels

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :--- | :--- | :--- | :--- |
| **Read Uncommitted** | Allowed | Allowed | Allowed |
| **Read Committed** | Prevented | Allowed | Allowed |
| **Repeatable Read** | Prevented | Prevented | Allowed |
| **Serializable** | Prevented | Prevented | Prevented |

---

## 5. Concurrency Control Protocols

### Lock Compatibility Matrix
| Requested / Held | Shared Lock (S) | Exclusive Lock (X) |
| :--- | :--- | :--- |
| **Shared Lock (S)** | OK (Granted) | Conflict (Wait) |
| **Exclusive Lock (X)** | Conflict (Wait) | Conflict (Wait) |

### Two-Phase Locking (2PL) Variants
- **Basic 2PL**: Growing phase (acquires locks) followed by Shrinking phase (releases locks). Guarantees Serializability, but susceptible to Cascading Aborts.
- **Strict 2PL**: All **Exclusive (X)** locks held until transaction commits/aborts. Guarantees Cascadeless Schedules.
- **Rigorous 2PL**: All **Shared (S)** and **Exclusive (X)** locks held until transaction commits/aborts.

### Deadlock Handling Schemes
- **Wait-Die (Non-preemptive)**: If $T_{old}$ requests resource held by $T_{young}$, $T_{old}$ waits. If $T_{young}$ requests resource held by $T_{old}$, $T_{young}$ dies (aborts).
- **Wound-Wait (Preemptive)**: If $T_{old}$ requests resource held by $T_{young}$, $T_{old}$ wounds (preempts/aborts) $T_{young}$. If $T_{young}$ requests resource held by $T_{old}$, $T_{young}$ waits.

---

## 6. Storage & B+ Tree Indexing

### B-Tree vs B+ Tree Comparison

| Feature | B-Tree | B+ Tree |
| :--- | :--- | :--- |
| **Data Pointer Storage** | Stored in Internal & Leaf nodes | Stored **only** in Leaf nodes |
| **Leaf Node Structure** | Independent nodes | Connected via **Doubly Linked List** |
| **Range Queries** | Slow (requires tree traversal) | Extremely fast (sequential leaf scan) |
| **Internal Node Fan-out** | Lower (data pointers take space) | Higher (stores only keys and node pointers) |

```
                [ 20 | 50 ]              <- Root / Internal Node (Keys only)
               /     |     \
  [ 5 | 10 ] -> [ 20 | 30 ] -> [ 50 | 70 ]  <- Leaf Nodes (Data Pointers + Linked List)
```

---

## 7. Recovery Systems & Log-Based WAL

### Write-Ahead Logging (WAL) Protocol
1. Before any data page is modified on disk, log record describing modification must be written to stable storage.
2. Before a transaction commits, all log records associated with it must be flushed to stable storage.

### ARIES Recovery Algorithm Phases
1. **Analysis Phase**: Reconstructs active transactions (Dirty Page Table and Transaction Table) at crash time.
2. **Redo Phase**: Replays all actions starting from RedoLSN to restore database to state immediately prior to crash ("Repeating History").
3. **Undo Phase**: Rolls back changes of all active, uncommitted transactions at crash time by reversing updates in reverse order using Compensation Log Records (CLRs).

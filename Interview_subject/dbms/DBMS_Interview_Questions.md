# DBMS Interview Questions & Answers

A compilation of essential Database Management Systems (DBMS) interview questions tailored for Freshers and Mid-Level Developers (0–5 YOE). Focuses on relational architecture, ER modeling, normalization (1NF–BCNF), transactions, ACID properties, indexing (B+ Trees), and concurrency control.

---

# Table of Contents
- [Module 1: DBMS Architecture & Fundamentals (Q1 - Q10)](#module-1-dbms-architecture--fundamentals)
- [Module 2: Database Design & Normalization (Q11 - Q20)](#module-2-database-design--normalization)
- [Module 3: Transactions & ACID Properties (Q21 - Q28)](#module-3-transactions--acid-properties)
- [Module 4: Concurrency Control & Recovery Systems (Q29 - Q36)](#module-4-concurrency-control--recovery-systems)
- [Module 5: Storage Structure & Indexing Mechanisms (Q37 - Q44)](#module-5-storage-structure--indexing-mechanisms)
- [Module 6: Query Processing, Distributed & NoSQL Databases (Q45 - Q50)](#module-6-query-processing-distributed--nosql-databases)

---

# Module 1: DBMS Architecture & Fundamentals

## 1. What is a DBMS and why is it preferred over File Systems?

**Answer:**
A Database Management System (DBMS) is software used to define, store, manipulate, and query database data.
- **Advantages over File Systems**:
  1. Reduces data redundancy and inconsistency.
  2. Enforces integrity constraints (`PRIMARY KEY`, `FOREIGN KEY`) at schema level.
  3. Provides transaction management and crash recovery (ACID compliance).
  4. Provides Data Independence (decoupling app code from disk layout).
  5. Supports concurrent multi-user access safely.

---

## 2. Explain Three-Schema Architecture & Data Independence.

**Answer:**
Separates user applications from physical disk storage:
- **External Level**: Individual user views/subschemas.
- **Conceptual Level**: Global logical schema (Tables, Attributes, FDs).
- **Internal Level**: Physical storage layout, file indexes, disk pages.

### Data Independence:
1. **Logical Data Independence**: Modifying Conceptual schema without altering External schemas/applications.
2. **Physical Data Independence**: Modifying Internal physical storage (indexes, disk files) without altering Conceptual schema.

---

## 3. Compare Database Models: Hierarchical, Network, Relational, Object-Oriented.

**Answer:**
- **Hierarchical**: Tree structure ($1:N$ only). Legacy navigation via parent-child pointers.
- **Network**: Graph structure ($1:N$ and $M:N$). Complex pointer navigation.
- **Relational**: Tabular relations (Rows & Cols) joined by Keys. Declarative SQL queries.
- **Object-Oriented**: Stores data directly as object instances incorporating methods and encapsulation.

---

## 4. Difference between DBMS, RDBMS, and OODBMS.

**Answer:**
- **DBMS**: Stores data as flat files or single tables without key relationships (e.g., MS Access).
- **RDBMS**: Stores data in tabular relations enforcing referential constraints via keys (e.g., PostgreSQL, MySQL).
- **OODBMS**: Stores complex objects directly as language instances without object-relational mapping overhead.

---

## 5. Explain the ER Model and Attribute Types.

**Answer:**
Conceptual model representing real-world Entities, Attributes, and Relationships.
- **Entity**: Real-world object (`Employee`).
- **Attributes**:
  - *Simple*: Atomic (`Age`).
  - *Composite*: Subdivided (`Name` $\rightarrow$ `First`, `Last`).
  - *Multivalued*: Holds multiple items (`Phone_Numbers`).
  - *Derived*: Calculated from base attributes (`Age` from `DOB`).

---

## 6. Strong Entity Set vs Weak Entity Set.

**Answer:**
- **Strong Entity Set**: Possesses a Primary Key to uniquely identify records (`[ Employee ]`).
- **Weak Entity Set**: Lacks a primary key of its own. Identified by combining the Owner entity's Primary Key + Weak entity's **Discriminator Key** (`[[ Dependent ]]`).

---

## 7. Extended ER Features: Specialization, Generalization, Aggregation.

**Answer:**
- **Specialization**: Top-down division of a high-level entity into sub-entities (`Employee` $\rightarrow$ `Engineer`, `Manager`).
- **Generalization**: Bottom-up synthesis of multiple low-level entities into a higher-level entity (`Car`, `Truck` $\rightarrow$ `Vehicle`).
- **Aggregation**: Treating a relationship set as a higher-level entity set so it can participate in another relationship.

---

## 8. Relational Integrity Constraints.

**Answer:**
1. **Domain Constraint**: Values must belong to valid column data domain.
2. **Key Constraint**: Candidate keys uniquely identify tuples.
3. **Entity Integrity**: Primary Key columns cannot be `NULL`.
4. **Referential Integrity**: Foreign Key values must match a valid parent Primary Key or be `NULL`.

---

## 9. Relational Algebra Fundamental Operators.

**Answer:**
- Selection ($\sigma_{condition}(R)$): Filters matching rows.
- Projection ($\pi_{attrs}(R)$): Selects specified columns (eliminates duplicates).
- Cartesian Product ($R \times S$): Combines every tuple of $R$ with $S$.
- Union ($R \cup S$): Combines tuples from union-compatible relations.
- Set Difference ($R - S$): Tuples in $R$ but not in $S$.
- Rename ($\rho_{S}(R)$): Renames relation $R$ to $S$.

---

## 10. Relational Algebra vs Relational Calculus.

**Answer:**
- **Relational Algebra**: **Procedural** query language. Specifies **how** to compute query results step-by-step.
- **Relational Calculus**: **Non-procedural (Declarative)** language. Specifies **what** data to retrieve (Tuple Relational Calculus TRC / Domain Relational Calculus DRC).

---

# Module 2: Database Design & Normalization

## 11. Functional Dependencies & Armstrong's Axioms.

**Answer:**
A Functional Dependency $X \rightarrow Y$ states that if two tuples agree on attribute $X$, they must agree on $Y$.
- **Armstrong's Axioms**:
  - *Reflexivity*: If $Y \subseteq X$, then $X \rightarrow Y$.
  - *Augmentation*: If $X \rightarrow Y$, then $XZ \rightarrow YZ$.
  - *Transitivity*: If $X \rightarrow Y$ and $Y \rightarrow Z$, then $X \rightarrow Z$.

---

## 12. Attribute Closure & Candidate Key Determination.

**Answer:**
- **Attribute Closure ($X^+$)**: Set of all attributes functionally determined by $X$.
- **Candidate Key**: Minimal Super Key whose closure $(X)^+$ contains **all** attributes of relation $R$.

---

## 13. What is Normalization and Modification Anomalies?

**Answer:**
Process of organizing relation attributes to minimize redundancy and eliminate:
1. **Insertion Anomaly**: Cannot insert a record without dummy values for unrelated fields.
2. **Deletion Anomaly**: Losing unintended attributes when deleting an unrelated tuple.
3. **Update Anomaly**: Inconsistent state from updating redundant data in some rows while missing others.

---

## 14. First Normal Form (1NF).

**Answer:**
A relation is in **1NF** if all attribute domains contain only **atomic (indivisible) values**, with no multi-valued arrays or repeating groups.

---

## 15. Second Normal Form (2NF) & Partial Dependency.

**Answer:**
A relation is in **2NF** if it is in 1NF and no non-prime attribute is **partially dependent** on any candidate key ($X \rightarrow A$ where $X$ is a proper subset of a candidate key).

---

## 16. Third Normal Form (3NF) & Transitive Dependency.

**Answer:**
A relation is in **3NF** if for every non-trivial FD $X \rightarrow Y$:
1. $X$ is a **Super Key**, OR
2. $Y$ is a **Prime Attribute**.
Eliminates transitive dependencies ($A \rightarrow B \rightarrow C$).

---

## 17. BCNF (Boyce-Codd Normal Form) vs 3NF.

**Answer:**
BCNF is a stricter version of 3NF.
- **BCNF Rule**: For every non-trivial FD $X \rightarrow Y$, **$X$ MUST be a Super Key** (drops the prime attribute exception of 3NF).

---

## 18. Fourth Normal Form (4NF) & Multi-Valued Dependency.

**Answer:**
Multi-Valued Dependency $X \twoheadrightarrow Y$ occurs when $X$ determines a set of values for $Y$ independently. 4NF eliminates MVD redundancies.

---

## 19. Fifth Normal Form (5NF / Project-Join Normal Form).

**Answer:**
A relation is in 5NF if it cannot be non-loss decomposed into smaller relations unless all join dependencies are implied by candidate keys.

---

## 20. Lossless-Join vs Dependency-Preserving Decomposition.

**Answer:**
- **Lossless-Join**: Decomposing $R$ into $R_1, R_2$ is lossless if joining them reconstructs exact original relation ($R_1 \cap R_2 \rightarrow R_1$ or $R_2$).
- **Dependency-Preserving**: Enforces original FDs across sub-relations without multi-table join calculations.

---

# Module 3: Transactions & ACID Properties

## 21. Database Transaction States.

**Answer:**
`Active` $\rightarrow$ `Partially Committed` $\rightarrow$ `Committed` (Final State).
If errors occur: `Failed` $\rightarrow$ `Aborted` (Rolled back to baseline).

---

## 22. ACID Properties Deep Dive.

**Answer:**
- **Atomicity**: All operations execute or all roll back ($0$ or $100\%$).
- **Consistency**: Database moves from one valid state to another.
- **Isolation**: Concurrent execution results equal a serial order.
- **Durability**: Committed updates persist on disk even during crashes.

---

## 23. Concurrent Read Anomalies.

**Answer:**
1. **Dirty Read**: Reading uncommitted data written by another transaction.
2. **Non-Repeatable Read**: Re-reading a row and finding modified values.
3. **Phantom Read**: Re-running range query and finding newly inserted rows.
4. **Lost Update**: Concurrent updates overwrite each other.

---

## 24. Transaction Isolation Levels.

**Answer:**
- Read Uncommitted (Allows Dirty Reads).
- Read Committed (Prevents Dirty Reads).
- Repeatable Read (Prevents Dirty & Non-Repeatable Reads).
- Serializable (Prevents all read anomalies).

---

## 25. Conflict Serializability & Precedence Graphs.

**Answer:**
A schedule is Conflict Serializable if transformed to a serial schedule by swapping non-conflicting operations.
- **Precedence Graph**: Draw directed edge $T_i \rightarrow T_j$ for conflicting operations where $T_i$ executes before $T_j$. If graph has **no cycles**, schedule is Conflict Serializable.

---

## 26. View Serializability vs Conflict Serializability.

**Answer:**
All Conflict Serializable schedules are View Serializable. Testing Conflict Serializability takes $O(V+E)$ time; testing View Serializability is **NP-Complete**.

---

## 27. Recoverable, Cascadeless, and Strict Schedules.

**Answer:**
- **Recoverable**: If $T_j$ reads data written by $T_i$, $T_j$ MUST commit **after** $T_i$ commits.
- **Cascadeless**: $T_j$ cannot read data written by $T_i$ until $T_i$ commits.
- **Strict**: $T_j$ cannot read or write data written by $T_i$ until $T_i$ commits.

---

## 28. Write-Ahead Logging (WAL) Protocol.

**Answer:**
1. Log modifications flushed to disk **before** dirty data page is written to disk.
2. All transaction log records flushed before marking transaction **Committed**.

---

# Module 4: Concurrency Control & Recovery Systems

## 29. Lock-Based Concurrency Control (Shared vs Exclusive).

**Answer:**
- **Shared Lock (S)**: Read operation lock. Multiple transactions can hold S-locks concurrently.
- **Exclusive Lock (X)**: Write operation lock. Only one transaction can hold X-lock.

---

## 30. Two-Phase Locking (2PL) Protocols.

**Answer:**
- **Basic 2PL**: Growing Phase (acquire locks) $\rightarrow$ Shrinking Phase (release locks). Guarantees serializability.
- **Strict 2PL**: All **Exclusive (X)** locks held until commit/abort. Guarantees Cascadeless schedules.
- **Rigorous 2PL**: All **Shared (S)** and **Exclusive (X)** locks held until commit/abort.

---

## 31. Deadlock Handling: Wait-Die vs Wound-Wait.

**Answer:**
- **Wait-Die (Non-preemptive)**: If $T_{old}$ requests lock held by $T_{young} \rightarrow T_{old}$ **waits**. If $T_{young}$ requests lock held by $T_{old} \rightarrow T_{young}$ **dies**.
- **Wound-Wait (Preemptive)**: If $T_{old}$ requests lock held by $T_{young} \rightarrow T_{old}$ **wounds (aborts)** $T_{young}$. If $T_{young}$ requests lock held by $T_{old} \rightarrow T_{young}$ **waits**.

---

## 32. Multiple Granularity Locking & Intent Locks.

**Answer:**
Allows locking items at Database, Table, Page, or Row levels. Intent locks (`IS`, `IX`, `SIX`) signal lower-level locking intentions.

---

## 33. Timestamp Ordering & Thomas Write Rule.

**Answer:**
Orders operations strictly by transaction timestamps. **Thomas Write Rule**: Ignores/discards a write if a younger transaction has already written the data item.

---

## 34. Optimistic (Validation-Based) Concurrency Control.

**Answer:**
3 Phases: Read Phase (workspace write) $\rightarrow$ Validation Phase (conflict check) $\rightarrow$ Write Phase (flush to DB).

---

## 35. Checkpointing in Recovery.

**Answer:**
Flushes dirty RAM pages to disk and writes `<CHECKPOINT>` log record, allowing recovery to skip scanning historical committed logs.

---

## 36. ARIES Recovery Algorithm.

**Answer:**
3 Phases:
1. **Analysis Phase**: Reconstructs active transactions and dirty pages at crash time.
2. **Redo Phase**: Replays all logged operations forward ("Repeating History").
3. **Undo Phase**: Rolls back operations of uncommitted transactions in reverse log order.

---

# Module 5: Storage Structure & Indexing Mechanisms

## 37. Heap vs Sequential vs Hashed File Organization.

**Answer:**
- Heap File: Fast $O(1)$ append, slow $O(N)$ search.
- Sequential File: Fast binary search $O(\log N)$, slow record shifts on insert.
- Hashed File: Fast $O(1)$ bucket lookup/insert, slow range scans.

---

## 38. Buffer Manager Mechanics.

**Answer:**
Manages RAM buffer pool frames for disk pages using Pin Count (active users) and Dirty Bit (modified page flag) via replacement policies (LRU/Clock).

---

## 39. Primary vs Secondary vs Clustered Index.

**Answer:**
- Primary Index: Built on Primary Key of physically sorted file.
- Clustered Index: Built on non-key field of physically sorted file (Max 1 per table).
- Secondary Index: Built on un-ordered field. Leaves point to data blocks (Multiple allowed).

---

## 40. B-Tree Index Structure.

**Answer:**
Self-balancing $m$-way search tree. Internal nodes store keys **and** data pointers. All leaves appear at equal depth.

---

## 41. B-Tree vs B+ Tree Indexing.

**Answer:**
- **B-Tree**: Data pointers stored in internal and leaf nodes. Range scans require tree traversals.
- **B+ Tree**: Data pointers stored **only in leaf nodes**. Leaf nodes connected via **Doubly Linked List** for fast $O(1)$ sequential range scans. Higher fan-out.

---

## 42. Extendible Hashing vs Linear Hashing.

**Answer:**
- Extendible Hashing: Uses a directory of pointers that doubles in size when global depth expands.
- Linear Hashing: Expands bucket by bucket incrementally without directory pointers.

---

## 43. Bitmap vs B-Tree Indexing.

**Answer:**
- Bitmap Index: Uses bit arrays (0/1). Ideal for low-cardinality columns (`Gender`) in Data Warehouses (OLAP).
- B-Tree Index: Ideal for high-cardinality columns (`SSN`, `ID`) in Transactional databases (OLTP).

---

## 44. R-Tree Spatial Indexing.

**Answer:**
Tree structure indexing multi-dimensional spatial data (coordinates/GIS) using Minimum Bounding Rectangles (MBRs).

---

# Module 6: Query Processing, Distributed & NoSQL Databases

## 45. Query Processing Steps.

**Answer:**
SQL Query $\rightarrow$ Parser & Translator $\rightarrow$ Relational Algebra Expression $\rightarrow$ Query Optimizer $\rightarrow$ Execution Engine.

---

## 46. Cost-Based Query Optimization (CBO).

**Answer:**
Evaluates equivalent execution plans, estimates CPU/disk I/O cost using catalog statistics, and selects the lowest cost plan.

---

## 47. CAP Theorem.

**Answer:**
A distributed database can simultaneously provide at most two of: **Consistency (C)**, **Availability (A)**, and **Partition Tolerance (P)**.

---

## 48. Two-Phase Commit (2PC) Protocol.

**Answer:**
Distributed transaction atomic commit protocol:
1. Prepare Phase (Coordinator requests votes).
2. Commit Phase (Coordinator sends Global Commit or Abort based on votes).

---

## 49. Horizontal vs Vertical Sharding.

**Answer:**
- Horizontal Sharding: Splitting table **rows** across servers based on Shard Key.
- Vertical Partitioning: Splitting table **columns** across servers.

---

## 50. SQL vs NoSQL Architectures.

**Answer:**
- **SQL**: Tabular relations, rigid schemas, vertical scaling, strict ACID compliance.
- **NoSQL**: Flexible document/key-value models, horizontal scaling, BASE compliance (Eventual Consistency).

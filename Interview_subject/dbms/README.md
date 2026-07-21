# DBMS Interview Question Bank

> **DBMS Interview Questions for Freshers, Data Engineers & Backend Developers**

This repository contains a preparation guide for Database Management Systems (DBMS), covering relational architecture, ER modeling, relational algebra, functional dependencies, 1NF to BCNF normalization, transaction concurrency control, lock protocols, B+ Trees, and crash recovery.

---

## Resource Modules

| Module | Description | Target Use Case |
| :--- | :--- | :--- |
| ⚡ [DBMS Cheatsheet](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Cheatsheet.md) | Reference guide for Three-Schema Architecture, Relational Algebra, Armstrong's Axioms, Normalization Rules, ACID, 2PL, and B+ Trees. | Quick revision before interview |
| ❓ [DBMS Interview Questions](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md) | Theoretical, algorithmic, and architectural questions with detailed technical answers across core modules. | Core concept mastery |
| 💻 [DBMS Practice Problems](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md) | Practical design/algorithm problems (Closure, 3NF/BCNF Decomposition, Precedence Graphs, B+ Tree trace, 2PL, WAL/ARIES recovery) with step-by-step solutions. | Technical problem-solving rounds |

---

# Table of Contents

- [Module 1: DBMS Architecture & Fundamentals](#module-1-dbms-architecture--fundamentals)
- [Module 2: Database Design & Normalization](#module-2-database-design--normalization)
- [Module 3: Transactions & ACID Properties](#module-3-transactions--acid-properties)
- [Module 4: Concurrency Control & Recovery Systems](#module-4-concurrency-control--recovery-systems)
- [Module 5: Storage Structure & Indexing Mechanisms](#module-5-storage-structure--indexing-mechanisms)
- [Module 6: Query Processing, Distributed & NoSQL Databases](#module-6-query-processing-distributed--nosql-databases)
- [DBMS Practice Problems](#dbms-practice-problems)
- [Recommended Learning Path](#recommended-learning-path)

---

# Quick Topic Map & Navigation

## Module 1: DBMS Architecture & Fundamentals
1. [DBMS vs File Processing System](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#1-what-is-a-dbms-and-why-is-it-preferred-over-file-systems)
2. [Three-Schema Architecture & Data Independence](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#2-explain-three-schema-architecture--data-independence)
3. [Database Models Comparison](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#3-compare-database-models-hierarchical-network-relational-object-oriented)
4. [DBMS vs RDBMS vs OODBMS](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#4-difference-between-dbms-rdbms-and-oodbms)
5. [ER Model & Attributes](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#5-explain-the-er-model-and-attribute-types)
6. [Strong vs Weak Entity Sets](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#6-strong-entity-set-vs-weak-entity-set)
7. [Extended ER Features](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#7-extended-er-features-specialization-generalization-aggregation)
8. [Relational Integrity Constraints](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#8-relational-integrity-constraints)
9. [Relational Algebra Fundamental Operators](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#9-relational-algebra-fundamental-operators)
10. [Relational Algebra vs Relational Calculus](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#10-relational-algebra-vs-relational-calculus)

## Module 2: Database Design & Normalization
11. [Functional Dependencies & Armstrong's Axioms](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#11-functional-dependencies--armstrongs-axioms)
12. [Attribute Closure & Candidate Keys](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#12-attribute-closure--candidate-key-determination)
13. [Normalization & Modification Anomalies](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#13-what-is-normalization-and-modification-anomalies)
14. [First Normal Form (1NF)](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#14-first-normal-form-1nf)
15. [Second Normal Form (2NF)](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#15-second-normal-form-2nf--partial-dependency)
16. [Third Normal Form (3NF)](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#16-third-normal-form-3nf--transitive-dependency)
17. [BCNF vs 3NF](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#17-bcnf-boyce-codd-normal-form-vs-3nf)
18. [4NF & Multi-Valued Dependency](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#18-fourth-normal-form-4nf--multi-valued-dependency)
19. [5NF & Join Dependency](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#19-fifth-normal-form-5nf--project-join-normal-form)
20. [Lossless-Join vs Dependency-Preserving Decomposition](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#20-lossless-join-vs-dependency-preserving-decomposition)

## Module 3: Transactions & ACID Properties
21. [Database Transaction States](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#21-database-transaction-states)
22. [ACID Properties Deep Dive](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#22-acid-properties-deep-dive)
23. [Concurrent Read Anomalies](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#23-concurrent-read-anomalies)
24. [Transaction Isolation Levels](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#24-transaction-isolation-levels)
25. [Conflict Serializability & Precedence Graphs](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#25-conflict-serializability--precedence-graphs)
26. [View Serializability vs Conflict Serializability](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#26-view-serializability-vs-conflict-serializability)
27. [Recoverable, Cascadeless, and Strict Schedules](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#27-recoverable-cascadeless-and-strict-schedules)
28. [Write-Ahead Logging (WAL)](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#28-write-ahead-logging-wal-protocol)

## Module 4: Concurrency Control & Recovery Systems
29. [Lock-Based Concurrency Control](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#29-lock-based-concurrency-control-shared-vs-exclusive)
30. [Two-Phase Locking (2PL) Protocols](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#30-two-phase-locking-2pl-protocols)
31. [Deadlock Handling: Wait-Die vs Wound-Wait](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#31-deadlock-handling-wait-die-vs-wound-wait)
32. [Multiple Granularity Locking & Intent Locks](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#32-multiple-granularity-locking--intent-locks)
33. [Timestamp Ordering & Thomas Write Rule](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#33-timestamp-ordering--thomas-write-rule)
34. [Optimistic Concurrency Control](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#34-optimistic-validation-based-concurrency-control)
35. [Checkpointing in Recovery Systems](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#35-checkpointing-in-recovery)
36. [ARIES Recovery Algorithm](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#36-aries-recovery-algorithm)

## Module 5: Storage Structure & Indexing Mechanisms
37. [Heap vs Sequential vs Hashed File Organization](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#37-heap-vs-sequential-vs-hashed-file-organization)
38. [Buffer Manager Mechanics](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#38-buffer-manager-mechanics)
39. [Primary vs Secondary vs Clustered Index](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#39-primary-vs-secondary-vs-clustered-index)
40. [B-Tree Index Structure](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#40-b-tree-index-structure)
41. [B-Tree vs B+ Tree Indexing](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#41-b-tree-vs-b-tree-indexing)
42. [Extendible vs Linear Hashing](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#42-extendible-hashing-vs-linear-hashing)
43. [Bitmap vs B-Tree Indexing](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#43-bitmap-vs-b-tree-indexing)
44. [R-Tree Spatial Indexing](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#44-r-tree-spatial-indexing)

## Module 6: Query Processing, Distributed & NoSQL Databases
45. [Query Processing Steps](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#45-query-processing-steps)
46. [Cost-Based Query Optimization (CBO)](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#46-cost-based-query-optimization-cbo)
47. [CAP Theorem in Distributed Databases](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#47-cap-theorem)
48. [Two-Phase Commit (2PC) Protocol](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#48-two-phase-commit-2pc-protocol)
49. [Horizontal vs Vertical Sharding](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#49-horizontal-vs-vertical-sharding)
50. [SQL vs NoSQL Architectures](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Interview_Questions.md#50-sql-vs-nosql-architectures)

---

# Practice Problems Quick Index

Practice step-by-step calculations in [DBMS Practice Problems](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md):

1. [Attribute Closure & Candidate Key Determination](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md#1-attribute-closure--candidate-key-determination)
2. [3NF & BCNF Decomposition Step-by-Step](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md#2-3nf--bcnf-decomposition-step-by-step)
3. [Conflict Serializability & Precedence Graph Analysis](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md#3-conflict-serializability--precedence-graph-analysis)
4. [Recoverability & Cascadeless Schedule Verification](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md#4-recoverability--cascadeless-schedule-verification)
5. [B+ Tree Insertion Step-by-Step Trace](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md#5-b-tree-insertion-step-by-step-trace)
6. [Two-Phase Locking (2PL) Protocol Analysis](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md#6-two-phase-locking-2pl-protocol-analysis)
7. [ER Diagram to Relational Schema Conversion](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md#7-er-diagram-to-relational-schema-conversion)
8. [WAL Log Recovery & ARIES Crash Analysis](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md#8-wal-log-recovery--aries-crash-analysis)
9. [Relational Algebra Query Optimization Trees](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md#9-relational-algebra-query-optimization-trees)
10. [Horizontal Database Sharding Key Calculation](file:///s:/Interview_Preperation/Interview_subject/dbms/DBMS_Practice_Problems.md#10-horizontal-database-sharding-key-calculation)

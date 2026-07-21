# Top 60 SQL Interview Questions & Answers (2026 Edition)

A high-yield, curated compilation of the 60 most frequently asked SQL interview questions for Freshers and Mid-Level Developers (0–5 YOE). Focuses on core concepts, practical query logic, index optimization, and transaction mechanics asked in product and enterprise company interviews.

---

## Table of Contents
- [Part 1: Core SQL Fundamentals (Q1 - Q15)](#part-1-core-sql-fundamentals-q1---q15)
- [Part 2: Joins, Subqueries & CTEs (Q16 - Q30)](#part-2-joins-subqueries--ctes-q16---q30)
- [Part 3: Aggregations & Window Functions (Q31 - Q42)](#part-3-aggregations--window-functions-q31---q42)
- [Part 4: Database Indexing & Performance Optimization (Q43 - Q52)](#part-4-database-indexing--performance-optimization-q43---q52)
- [Part 5: Transactions, ACID & Security (Q53 - Q60)](#part-5-transactions-acid--security-q53---q60)

---

## Part 1: Core SQL Fundamentals (Q1 - Q15)

### Q1: What is SQL and why is it essential for developers?
**Answer:**
SQL (Structured Query Language) is the standard language used to interact with Relational Database Management Systems (RDBMS). It provides declarative commands to perform CRUD (Create, Read, Update, Delete) operations, join relational data, and manipulate database objects efficiently without manual file navigation.

---

### Q2: What is the difference between SQL and NoSQL databases?
**Answer:**
- **SQL (Relational)**: Structured, schema-driven, enforces ACID compliance, uses tables with rows/columns (e.g., PostgreSQL, MySQL). Best for complex joins, transactional safety, and structured financial/core entity data.
- **NoSQL (Non-Relational)**: Schema-less/flexible, horizontally scalable, supports Document, Key-Value, or Columnar stores (e.g., MongoDB, Redis). Best for unstructured data, dynamic fields, and massive real-time event streams.

---

### Q3: What are the main categories of SQL commands?
**Answer:**
1. **DDL (Data Definition Language)**: Defines/modifies schema objects (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`).
2. **DML (Data Manipulation Language)**: Modifies data records (`INSERT`, `UPDATE`, `DELETE`).
3. **DQL (Data Query Language)**: Queries data (`SELECT`).
4. **TCL (Transaction Control Language)**: Manages transactions (`COMMIT`, `ROLLBACK`, `SAVEPOINT`).
5. **DCL (Data Control Language)**: Manages permissions (`GRANT`, `REVOKE`).

---

### Q4: What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?
**Answer:**

| Feature | `DELETE` | `TRUNCATE` | `DROP` |
| :--- | :--- | :--- | :--- |
| **Type** | DML | DDL | DDL |
| **Operation** | Deletes specific or all rows | Deletes all rows | Removes data + table structure |
| **`WHERE` Clause**| Supported | Not Supported | Not Supported |
| **Speed** | Slower (logs row-by-row) | Very Fast (deallocates pages)| Very Fast |
| **Identity Reset**| Does not reset auto-increment| Resets auto-increment seed | Deletes identity sequence |

---

### Q5: What is a Primary Key vs Foreign Key?
**Answer:**
- **Primary Key (PK)**: Uniquely identifies each row in a table. Cannot contain `NULL` values. Automatically creates a clustered index in most database engines.
- **Foreign Key (FK)**: A column in a child table referencing the Primary Key of a parent table, maintaining referential integrity between relations.

---

### Q6: What is the difference between `WHERE` and `HAVING` clauses?
**Answer:**
- **`WHERE`**: Filters individual rows **before** `GROUP BY` aggregation occurs. Cannot evaluate aggregate functions (`SUM`, `AVG`, `COUNT`).
- **`HAVING`**: Filters summary groups **after** `GROUP BY` aggregation occurs. Evaluates aggregate conditions (`HAVING COUNT(*) > 5`).

---

### Q7: What is the logical execution order of an SQL query?
**Answer:**
1. `FROM` & `JOIN` (Identifies base tables & join matches)
2. `WHERE` (Filters raw individual rows)
3. `GROUP BY` (Aggregates rows into groups)
4. `HAVING` (Filters summary groups)
5. `SELECT` (Computes projected output columns/expressions)
6. `DISTINCT` (Removes duplicate result rows)
7. `ORDER BY` (Sorts the final result set)
8. `LIMIT` / `OFFSET` (Restricts output row count)

---

### Q8: How does SQL handle `NULL` values?
**Answer:**
`NULL` represents an unknown or missing value.
- Equal (`=`) or unequal (`!=`) comparisons with `NULL` evaluate to `UNKNOWN` (Three-Valued Logic).
- Must use `IS NULL` or `IS NOT NULL`.
- Aggregate functions (`AVG`, `SUM`, `COUNT(column)`) ignore `NULL` values, except `COUNT(*)`.

---

### Q9: What is the difference between `COUNT(*)`, `COUNT(column)`, and `COUNT(DISTINCT column)`?
**Answer:**
- `COUNT(*)`: Counts all rows in the dataset, including `NULL` values and duplicates.
- `COUNT(column)`: Counts all non-null values in the specified column.
- `COUNT(DISTINCT column)`: Counts unique, non-null values in the specified column.

---

### Q10: What is `COALESCE()` and how does it differ from `NULLIF()`?
**Answer:**
- **`COALESCE(v1, v2, ...)`**: Returns the first non-null argument in the list.
- **`NULLIF(v1, v2)`**: Returns `NULL` if `v1 = v2`; otherwise returns `v1`. Frequently used to prevent division-by-zero (`total / NULLIF(qty, 0)`).

---

### Q11: What is the difference between `UNION` and `UNION ALL`?
**Answer:**
- **`UNION`**: Combines result sets of two queries and removes duplicate rows (requires sorting/hashing overhead).
- **`UNION ALL`**: Combines result sets of two queries **without** removing duplicates (significantly faster execution).

---

### Q12: What is the difference between `CHAR` and `VARCHAR`?
**Answer:**
- **`CHAR(n)`**: Fixed-length string. Right-pads spaces if input string is shorter than `n`.
- **`VARCHAR(n)`**: Variable-length string. Stores only actual characters plus 1-2 length bytes, saving storage space.

---

### Q13: What is a Composite Key?
**Answer:**
A Primary Key composed of two or more columns used to uniquely identify a record when no single column is sufficient.

```sql
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);
```

---

### Q14: How do `BETWEEN` and `IN` operators work?
**Answer:**
- `BETWEEN low AND high`: Inclusive range filter (`val >= low AND val <= high`).
- `IN (val1, val2, ...)`: Discrete list matching (`val = val1 OR val = val2`).

---

### Q15: What is Pattern Matching in SQL (`LIKE` wildcards)?
**Answer:**
- `%`: Matches zero or more characters (`LIKE 'A%'` starts with A).
- `_`: Matches exactly one single character (`LIKE '_a%'` second character is a).

---

## Part 2: Joins, Subqueries & CTEs (Q16 - Q30)

### Q16: What are the primary types of SQL JOINs?
**Answer:**
1. **`INNER JOIN`**: Returns matching records in both tables.
2. **`LEFT JOIN`**: Returns all records from left table and matching records from right table (filling non-matches with `NULL`).
3. **`RIGHT JOIN`**: Returns all records from right table and matching records from left table.
4. **`FULL OUTER JOIN`**: Returns all records when a match exists in either table.
5. **`CROSS JOIN`**: Cartesian product of two tables ($M \times N$ rows).
6. **`SELF JOIN`**: Joins a table to itself using aliases.

---

### Q17: What is a `SELF JOIN` and when would you use it?
**Answer:**
A `SELF JOIN` joins a table with itself. Used to query hierarchical structures within a single table (e.g., finding Employee-Manager relationships or comparing consecutive sales rows).

```sql
SELECT e.name AS Employee, m.name AS Manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

---

### Q18: What is the difference between a Subquery and a CTE?
**Answer:**
- **Subquery**: Inline nested query inside `WHERE`, `FROM`, or `SELECT` clauses. Can be unreadable when deeply nested.
- **CTE (Common Table Expression)**: Defined at top of statement using `WITH cte_name AS (...)`. Modular, readable, reusable multiple times in same query, and supports recursion.

---

### Q19: What is a Correlated Subquery and why can it slow down performance?
**Answer:**
A Correlated Subquery references columns from the outer query:

```sql
SELECT e.name, e.salary
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);
```
It can be slow because the inner query evaluates **once per candidate row** of the outer query ($O(N^2)$ scan overhead), unless optimized by the query engine into a Hash Join.

---

### Q20: What is the difference between `EXISTS` and `IN`?
**Answer:**
- **`IN`**: Evaluates the subquery completely first, building an in-memory list of values. Slower if subquery returns a large dataset.
- **`EXISTS`**: Returns a boolean `TRUE` as soon as it finds the first matching row in the subquery (short-circuit evaluation). Typically faster for large subquery checks.

---

### Q21: What is a Recursive CTE?
**Answer:**
A CTE that references itself to iteratively traverse hierarchical or tree-structured data (e.g., org charts, bill of materials). Consists of an **Anchor Member**, `UNION ALL`, and a **Recursive Member**.

---

### Q22: What happens if a `NOT IN` subquery contains a `NULL` value?
**Answer:**
If the `NOT IN` subquery returns even a single `NULL`, the entire query returns **zero rows** because `val != NULL` evaluates to `UNKNOWN`. Always use `NOT EXISTS` or `LEFT JOIN ... WHERE key IS NULL` to avoid this bug.

---

### Q23: What is the difference between `ON` clause condition and `WHERE` clause condition in `LEFT JOIN`?
**Answer:**
- **Condition in `ON`**: Filters right table rows **before** joining; all left table rows are still returned.
- **Condition in `WHERE`**: Filters final result set **after** joining. Filtering a right table column (`WHERE r.status = 'Active'`) turns `LEFT JOIN` into `INNER JOIN`.

---

### Q24: What is an Anti-Join and how is it implemented?
**Answer:**
An Anti-Join returns rows from the left table that have **no matching rows** in the right table.
Implemented via `LEFT JOIN ... WHERE right.id IS NULL` or `NOT EXISTS`.

---

### Q25: What is a Semi-Join?
**Answer:**
A Semi-Join returns rows from the left table if at least one match exists in the right table, without duplicating left table rows or returning right table columns (using `EXISTS` or `IN`).

---

### Q26: What is a Database View?
**Answer:**
A View is a virtual table defined by a saved SQL query. It does not store data physically (unless materialized). Used to simplify complex queries, enforce security column filtering, and centralize business metrics.

---

### Q27: What is a Materialized View?
**Answer:**
A Materialized View physically stores query results on disk and refreshes them periodically. Unlike regular views, it provides sub-second analytical read performance at the expense of storage and data freshness latency.

---

### Q28: What is a Temporary Table?
**Answer:**
A Temporary Table (`CREATE TEMPORARY TABLE`) exists only during the session/transaction lifetime and is automatically dropped upon connection closure. Used to hold intermediate data during complex multi-step ETL scripts.

---

### Q29: How do you rewrite subqueries to improve performance?
**Answer:**
Convert heavy correlated subqueries or `IN` clauses into `INNER JOIN` / `LEFT JOIN` or CTEs with Window Functions, allowing the query optimizer to utilize indexed joins and parallel execution plans.

---

### Q30: What is the difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`?
**Answer:**
For tie values `(100, 100, 90)`:
- `ROW_NUMBER()`: Assigns unique sequential numbers (1, 2, 3).
- `RANK()`: Assigns same rank to ties, skips next rank numbers (1, 1, 3).
- `DENSE_RANK()`: Assigns same rank to ties, does **not** skip numbers (1, 1, 2).

---

## Part 3: Aggregations & Window Functions (Q31 - Q42)

### Q31: What is a Window Function in SQL?
**Answer:**
A Window Function performs calculations across related table rows ("window") defined by `OVER (...)` while **retaining individual detail rows** in the output (unlike `GROUP BY`, which collapses rows).

---

### Q32: How do you find the Nth highest salary in SQL?
**Answer:**
Using `DENSE_RANK()` inside a CTE:

```sql
WITH RankedSalaries AS (
    SELECT name, salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
    FROM employees
)
SELECT name, salary FROM RankedSalaries WHERE rnk = N;
```

---

### Q33: How do `LAG()` and `LEAD()` functions work?
**Answer:**
- `LAG(col, offset)`: Accesses data from a preceding row in the window. Used for Month-over-Month (MoM) growth.
- `LEAD(col, offset)`: Accesses data from a subsequent row in the window. Used for calculating dwell times between events.

---

### Q34: How do you calculate a Running Total in SQL?
**Answer:**
```sql
SELECT sales_date, amount,
       SUM(amount) OVER (ORDER BY sales_date) AS running_total
FROM sales;
```

---

### Q35: How do you calculate a 7-day Moving Average in SQL?
**Answer:**
```sql
SELECT sales_date, amount,
       AVG(amount) OVER (
           ORDER BY sales_date 
           ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ) AS moving_avg_7d
FROM daily_sales;
```

---

### Q36: Can window functions be used inside `WHERE` or `HAVING` clauses?
**Answer:**
**No.** Window functions evaluate in Step 5 (`SELECT` phase) of logical query execution, which happens *after* `WHERE` (Step 2) and `HAVING` (Step 4). Must wrap the window function in a CTE or subquery to filter on it.

---

### Q37: How do you find duplicate rows in a table?
**Answer:**
```sql
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

---

### Q38: How do you delete duplicate rows while keeping only one copy?
**Answer:**
```sql
WITH CTE_Duplicates AS (
    SELECT id, email,
           ROW_NUMBER() OVER (PARTITION BY email ORDER BY id ASC) AS rn
    FROM users
)
DELETE FROM CTE_Duplicates WHERE rn > 1;
```

---

### Q39: How do you pivot rows into columns in SQL?
**Answer:**
Using conditional aggregation (`SUM(CASE WHEN ...)`):

```sql
SELECT department_id,
       SUM(CASE WHEN year = 2022 THEN revenue ELSE 0 END) AS rev_2022,
       SUM(CASE WHEN year = 2023 THEN revenue ELSE 0 END) AS rev_2023
FROM department_sales
GROUP BY department_id;
```

---

### Q40: What is `GROUPING SETS` in SQL?
**Answer:**
`GROUPING SETS` allows calculating multiple `GROUP BY` aggregations in a single query pass instead of executing separate queries combined with `UNION ALL`.

```sql
SELECT region, category, SUM(sales)
FROM sales_data
GROUP BY GROUPING SETS ((region, category), (region), ());
```

---

### Q41: What is `ROLLUP` vs `CUBE`?
**Answer:**
- **`ROLLUP`**: Generates hierarchical subtotals and grand totals moving left-to-right (`year` $\rightarrow$ `month`).
- **`CUBE`**: Generates all possible $2^N$ cross-tabulation combination subtotals for specified columns.

---

### Q42: What is `NTILE(n)` function?
**Answer:**
`NTILE(n)` divides partition rows into `n` roughly equal bucket groups and assigns bucket numbers (1 to `n`) to each row. Used for spending quartile or performance percentile calculations.

---

## Part 4: Database Indexing & Performance Optimization (Q43 - Q52)

### Q43: What is a Database Index and how does it work?
**Answer:**
A Database Index is a B-Tree data structure that speeds up row retrieval by avoiding full table scans, at the cost of additional disk storage and slower write operations (`INSERT`, `UPDATE`, `DELETE`).

---

### Q44: What is a Clustered Index vs Non-Clustered Index?
**Answer:**
- **Clustered Index**: Sorts and stores physical data rows on disk based on key values. Exactly **one** per table (usually Primary Key).
- **Non-Clustered Index**: Separate index structure containing key values paired with row pointers back to table data. Multiple allowed per table.

---

### Q45: What is a Composite Index and the "Leftmost Prefix" rule?
**Answer:**
A Composite Index is an index on multiple columns `(col1, col2, col3)`.
**Leftmost Prefix Rule**: The query optimizer uses the index only if `WHERE` filters include columns starting from the leftmost position (`col1`, or `col1, col2`). Searching on `col2` alone skips the index.

---

### Q46: What is a Covering Index?
**Answer:**
A Non-Clustered index that contains all columns requested by a query (`SELECT`, `WHERE`, `JOIN`). The database satisfies the query directly from the index (Index-Only Scan) without secondary table disk lookups.

---

### Q47: What makes a query Non-SARGable? Give examples.
**Answer:**
A query is Non-SARGable (Search Argument Able) when syntax prevents index usage:
- Functions on columns: `WHERE UPPER(name) = 'ALICE'` *(Fix: Expression Index).*
- Leading wildcards: `WHERE code LIKE '%123'` *(Fix: Full-Text search).*
- Math on columns: `WHERE salary * 12 > 100000` *(Fix: `WHERE salary > 100000 / 12`).*

---

### Q48: What is `EXPLAIN` / `EXPLAIN ANALYZE`?
**Answer:**
Displays the execution plan selected by the Query Optimizer. `EXPLAIN` outputs cost estimates; `EXPLAIN ANALYZE` executes the query and reports real runtime wall-clock timings and row counts per step.

---

### Q49: What is a Full Table Scan vs Index Scan vs Index Seek?
**Answer:**
- **Full Table Scan**: Reads every disk block of the table sequentially ($O(N)$).
- **Index Scan**: Reads all leaf pages of an index sequentially.
- **Index Seek**: Traverses B-Tree root-to-leaf directly to target matching key ($O(\log N)$).

---

### Q50: How do you optimize pagination for millions of records?
**Answer:**
- **Bad (Offset Pagination)**: `OFFSET 1000000 LIMIT 20` *(Scans and discards 1,000,000 rows).*
- **Good (Keyset / Seek Pagination)**:
```sql
SELECT * FROM posts
WHERE id > last_seen_id
ORDER BY id ASC
LIMIT 20;
```
*(Uses index seek directly to `last_seen_id` in $O(\log N)$ time).*

---

### Q51: What is Table Partitioning and Partition Pruning?
**Answer:**
- **Partitioning**: Splits a large logical table into smaller physical units on disk by range or list.
- **Partition Pruning**: Optimization feature where the engine excludes unneeded physical partitions from query processing based on `WHERE` filter values.

---

### Q52: How do you troubleshoot and fix a slow query in production?
**Answer:**
1. Identify query from slow logs (`pg_stat_statements`).
2. Run `EXPLAIN ANALYZE` to locate bottleneck execution step.
3. Check for missing composite/covering indexes or non-SARGable predicates.
4. Eliminate `SELECT *` and update stale database statistics (`ANALYZE table`).

---

## Part 5: Transactions, ACID & Security (Q53 - Q60)

### Q53: What is a Database Transaction?
**Answer:**
A single logical unit of work containing one or more SQL statements that execute completely or not at all (Atomic execution).

---

### Q54: Explain ACID properties.
**Answer:**
- **Atomicity**: All statements complete successfully or all roll back ($0$ or $100\%$).
- **Consistency**: Database moves from one valid schema state to another, preserving constraints.
- **Isolation**: Concurrent transactions execute independently without uncommitted data interference.
- **Durability**: Committed updates persist permanently on disk even during power failures/crashes.

---

### Q55: What read anomalies occur during concurrent transactions?
**Answer:**
1. **Dirty Read**: Reading uncommitted changes made by another transaction.
2. **Non-Repeatable Read**: Re-reading a row and finding modified values committed by another transaction.
3. **Phantom Read**: Re-running a range query and finding new rows inserted and committed by another transaction.

---

### Q56: What are the 4 Transaction Isolation Levels?
**Answer:**
- **Read Uncommitted**: Allows Dirty Reads.
- **Read Committed**: Prevents Dirty Reads.
- **Repeatable Read**: Prevents Dirty & Non-Repeatable Reads.
- **Serializable**: Prevents all read anomalies (Dirty, Non-Repeatable, Phantom Reads).

---

### Q57: What is Optimistic vs Pessimistic Locking?
**Answer:**
- **Pessimistic Locking**: Locks rows immediately on read (`SELECT FOR UPDATE`), blocking concurrent writes until transaction completes. Best for high-conflict workloads.
- **Optimistic Locking**: Allows concurrent reads/writes; verifies version timestamp column on update (`WHERE version = expected_ver`). Best for low-conflict high-throughput workloads.

---

### Q58: What is a Deadlock and how do you resolve it?
**Answer:**
A Deadlock occurs when two or more transactions hold locks on resources the other requires in a circular wait dependency.
- **Resolution**: Database engine aborts one victim transaction.
- **Prevention**: Acquire locks on tables/rows in identical order across all application code.

---

### Q59: What is SQL Injection (SQLi) and how do you prevent it?
**Answer:**
SQL Injection occurs when untrusted user input is concatenated directly into executable SQL strings.
- **Prevention**: Always use **Parameterized Queries / Prepared Statements** (`WHERE name = ?`).

---

### Q60: What is Row-Level Security (RLS)?
**Answer:**
A database security feature that automatically filters row visibility based on user session context attributes (e.g., `tenant_id`), guaranteeing multi-tenant data isolation at the database engine layer.

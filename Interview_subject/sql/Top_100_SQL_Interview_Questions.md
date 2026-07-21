# Top 100 SQL Interview Questions & Answers

A comprehensive collection of 100 most frequently asked SQL interview questions ranging from fundamental concepts to advanced database architecture, performance tuning, and query optimization.

---

## Table of Contents
- [Part 1: SQL & Database Fundamentals (Q1 - Q25)](#part-1-sql--database-fundamentals-q1---q25)
- [Part 2: Joins, Subqueries & CTEs (Q26 - Q45)](#part-2-joins-subqueries--ctes-q26---q45)
- [Part 3: Window Functions & Aggregations (Q46 - Q65)](#part-3-window-functions--aggregations-q46---q65)
- [Part 4: Database Architecture, Indexing & Optimization (Q66 - Q80)](#part-4-database-architecture-indexing--optimization-q66---q80)
- [Part 5: Transactions, Concurrency & Security (Q81 - Q90)](#part-5-transactions-concurrency--security-q81---q90)
- [Part 6: Advanced & System Design Scenarios (Q91 - Q100)](#part-6-advanced--system-design-scenarios-q91---q100)

---

## Part 1: SQL & Database Fundamentals (Q1 - Q25)

### Q1: What is SQL and why is it important in software engineering and data analytics?
**Answer:**
SQL (Structured Query Language) is the standard domain-specific language used to store, manipulate, and retrieve data from Relational Database Management Systems (RDBMS). It is essential because standard operations (CRUD) can be executed efficiently using declarative syntax, hiding the underlying disk I/O and algorithm execution details.

---

### Q2: What is the difference between SQL (Relational) and NoSQL (Non-Relational) databases?
**Answer:**
- **SQL Databases**: Structured, schema-driven, enforce ACID compliance, use tables with rows/columns (e.g., PostgreSQL, MySQL, Oracle, SQL Server). Best for complex queries, transactional integrity, and relational data.
- **NoSQL Databases**: Schema-less/flexible schema, horizontally scalable, BASE compliance (Eventually Consistent), support Document, Key-Value, Columnar, or Graph stores (e.g., MongoDB, Redis, Cassandra, Neo4j). Best for unstructured data, high-throughput real-time streaming, and horizontal distribution.

---

### Q3: Explain the difference between DBMS and RDBMS.
**Answer:**
- **DBMS (Database Management System)**: Manages data stored as files without enforcing foreign key relationships or tabular structures (e.g., XML/file systems).
- **RDBMS (Relational DBMS)**: Manages data in tabular format (tables with rows and columns) and enforces relational integrity via keys (Primary Key, Foreign Key) and normalization principles.

---

### Q4: What are the different categories of SQL commands?
**Answer:**
1. **DDL (Data Definition Language)**: `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`.
2. **DML (Data Manipulation Language)**: `INSERT`, `UPDATE`, `DELETE`, `MERGE`.
3. **DQL (Data Query Language)**: `SELECT`.
4. **DCL (Data Control Language)**: `GRANT`, `REVOKE`.
5. **TCL (Transaction Control Language)**: `COMMIT`, `ROLLBACK`, `SAVEPOINT`.

---

### Q5: What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?
**Answer:**
| Feature | `DELETE` | `TRUNCATE` | `DROP` |
| :--- | :--- | :--- | :--- |
| **Command Type** | DML | DDL | DDL |
| **Operation** | Removes specific or all rows | Removes all rows | Removes data + table schema |
| **WHERE Clause** | Allowed | Not Allowed | Not Allowed |
| **Performance** | Slow (logs row-by-row) | Very Fast (deallocates pages) | Very Fast |
| **Rollback Support**| Supported in transaction | Dependent on DB engine | Supported in TCL-aware DBs |
| **Identity Reset** | Does not reset auto-increment | Resets auto-increment seed | Deletes identity sequence |

---

### Q6: What is a Primary Key vs Foreign Key?
**Answer:**
- **Primary Key (PK)**: A column (or set of columns) that uniquely identifies each record in a table. It cannot contain `NULL` values and automatically creates a clustered index in most engines.
- **Foreign Key (FK)**: A column in a child table that points to the Primary Key of a parent table, establishing a referential constraint between the two entities.

---

### Q7: What is a Composite Key?
**Answer:**
A Composite Key is a Primary Key composed of two or more columns to uniquely identify a record when no single column is sufficient.
```sql
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);
```

---

### Q8: What is Database Normalization and why is it used?
**Answer:**
Normalization is the systematic process of organizing data in a database to reduce data redundancy, eliminate data anomalies (Insertion, Update, Deletion anomalies), and improve data integrity.

---

### Q9: Explain 1NF, 2NF, 3NF, and BCNF.
**Answer:**
1. **1NF (First Normal Form)**: Each column must contain atomic (indivisible) values; no repeating groups or arrays.
2. **2NF (Second Normal Form)**: Must be in 1NF, and all non-key columns must be fully functionally dependent on the entire Primary Key (eliminates partial dependency).
3. **3NF (Third Normal Form)**: Must be in 2NF, and no non-key column can depend on another non-key column (eliminates transitive dependency).
4. **BCNF (Boyce-Codd Normal Form)**: A stricter version of 3NF where for every functional dependency $X \rightarrow Y$, $X$ must be a Super Key.

---

### Q10: What is Denormalization and when would you use it?
**Answer:**
Denormalization is the deliberate process of adding redundancy or combining tables in a normalized database to reduce expensive `JOIN` operations and optimize query read performance in Data Warehouses and OLAP systems.

---

### Q11: How does SQL handle `NULL` values?
**Answer:**
`NULL` represents an unknown or missing value. In SQL:
- Comparisons using `=`, `<>`, or `!=` with `NULL` evaluate to `UNKNOWN` (Three-Valued Logic).
- Special operators `IS NULL` and `IS NOT NULL` must be used.
- Aggregate functions (e.g., `AVG`, `SUM`, `COUNT(col)`) ignore `NULL` values, except `COUNT(*)`.

---

### Q12: What is the difference between `COUNT(*)`, `COUNT(col)`, and `COUNT(DISTINCT col)`?
**Answer:**
- `COUNT(*)`: Counts all rows in the table/group, including `NULL` rows.
- `COUNT(col)`: Counts all non-null values in the specified column.
- `COUNT(DISTINCT col)`: Counts unique, non-null values in the specified column.

---

### Q13: What is the logical execution order of an SQL query?
**Answer:**
1. `FROM` & `JOIN`
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT`
6. `DISTINCT`
7. `ORDER BY`
8. `LIMIT` / `OFFSET`

---

### Q14: What is the difference between `WHERE` and `HAVING` clauses?
**Answer:**
- **`WHERE`**: Filters individual rows *before* aggregation occurs. Cannot contain aggregate functions.
- **`HAVING`**: Filters summary groups *after* `GROUP BY` aggregation occurs. Can evaluate aggregate expressions (`HAVING COUNT(*) > 5`).

---

### Q15: What is the `COALESCE()` function?
**Answer:**
`COALESCE(val1, val2, ..., valN)` evaluates arguments in order and returns the first non-null expression.
```sql
SELECT employee_id, COALESCE(phone, mobile, email, 'No Contact Info') AS primary_contact
FROM employees;
```

---

### Q16: What is the `NULLIF()` function?
**Answer:**
`NULLIF(expr1, expr2)` returns `NULL` if `expr1 = expr2`; otherwise, it returns `expr1`. It is commonly used to avoid division-by-zero errors.
```sql
SELECT total_revenue / NULLIF(total_units, 0) AS unit_price FROM sales;
```

---

### Q17: What are constraints in SQL? Name the common ones.
**Answer:**
Constraints enforce data rules on table columns:
- `NOT NULL`: Ensures column cannot hold NULL.
- `UNIQUE`: Guarantees all values in a column are distinct.
- `PRIMARY KEY`: `NOT NULL` + `UNIQUE`.
- `FOREIGN KEY`: Enforces referential integrity.
- `CHECK`: Verifies values satisfy a boolean condition (e.g., `CHECK (age >= 18)`).
- `DEFAULT`: Sets a default value if none is provided.

---

### Q18: What is a Unique Constraint vs Primary Key?
**Answer:**
- **Primary Key**: Exactly one per table, cannot contain `NULL` values, creates a clustered index by default.
- **Unique Constraint**: Multiple per table allowed, can accept `NULL` values (one or multiple depending on DB engine), creates a non-clustered index by default.

---

### Q19: What is the difference between `CHAR` and `VARCHAR`?
**Answer:**
- **`CHAR(n)`**: Fixed-length string. If string length is less than `n`, it is right-padded with spaces. Uses fixed memory allocation.
- **`VARCHAR(n)`**: Variable-length string. Stores only actual characters plus 1-2 length bytes. Conserves storage.

---

### Q20: How do `BETWEEN` and `IN` operators work?
**Answer:**
- `BETWEEN low AND high`: Inclusive range filter (`val >= low AND val <= high`).
- `IN (val1, val2, ...)`: Discrete set matching (`val = val1 OR val = val2`).

---

### Q21: What is Pattern Matching in SQL? Explain `LIKE` wildcards.
**Answer:**
`LIKE` uses wildcard characters for string searching:
- `%`: Matches zero or more characters.
- `_`: Matches exactly one character.
- `[a-z]` / `[^a-z]`: Character class range (supported in T-SQL/PostgreSQL regex).

---

### Q22: What are SQL Aliases (`AS`) and why are they used?
**Answer:**
Aliases temporarily rename a table or column output to increase code readability or disambiguate joins:
```sql
SELECT e.first_name AS emp_name, d.department_name AS dept
FROM employees AS e JOIN departments AS d ON e.department_id = d.id;
```

---

### Q23: What is the difference between `UNION` and `UNION ALL`?
**Answer:**
- **`UNION`**: Combines result sets of two queries and removes duplicate rows (requires sorting/hashing overhead).
- **`UNION ALL`**: Combines result sets of two queries *without* removing duplicates (faster execution).

---

### Q24: What conditions must be met to perform `UNION` operations?
**Answer:**
1. Each `SELECT` query must have the exact same number of columns.
2. Corresponding columns must have compatible data types.
3. Columns must be in the same position in each query.

---

### Q25: How do `EXCEPT` (or `MINUS`) and `INTERSECT` work?
**Answer:**
- **`EXCEPT` / `MINUS`**: Returns distinct rows from the first query that are not present in the second query.
- **`INTERSECT`**: Returns only distinct rows that are present in both query result sets.

---

## Part 2: Joins, Subqueries & CTEs (Q26 - Q45)

### Q26: What is a SQL JOIN? Name the primary join types.
**Answer:**
A `JOIN` combines records from two or more tables based on a related logical column between them.
1. `INNER JOIN`
2. `LEFT (OUTER) JOIN`
3. `RIGHT (OUTER) JOIN`
4. `FULL (OUTER) JOIN`
5. `CROSS JOIN`
6. `SELF JOIN`

---

### Q27: Explain `INNER JOIN` vs `LEFT JOIN`.
**Answer:**
- **`INNER JOIN`**: Returns only rows where there is a match in both left and right tables.
- **`LEFT JOIN`**: Returns all rows from the left table, and matching rows from the right table. Non-matching right table columns return `NULL`.

---

### Q28: What is a `CROSS JOIN`?
**Answer:**
A `CROSS JOIN` returns the Cartesian product of two tables. Every row from Table A is combined with every row from Table B. If Table A has $M$ rows and Table B has $N$ rows, the result contains $M \times N$ rows.

---

### Q29: What is a `SELF JOIN` and when would you use it?
**Answer:**
A `SELF JOIN` is a join in which a table is joined with itself using aliases. It is used to query hierarchical data (e.g., Employee-Manager relationships) or compare rows within the same table.
```sql
SELECT e1.name AS Employee, e2.name AS Manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;
```

---

### Q30: How do `NULL` values affect Join conditions?
**Answer:**
In SQL, `NULL = NULL` evaluates to `UNKNOWN`. Therefore, standard equi-joins (`ON a.id = b.id`) will **not** match rows where the join keys are `NULL`. To join on NULL values, engines require `IS NOT DISTINCT FROM` (PostgreSQL/MySQL 8+) or `NULL-safe equal` `<=>` (MySQL).

---

### Q31: What is the difference between a `LEFT JOIN` with a condition in `ON` clause vs `WHERE` clause?
**Answer:**
- **Condition in `ON`**: Filters right table rows *before* joining; all left table rows are still returned.
- **Condition in `WHERE`**: Filters the final result set *after* joining. If it filters on a right table column (`WHERE r.status = 'Active'`), it effectively converts the `LEFT JOIN` into an `INNER JOIN` (unless `IS NULL` check is included).

---

### Q32: What is a Subquery? What are its types?
**Answer:**
A Subquery (nested query) is a query enclosed inside another query (`SELECT`, `INSERT`, `UPDATE`, or `DELETE`).
- **Scalar Subquery**: Returns a single value (1 row, 1 column).
- **Multi-Row Subquery**: Returns multiple rows (used with `IN`, `ANY`, `ALL`).
- **Correlated Subquery**: References columns from the outer query and executes once per candidate row.

---

### Q33: What is a Correlated Subquery and why can it be slow?
**Answer:**
A correlated subquery relies on values from the outer query for its evaluation:
```sql
SELECT e.name, e.salary
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id
);
```
It can be slow because the inner query must be executed repeatedly for every single row evaluated by the outer query ($O(N^2)$ complex scanning), unless optimized by the database optimizer into a hash join.

---

### Q34: What is the difference between `EXISTS` and `IN`?
**Answer:**
- **`IN`**: Evaluates the entire inner subquery first, creates a list of values, and checks equality. Inefficient if subquery returns a massive dataset.
- **`EXISTS`**: Returns a boolean (`TRUE`/`FALSE`) as soon as a single matching row is found in the subquery (short-circuit execution). Typically faster for large subquery result sets.

---

### Q35: What is a Common Table Expression (CTE)?
**Answer:**
A CTE (defined using the `WITH` clause) is a temporary named result set that exists only within the execution scope of a single `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement.
```sql
WITH HighEarners AS (
    SELECT * FROM employees WHERE salary > 100000
)
SELECT department_id, COUNT(*) FROM HighEarners GROUP BY department_id;
```

---

### Q36: What are the advantages of CTEs over Subqueries?
**Answer:**
1. **Readability & Maintainability**: Clean top-down logical modular structure.
2. **Reusability**: Can be referenced multiple times within the same outer query.
3. **Recursion Support**: CTEs support recursive queries (hierarchies/trees), which subqueries cannot do.

---

### Q37: What is a Recursive CTE? Explain its components.
**Answer:**
A Recursive CTE is a CTE that references itself. It consists of:
1. **Anchor Member**: Base query that initializes the recursive execution (runs once).
2. **`UNION ALL`**: Operator combining anchor and recursive members.
3. **Recursive Member**: Query that joins the CTE with source tables, running iteratively until no new rows are produced.

---

### Q38: What is the difference between a Views and a CTE?
**Answer:**
- **CTE**: Transient object; exists only during statement execution.
- **View**: Persistent database object metadata stored in the data dictionary. Can be queried like a regular table by any session with appropriate permissions.

---

### Q39: What is a Materialized View?
**Answer:**
A Materialized View physically stores the query result set on disk and refreshes it periodically or on-demand. Unlike standard views (which re-run underlying queries on every invocation), Materialized Views provide extremely fast read performance for heavy analytical queries at the expense of disk space and staleness.

---

### Q40: What is a Temporary Table?
**Answer:**
A Temporary Table (`CREATE TEMPORARY TABLE #temp`) is a table created in session memory/tempdb that persists across multiple queries within the active database connection session and is automatically dropped upon session termination.

---

### Q41: Compare CTE, View, Temporary Table, and Table Variable.
**Answer:**
| Feature | CTE | View | Temp Table | Table Variable |
| :--- | :--- | :--- | :--- | :--- |
| **Scope** | Single Statement | Database Global | Session Scope | Batch / Procedure Scope |
| **Physical Storage**| Memory/Inline | None (Query Def) | Tempdb (Disk/Mem)| Memory / Tempdb spill |
| **Indexing** | No | No (unless Indexed View)| Yes | Primary Key / Unique only |
| **Reusability** | Within query only | Across sessions | Across batch | Within batch |

---

### Q42: What is an Anti-Join? How is it implemented?
**Answer:**
An Anti-Join returns rows from the left table that have **no** matching rows in the right table.
Implemented via `LEFT JOIN ... WHERE right.id IS NULL` or `NOT EXISTS`.
```sql
SELECT e.*
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id
WHERE d.id IS NULL;
```

---

### Q43: What is a Semi-Join?
**Answer:**
A Semi-Join returns rows from the left table if there is at least one match in the right table, without duplicating left table rows or returning right table columns. Implemented using `EXISTS` or `IN`.

---

### Q44: What happens when you perform `NOT IN` with a subquery containing `NULL` values?
**Answer:**
If the `NOT IN` subquery yields even a single `NULL` value, the entire query returns **zero rows**.
*Reason*: `x NOT IN (1, 2, NULL)` expands to `x != 1 AND x != 2 AND x != NULL`. Since `x != NULL` evaluates to `UNKNOWN`, the whole `AND` chain evaluates to `UNKNOWN`/`FALSE`.

---

### Q45: How can you safely replace `NOT IN` to prevent `NULL` bugs?
**Answer:**
Use `NOT EXISTS` or `LEFT JOIN ... WHERE key IS NULL`.
```sql
-- Safe Pattern
SELECT * FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM terminated_employees t WHERE t.id = e.id
);
```

---

## Part 3: Window Functions & Aggregations (Q46 - Q65)

### Q46: What is a Window Function in SQL?
**Answer:**
A Window Function performs calculations across a set of table rows ("window") that are related to the current row, while retaining the individual row identity (unlike `GROUP BY`, which collapses rows into summary output).

---

### Q47: What is the syntax of a Window Function?
**Answer:**
```sql
FUNCTION_NAME(column) OVER (
    PARTITION BY partition_column
    ORDER BY sort_column
    ROWS|RANGE BETWEEN frame_start AND frame_end
)
```

---

### Q48: Explain the difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`.
**Answer:**
For tie values `(100, 100, 90)`:
- **`ROW_NUMBER()`**: Assigns unique sequential numbers (1, 2, 3).
- **`RANK()`**: Assigns same rank to ties, skips next rank numbers (1, 1, 3).
- **`DENSE_RANK()`**: Assigns same rank to ties, does **not** skip numbers (1, 1, 2).

---

### Q49: How do you find the Nth highest salary in SQL using Window Functions?
**Answer:**
```sql
WITH RankedSalaries AS (
    SELECT name, salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
    FROM employees
)
SELECT name, salary FROM RankedSalaries WHERE rnk = N;
```

---

### Q50: How do `LAG()` and `LEAD()` functions work?
**Answer:**
- `LAG(col, offset, default)`: Accesses data from a preceding row at a given offset in the window.
- `LEAD(col, offset, default)`: Accesses data from a subsequent row at a given offset in the window.

---

### Q51: How do you calculate Month-over-Month (MoM) revenue growth using `LAG()`?
**Answer:**
```sql
SELECT month, revenue,
       revenue - LAG(revenue, 1) OVER (ORDER BY month) AS mom_growth,
       ROUND(((revenue - LAG(revenue, 1) OVER (ORDER BY month)) / LAG(revenue, 1) OVER (ORDER BY month)) * 100, 2) AS growth_pct
FROM monthly_sales;
```

---

### Q52: What is a Running Total and how is it calculated in SQL?
**Answer:**
A Running Total computes cumulative sums row-by-row along an ordered sequence:
```sql
SELECT sales_date, daily_amount,
       SUM(daily_amount) OVER (ORDER BY sales_date) AS running_total
FROM sales;
```

---

### Q53: What is the difference between `ROWS` and `RANGE` window frame specifications?
**Answer:**
- **`ROWS`**: Operates on physical row counts relative to current row (`ROWS BETWEEN 3 PRECEDING AND CURRENT ROW`).
- **`RANGE`**: Operates on logical value ranges relative to `ORDER BY` column values (treats tied duplicate values as a single window frame boundary).

---

### Q54: What is `NTILE(n)` function?
**Answer:**
`NTILE(n)` distributes ordered partition rows into `n` roughly equal bucket groups and returns the bucket number (1 to `n`) for each row. Used for quartile/percentile segmentations.

---

### Q55: How do `FIRST_VALUE()` and `LAST_VALUE()` work?
**Answer:**
- `FIRST_VALUE(col)`: Returns the first value in the window frame.
- `LAST_VALUE(col)`: Returns the last value in the window frame. *(Note: Must specify `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` to prevent frame truncation at current row).*

---

### Q56: How can you pivot rows into columns in SQL?
**Answer:**
Using conditional aggregation (`CASE WHEN` + `SUM`/`MAX`) or native `PIVOT` syntax:
```sql
-- ANSI Conditional Aggregation
SELECT department_id,
       SUM(CASE WHEN year = 2022 THEN revenue ELSE 0 END) AS rev_2022,
       SUM(CASE WHEN year = 2023 THEN revenue ELSE 0 END) AS rev_2023
FROM department_sales
GROUP BY department_id;
```

---

### Q57: How do you unpivot columns into rows in SQL?
**Answer:**
Using `UNION ALL` or native `UNPIVOT` operator:
```sql
SELECT product_id, '2022' AS year, rev_2022 AS revenue FROM product_sales
UNION ALL
SELECT product_id, '2023' AS year, rev_2023 AS revenue FROM product_sales;
```

---

### Q58: What is `GROUPING SETS` in SQL?
**Answer:**
`GROUPING SETS` allows calculating multiple `GROUP BY` aggregations in a single query pass without combining separate queries with `UNION ALL`.
```sql
SELECT region, category, SUM(sales)
FROM sales_data
GROUP BY GROUPING SETS ((region, category), (region), ());
```

---

### Q59: What is `ROLLUP` operator?
**Answer:**
`ROLLUP` generates hierarchical aggregation subtotals and grand totals moving from left-to-right across the specified columns. `GROUP BY ROLLUP(year, month)` creates aggregates for `(year, month)`, `(year)`, and `()`.

---

### Q60: What is `CUBE` operator?
**Answer:**
`CUBE` generates all possible cross-tabulation combination subtotals for the specified set of columns ($2^N$ aggregate combinations).

---

### Q61: What is the `GROUPING()` function used for?
**Answer:**
`GROUPING(column)` returns `1` if the specified column is aggregated (subtotal/grand total row generated by ROLLUP/CUBE) or `0` if it represents a standard detail row value.

---

### Q62: How do you calculate moving averages (e.g., 7-day moving average)?
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

### Q63: Can window functions be used inside `WHERE` or `HAVING` clauses?
**Answer:**
**No.** Window functions are evaluated in Step 5 (SELECT phase) of query execution, which occurs *after* `WHERE` (Step 2) and `HAVING` (Step 4). To filter on a window function result, wrap the query in a CTE or Subquery.

---

### Q64: How do you find duplicate rows in a database table?
**Answer:**
```sql
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

---

### Q65: How do you delete duplicate rows while keeping only one copy?
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

## Part 4: Database Architecture, Indexing & Optimization (Q66 - Q80)

### Q66: What is a Database Index? How does it work?
**Answer:**
A Database Index is a data structure (most commonly a B-Tree) that speeds up data retrieval operations on a table at the expense of additional disk storage and slower write performance (`INSERT`, `UPDATE`, `DELETE`). It acts like a book index, allowing the DB engine to locate rows without scanning the full table.

---

### Q67: What is the difference between a Clustered Index and a Non-Clustered Index?
**Answer:**
- **Clustered Index**: Re-organizes the actual physical storage order of table data rows on disk based on key values. Exactly **one** per table (usually Primary Key). Leaves of B-Tree contain data rows.
- **Non-Clustered Index**: Creates a separate structure containing indexed key values paired with row pointers (RID or Clustered Key). Multiple allowed per table. Leaves contain pointers to real data.

---

### Q68: What is a B-Tree Index structure?
**Answer:**
A B-Tree (Balanced Tree) maintains sorted data and permits searches, sequential access, insertions, and deletions in logarithmic time ($O(\log N)$). Nodes contain keys and pointers; leaf nodes reside at equal depth.

---

### Q69: What is a Composite Index? What is the "Leftmost Prefix" rule?
**Answer:**
A Composite Index is an index built on multiple columns `(col1, col2, col3)`.
**Leftmost Prefix Rule**: The query optimizer can utilize the index only if query filter conditions include columns starting from the left-most position (`col1`, or `col1, col2`, or `col1, col2, col3`). Filtering on `col2` alone skips the index.

---

### Q70: What is a Covering Index?
**Answer:**
A Covering Index is a non-clustered index that includes all columns requested by a query (`SELECT`, `WHERE`, `JOIN`, `ORDER BY`). The engine satisfies the entire query directly from index nodes without performing a secondary lookup to disk table data (Index-Only Scan).

---

### Q71: What is Index Fragmentation and how is it resolved?
**Answer:**
Index Fragmentation occurs when data modifications (`INSERT`, `UPDATE`, `DELETE`) create empty page gaps or out-of-order physical pages. Resolved by:
- **Reorganize Index**: Defragments leaf level in-place (online operation).
- **Rebuild Index**: Drops and recreates the index from scratch (resets statistics).

---

### Q72: What is an Execution Plan (EXPLAIN / EXPLAIN ANALYZE)?
**Answer:**
An Execution Plan displays the sequence of steps executed by the database Query Optimizer to satisfy a query. `EXPLAIN` outputs predicted steps/costs; `EXPLAIN ANALYZE` actually runs the query and outputs real wall-clock timing and row counts per node.

---

### Q73: What is a Full Table Scan vs Index Scan vs Index Seek?
**Answer:**
- **Full Table Scan (Seq Scan)**: Reads every data block on disk sequentially ($O(N)$).
- **Index Scan**: Reads all leaf pages of an index sequentially.
- **Index Seek**: Traverses the B-Tree root-to-leaf to find specific matching keys directly ($O(\log N)$).

---

### Q74: What makes a query Non-SARGable? Give examples.
**Answer:**
A query is **Non-SARGable** (Search Argument Able) when query syntax prevents the optimizer from using an index:
- **Applying functions to columns**: `WHERE UPPER(last_name) = 'SMITH'` *(Fix: Use Expression Index or store uppercase).*
- **Leading Wildcard**: `WHERE code LIKE '%123'` *(Fix: Full Text Index).*
- **Arithmetic on columns**: `WHERE salary * 12 > 100000` *(Fix: `WHERE salary > 100000 / 12`).*

---

### Q75: What is Table Partitioning? Contrast Range vs List vs Hash Partitioning.
**Answer:**
Partitioning splits a large logical table into smaller physical units on disk while preserving a single table interface:
- **Range Partitioning**: Routes rows by numeric/date ranges (`YEAR(order_date) = 2023`).
- **List Partitioning**: Routes rows based on discrete key lists (`country IN ('US', 'CA')`).
- **Hash Partitioning**: Applies a hash algorithm to key column (`HASH(user_id) % 4`).

---

### Q76: What is Partition Pruning?
**Answer:**
Partition Pruning is an optimization feature where the engine excludes unneeded physical table partitions from query processing based on `WHERE` filter values, reducing I/O.

---

### Q77: What is the difference between Database Partitioning and Database Sharding?
**Answer:**
- **Partitioning**: Splits table data across logical files/disks within a **single database node**.
- **Sharding**: Horizontally splits database rows across **multiple independent server instances** (Distributed Database architecture).

---

### Q78: What are Database Statistics and why are they vital?
**Answer:**
Statistics store statistical distribution summaries of column data values (histograms, density vector). The Cost-Based Optimizer (CBO) relies on statistics to estimate cardinalities and select optimal plan operators (Hash Join vs Nested Loop).

---

### Q79: Explain Nested Loop Join vs Hash Join vs Merge Join.
**Answer:**
- **Nested Loop Join**: Iterates outer table rows and searches inner table. Ideal for small datasets with indexed inner keys.
- **Hash Join**: Builds an in-memory hash table for smaller input, probes with second input. Ideal for large unsorted datasets.
- **Merge Join**: Merges two pre-sorted inputs concurrently. Extremely fast for pre-indexed sorted inputs.

---

### Q80: How do you identify and optimize slow-running queries in production?
**Answer:**
1. Monitor Slow Query Logs / APM tools (e.g., Datadog, pg_stat_statements).
2. Generate Execution Plan (`EXPLAIN ANALYZE`).
3. Identify missing indexes, non-SARGable filters, high disk I/O nodes, or stale statistics.
4. Rewrite query (replace subqueries with CTEs/Joins, eliminate `SELECT *`).
5. Add targeted composite or covering indexes.

---

## Part 5: Transactions, Concurrency & Security (Q81 - Q90)

### Q81: What is a Database Transaction?
**Answer:**
A transaction is a single logical unit of work consisting of one or more SQL statements that must execute completely or not at all (Atomic execution).

---

### Q82: Explain ACID properties in detail.
**Answer:**
- **Atomicity**: All statements in transaction complete successfully, or all are rolled back.
- **Consistency**: Database transitions strictly from one valid schema state to another, respecting all constraints.
- **Isolation**: Concurrent transactions execute independently without interfering with each other's uncommitted data.
- **Durability**: Once committed, transaction results persist permanently even during system crashes.

---

### Q83: What read anomalies can occur during concurrent transactions?
**Answer:**
1. **Dirty Read**: Transaction reads uncommitted changes made by another concurrent transaction (which later rolls back).
2. **Non-Repeatable Read**: Transaction re-reads a row and finds modified values because another transaction updated and committed.
3. **Phantom Read**: Transaction re-runs a range query and finds new "phantom" rows inserted by another committed transaction.

---

### Q84: What are the 4 ANSI SQL Transaction Isolation Levels?
**Answer:**
| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :--- | :--- | :--- | :--- |
| **Read Uncommitted** | Allowed | Allowed | Allowed |
| **Read Committed** | Prevented | Allowed | Allowed |
| **Repeatable Read** | Prevented | Prevented | Allowed |
| **Serializable** | Prevented | Prevented | Prevented |

---

### Q85: What is Optimistic Locking vs Pessimistic Locking?
**Answer:**
- **Pessimistic Locking**: Locks records immediately upon read (`SELECT ... FOR UPDATE`), preventing concurrent writes until completed. Best for high-conflict workloads.
- **Optimistic Locking**: Allows concurrent reads/writes without locking; checks version timestamp during update (`WHERE version = expected_version`). Fails if conflict detected. Best for low-conflict high-throughput workloads.

---

### Q86: What is a Deadlock and how can it be resolved?
**Answer:**
A Deadlock occurs when two or more transactions hold locks on resources the other requires, creating a circular wait dependency. Database engine's Deadlock Detector detects cycles and aborts/rolls back the victim transaction.
*Prevention*: Access tables/rows in identical order across all application transactions.

---

### Q87: What is SQL Injection (SQLi)? How do you prevent it?
**Answer:**
SQL Injection occurs when malicious user input is concatenated directly into executable SQL string commands.
**Prevention**:
1. Always use **Parameterized Queries / Prepared Statements**.
2. Validate/Sanitize user input.
3. Apply Principle of Least Privilege for database users.

```sql
-- Vulnerable Concatenation: "SELECT * FROM users WHERE name = '" + userInput + "'"
-- Safe Parameterized Query:
SELECT * FROM users WHERE name = ?;
```

---

### Q88: What is Row-Level Security (RLS)?
**Answer:**
RLS is a database security engine feature that restricts data row access based on user session context attributes (e.g., tenant_id, role) automatically applying security filters to queries.

---

### Q89: What is the difference between `GRANT` and `REVOKE`?
**Answer:**
- `GRANT`: Assigns specific permissions (SELECT, INSERT, EXECUTE) on database objects to user roles.
- `REVOKE`: Removes assigned permissions from user roles.

---

### Q90: What is Data Masking / Dynamic Data Masking?
**Answer:**
Dynamic Data Masking obfuscates sensitive data (e.g., SSN, credit cards, emails) in query results for non-privileged database users without altering original storage on disk.

---

## Part 6: Advanced & System Design Scenarios (Q91 - Q100)

### Q91: What is the difference between OLTP and OLAP systems?
**Answer:**
- **OLTP (Online Transaction Processing)**: Normalized schemas (3NF), high volume of fast read/write single-row transactions. Optimized for operational workloads (e.g., Postgres, MySQL).
- **OLAP (Online Analytical Processing)**: Denormalized schemas (Star/Snowflake), column-oriented storage, batch processing of heavy aggregate analytical queries (e.g., Snowflake, BigQuery, Redshift).

---

### Q92: What is a Star Schema vs Snowflake Schema in Data Warehousing?
**Answer:**
- **Star Schema**: Central Fact table connected directly to denormalized Dimension tables (looks like a star). Queries require fewer joins; highly performant.
- **Snowflake Schema**: Dimension tables are normalized into multi-level hierarchies (e.g., Product -> Subcategory -> Category). Reduces storage redundancy but requires more joins.

---

### Q93: What are Fact Tables and Dimension Tables?
**Answer:**
- **Fact Table**: Contains quantitative numeric measures and metrics resulting from business events (e.g., sales_amount, quantity_sold) alongside foreign keys.
- **Dimension Table**: Contains descriptive context attributes used to slice, filter, and dice fact metrics (e.g., customer_name, product_category, store_location).

---

### Q94: What is a Slowly Changing Dimension (SCD)? Describe SCD Type 1, 2, and 3.
**Answer:**
SCD manages historical changes in dimension table attribute data:
- **SCD Type 1**: Overwrites old value with new value (no historical record kept).
- **SCD Type 2**: Creates a new row with new version timestamp (`effective_date`, `end_date`, `is_current`). Full history preserved.
- **SCD Type 3**: Adds a new column to store previous attribute value (`previous_address`). Preserves limited history.

---

### Q95: What is a Stored Procedure vs User-Defined Function (UDF)?
**Answer:**
- **Stored Procedure**: Can perform DDL/DML, manages transaction control (`COMMIT`/`ROLLBACK`), returns zero or multiple parameter outputs. Called using `EXECUTE`.
- **UDF**: Must return a single value or table; cannot execute DML/DDL or transaction statements. Called inline inside `SELECT` statements.

---

### Q96: What is Change Data Capture (CDC)?
**Answer:**
CDC tracks and captures real-time data row modifications (`INSERT`, `UPDATE`, `DELETE`) in transactional database write-ahead transaction logs (WAL) and streams change events to downstream systems (Kafka, Data Warehouses) without impacting DB load.

---

### Q97: What is Database Connection Pooling?
**Answer:**
Connection Pooling reuses a cached pool of active database connections rather than creating and destroying physical TCP socket connections for every application HTTP request, drastically reducing connection latency and server memory consumption.

---

### Q98: How do you handle pagination efficiently in SQL for millions of records?
**Answer:**
- **Bad (Offset Pagination)**: `OFFSET 1000000 LIMIT 20` *(Engine must scan and discard 1,000,000 rows).*
- **Good (Keyset / Seek Pagination)**:
```sql
SELECT * FROM posts
WHERE id > last_seen_id
ORDER BY id ASC
LIMIT 20;
```
*(Uses index seek directly to `last_seen_id` in $O(\log N)$ time).*

---

### Q99: What is Database Replication? Compare Primary-Replica (Master-Slave) vs Multi-Master.
**Answer:**
- **Primary-Replica**: Reads/Writes routed to Primary node; data replicated asynchronously/synchronously to read-only Replica nodes. Ideal for read-heavy workloads.
- **Multi-Master**: Reads/Writes accepted by any node; state synchronized continuously. Requires conflict resolution strategies.

---

### Q100: How do you design an SQL schema for a multi-tenant SaaS application?
**Answer:**
1. **Multi-tenant single database with `tenant_id` column**: Simplest & cheapest; enforce isolating queries via Row-Level Security (RLS).
2. **Schema-per-tenant**: Dedicated schema per tenant within single database node; provides clean logical separation.
3. **Database-per-tenant**: Dedicated database node per tenant; highest isolation, security, and cost; ideal for enterprise compliance.

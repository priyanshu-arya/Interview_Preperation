# Comprehensive SQL Cheatsheet

A quick, exhaustive reference guide for SQL (Structured Query Language). Covers core commands, data types, query clauses, join types, window functions, built-in functions, and query optimization techniques.

---

## Table of Contents
1. [SQL Command Categories](#1-sql-command-categories)
2. [Database Operations & DDL](#2-database-operations--ddl)
3. [Data Manipulation & DML](#3-data-manipulation--dml)
4. [Data Querying & Clauses](#4-data-querying--clauses)
5. [SQL Joins](#5-sql-joins)
6. [Subqueries & Common Table Expressions (CTEs)](#6-subqueries--common-table-expressions-ctes)
7. [Window Functions](#7-window-functions)
8. [Built-in Functions](#8-built-in-functions)
9. [Transactions & Control (TCL & DCL)](#9-transactions--control-tcl--dcl)
10. [Indexing & Performance Tuning](#10-indexing--performance-tuning)

---

## 1. SQL Command Categories

| Category | Description | Commands |
| :--- | :--- | :--- |
| **DDL** (Data Definition Language) | Defines database structure and schemas | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| **DML** (Data Manipulation Language) | Manages data within database objects | `INSERT`, `UPDATE`, `DELETE`, `MERGE` |
| **DQL** (Data Query Language) | Retrieves data from database | `SELECT` |
| **DCL** (Data Control Language) | Manages access rights and permissions | `GRANT`, `REVOKE` |
| **TCL** (Transaction Control Language) | Manages transactional changes | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

---

## 2. Database Operations & DDL

### Table Creation
```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10, 2) CHECK (salary > 0),
    department_id INT,
    hire_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL
);
```

### Table Alteration
```sql
-- Add Column
ALTER TABLE employees ADD COLUMN phone_number VARCHAR(20);

-- Drop Column
ALTER TABLE employees DROP COLUMN phone_number;

-- Modify Data Type / Constraints
ALTER TABLE employees MODIFY COLUMN salary DECIMAL(12, 2); -- MySQL
-- ALTER TABLE employees ALTER COLUMN salary TYPE DECIMAL(12, 2); -- PostgreSQL

-- Add Foreign Key Constraint
ALTER TABLE employees ADD CONSTRAINT fk_dept FOREIGN KEY (department_id) REFERENCES departments(id);
```

### Table Drop & Truncate
```sql
-- TRUNCATE: Fast deletion of all rows, preserves table structure (cannot rollback in some DBs)
TRUNCATE TABLE employees;

-- DROP: Completely removes table structure and data
DROP TABLE IF EXISTS employees;
```

---

## 3. Data Manipulation & DML

```sql
-- INSERT single row
INSERT INTO employees (first_name, last_name, email, salary, department_id)
VALUES ('Alice', 'Smith', 'alice@company.com', 85000.00, 1);

-- INSERT multiple rows
INSERT INTO employees (first_name, last_name, email, salary, department_id) VALUES
('Bob', 'Jones', 'bob@company.com', 65000.00, 2),
('Charlie', 'Brown', 'charlie@company.com', 72000.00, 1);

-- UPDATE rows
UPDATE employees
SET salary = salary * 1.10, department_id = 2
WHERE employee_id = 5;

-- DELETE rows
DELETE FROM employees WHERE employee_id = 10;
```

---

## 4. Data Querying & Clauses

### Basic Execution Order of SQL Clauses
```sql
-- Logical Order of Execution:
-- 1. FROM & JOIN  -> Identifies base tables
-- 2. WHERE        -> Filters individual rows
-- 3. GROUP BY     -> Groups rows into summary rows
-- 4. HAVING       -> Filters grouped summary rows
-- 5. SELECT       -> Computes columns/expressions
-- 6. DISTINCT     -> Removes duplicate rows
-- 7. ORDER BY     -> Sorts result set
-- 8. LIMIT / OFFSET -> Restricts output row count

SELECT department_id, AVG(salary) AS avg_salary
FROM employees
WHERE hire_date >= '2020-01-01'
GROUP BY department_id
HAVING AVG(salary) > 50000
ORDER BY avg_salary DESC
LIMIT 5 OFFSET 0;
```

### Filtering Operators
- **Comparison**: `=`, `<>`, `!=`, `<`, `>`, `<=`, `>=`
- **Pattern Matching**:
  - `LIKE 'A%'` (starts with A)
  - `LIKE '%son'` (ends with son)
  - `LIKE '%data%'` (contains data)
  - `LIKE '_a%'` (second letter is a)
- **Range & List**:
  - `salary BETWEEN 50000 AND 100000`
  - `department_id IN (1, 2, 5)`
- **NULL Handling**:
  - `WHERE email IS NULL`
  - `WHERE manager_id IS NOT NULL`

---

## 5. SQL Joins

| Join Type | Description | Diagram Representation |
| :--- | :--- | :--- |
| `INNER JOIN` | Returns records that have matching values in both tables | Table A ∩ Table B |
| `LEFT JOIN` | Returns all records from left table, and matched records from right table | Table A + (A ∩ B) |
| `RIGHT JOIN` | Returns all records from right table, and matched records from left table | Table B + (A ∩ B) |
| `FULL JOIN` | Returns all records when there is a match in either left or right table | Table A ∪ Table B |
| `CROSS JOIN` | Returns Cartesian product (M × N rows) | All combinations |
| `SELF JOIN` | Joins a table to itself | Hierarchies/Comparisons |

```sql
-- INNER JOIN
SELECT e.first_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- LEFT JOIN (Find employees without department)
SELECT e.first_name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;

-- FULL OUTER JOIN (ANSI standard)
SELECT e.first_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id;

-- SELF JOIN (Employee and Manager relationship)
SELECT e.first_name AS Employee, m.first_name AS Manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;
```

---

## 6. Subqueries & Common Table Expressions (CTEs)

### Subquery Types
```sql
-- Single-value Subquery (Scalar)
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Multi-value Subquery (IN / ANY / ALL)
SELECT * FROM employees
WHERE department_id IN (SELECT department_id FROM departments WHERE location = 'New York');

-- Correlated Subquery (Evaluated once per parent row)
SELECT e1.first_name, e1.salary, e1.department_id
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary) 
    FROM employees e2 
    WHERE e2.department_id = e1.department_id
);
```

### Common Table Expressions (CTEs)
```sql
-- Standard CTE
WITH DeptAvg AS (
    SELECT department_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
)
SELECT e.first_name, e.salary, da.avg_sal
FROM employees e
JOIN DeptAvg da ON e.department_id = da.department_id
WHERE e.salary > da.avg_sal;

-- Recursive CTE (Org Hierarchy / Numbers Generation)
WITH RECURSIVE OrgChart AS (
    -- Anchor member
    SELECT employee_id, first_name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive member
    SELECT e.employee_id, e.first_name, e.manager_id, o.level + 1
    FROM employees e
    JOIN OrgChart o ON e.manager_id = o.employee_id
)
SELECT * FROM OrgChart ORDER BY level;
```

---

## 7. Window Functions

Syntax: `FUNCTION() OVER (PARTITION BY col ORDER BY col ROWS/RANGE frame)`

### Ranking Functions
- `ROW_NUMBER()`: Unique sequential number per row (1, 2, 3, 4)
- `RANK()`: Sequential rank with gaps for ties (1, 2, 2, 4)
- `DENSE_RANK()`: Sequential rank without gaps for ties (1, 2, 2, 3)
- `NTILE(n)`: Divides partition into `n` bucket groups

```sql
SELECT first_name, department_id, salary,
       ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as row_num,
       RANK()       OVER (PARTITION BY department_id ORDER BY salary DESC) as rnk,
       DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as dense_rnk
FROM employees;
```

### Value / Analytics Functions
- `LAG(col, offset)`: Access row before current row
- `LEAD(col, offset)`: Access row after current row
- `FIRST_VALUE(col)`: Returns first value in frame
- `LAST_VALUE(col)`: Returns last value in frame

```sql
-- YoY / Month-over-Month Revenue Growth
SELECT sales_date, revenue,
       LAG(revenue, 1) OVER (ORDER BY sales_date) AS prev_revenue,
       revenue - LAG(revenue, 1) OVER (ORDER BY sales_date) AS growth
FROM daily_sales;
```

### Window Aggregations
```sql
-- Running Total & 7-Day Moving Average
SELECT sales_date, revenue,
       SUM(revenue) OVER (ORDER BY sales_date) AS running_total,
       AVG(revenue) OVER (ORDER BY sales_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg_7d
FROM daily_sales;
```

---

## 8. Built-in Functions

### Aggregate Functions
- `COUNT(*)`, `COUNT(col)`, `COUNT(DISTINCT col)`
- `SUM(col)`, `AVG(col)`, `MIN(col)`, `MAX(col)`

### String Functions
- `CONCAT(str1, str2)` / `str1 || str2`
- `SUBSTRING(str, start, length)` / `SUBSTR(str, start, length)`
- `LENGTH(str)` / `CHAR_LENGTH(str)`
- `UPPER(str)`, `LOWER(str)`, `TRIM(str)`
- `REPLACE(str, from_str, to_str)`
- `POSITION(substring IN string)` / `INSTR(str, substr)`

### Date & Time Functions
- `CURRENT_DATE`, `CURRENT_TIME`, `CURRENT_TIMESTAMP` / `NOW()`
- `EXTRACT(YEAR FROM date_col)`, `DATE_PART('year', date_col)`
- `DATEDIFF(end_date, start_date)`
- `DATE_ADD(date, INTERVAL 7 DAY)` / `date + INTERVAL '7 days'`

### Conditional Expressions
```sql
-- CASE Statement
SELECT first_name, salary,
       CASE 
           WHEN salary >= 100000 THEN 'High'
           WHEN salary >= 60000 THEN 'Medium'
           ELSE 'Low'
       END AS salary_tier
FROM employees;

-- COALESCE: Returns first non-null value
SELECT first_name, COALESCE(phone, mobile, email, 'N/A') AS contact_info
FROM employees;

-- NULLIF: Returns NULL if val1 = val2, else val1 (prevents division by zero)
SELECT product_id, total_sales / NULLIF(units_sold, 0) AS avg_unit_price
FROM sales_summary;
```

---

## 9. Transactions & Control (TCL & DCL)

```sql
-- Transaction Example
BEGIN TRANSACTION; -- or START TRANSACTION (MySQL)

UPDATE accounts SET balance = balance - 500 WHERE account_id = 101;
UPDATE accounts SET balance = balance + 500 WHERE account_id = 202;

SAVEPOINT before_fee;
UPDATE accounts SET balance = balance - 10 WHERE account_id = 101;

-- If issue with fee:
-- ROLLBACK TO SAVEPOINT before_fee;

COMMIT; -- Permanently saves changes
```

---

## 10. Indexing & Performance Tuning

### Indexing Basics
```sql
-- B-Tree Index (Default for range & equality)
CREATE INDEX idx_emp_lastname ON employees(last_name);

-- Composite Index (Rule of Leftmost Prefix: (dept_id, salary) speeds up queries filtering on dept_id or (dept_id AND salary))
CREATE INDEX idx_emp_dept_sal ON employees(department_id, salary);

-- Unique Index
CREATE UNIQUE INDEX idx_emp_email ON employees(email);
```

### Performance Optimization Guidelines
1. **Avoid `SELECT *`**: Fetch only required columns to reduce I/O and memory overhead.
2. **SARGable Queries (Search Argument Able)**:
   - Bad (disables index): `WHERE YEAR(hire_date) = 2023`
   - Good (uses index): `WHERE hire_date >= '2023-01-01' AND hire_date < '2024-01-01'`
3. **Use `EXISTS` instead of `IN`** for subqueries on large datasets.
4. **Avoid leading wildcards**: `LIKE '%abc'` forces full table scan; `LIKE 'abc%'` can utilize index.
5. **Batch Updates/Deletes**: For huge data tables, delete/update in chunks to prevent long row locks.

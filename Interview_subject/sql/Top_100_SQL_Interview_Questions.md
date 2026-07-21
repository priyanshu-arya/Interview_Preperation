# Top 100 SQL Interview Questions & Answers (With STAR Framework Responses)

A comprehensive collection of 100 most frequently asked SQL interview questions ranging from fundamental concepts to advanced database architecture, performance tuning, and query optimization. 

Each question includes:
1. **Direct Technical Answer**: Crisp theory and syntax explanation.
2. **STAR Framework Response**: A real-world production engineering scenario demonstrating practical application using **Situation**, **Task**, **Action**, and **Result**.

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
**Technical Answer:**
SQL (Structured Query Language) is the standard domain-specific language used to store, manipulate, and retrieve data from Relational Database Management Systems (RDBMS). It is essential because standard operations (CRUD) can be executed efficiently using declarative syntax, hiding the underlying disk I/O and algorithm execution details.

**STAR Framework Answer:**
- **Situation**: During a high-traffic sale event, our backend API microservices experienced severe DB query latency due to unoptimized application-level data joining in Node.js memory.
- **Task**: Re-architect our data fetching layer to push analytical and relational queries down to the relational database using standard ANSI SQL.
- **Action**: Optimized data retrieval by replacing multiple sequential API database calls with declarative SQL `JOIN` and aggregation queries, allowing the database query engine to leverage indexed disk scans.
- **Result**: Reduced API endpoint response times from 1.8 seconds to 120ms and reduced backend server CPU utilization by 45%.

---

### Q2: What is the difference between SQL (Relational) and NoSQL (Non-Relational) databases?
**Technical Answer:**
- **SQL Databases**: Structured, schema-driven, enforce ACID compliance, use tables with rows/columns (e.g., PostgreSQL, MySQL, Oracle, SQL Server). Best for complex queries, transactional integrity, and relational data.
- **NoSQL Databases**: Schema-less/flexible schema, horizontally scalable, BASE compliance (Eventually Consistent), support Document, Key-Value, Columnar, or Graph stores (e.g., MongoDB, Redis, Cassandra, Neo4j). Best for unstructured data, high-throughput real-time streaming, and horizontal distribution.

**STAR Framework Answer:**
- **Situation**: We were designing an e-commerce platform handling both user payment transactions and high-frequency user clickstream tracking logs.
- **Task**: Select and implement the right database architecture for both workloads to guarantee transactional safety while scaling log ingestion.
- **Action**: Designed a hybrid persistence architecture: chose PostgreSQL (SQL) for checkout transactions demanding strict ACID guarantees, and MongoDB (NoSQL) for high-throughput unstructured event log streams.
- **Result**: Maintained 100% financial transaction accuracy while scaling log ingestion to over 50,000 writes/second with zero latency impact on payment processing.

---

### Q3: Explain the difference between DBMS and RDBMS.
**Technical Answer:**
- **DBMS (Database Management System)**: Manages data stored as files without enforcing foreign key relationships or tabular structures (e.g., XML/file systems).
- **RDBMS (Relational DBMS)**: Manages data in tabular format (tables with rows and columns) and enforces relational integrity via keys (Primary Key, Foreign Key) and normalization principles.

**STAR Framework Answer:**
- **Situation**: Our legacy inventory system stored product data across disjointed CSV flat files managed by custom scripts, causing frequent orphaned data records.
- **Task**: Migrate legacy flat-file data into a modern relational database management system to enforce data integrity.
- **Action**: Migrated data to PostgreSQL (RDBMS), defining primary keys, foreign key constraints between orders and products, and cascade delete rules.
- **Result**: Eliminated orphaned inventory records entirely and cut inventory reconciliation bug tickets to zero.

---

### Q4: What are the different categories of SQL commands?
**Technical Answer:**
1. **DDL (Data Definition Language)**: `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`.
2. **DML (Data Manipulation Language)**: `INSERT`, `UPDATE`, `DELETE`, `MERGE`.
3. **DQL (Data Query Language)**: `SELECT`.
4. **DCL (Data Control Language)**: `GRANT`, `REVOKE`.
5. **TCL (Transaction Control Language)**: `COMMIT`, `ROLLBACK`, `SAVEPOINT`.

**STAR Framework Answer:**
- **Situation**: During a database migration release, a Junior developer accidentally ran schema modification commands (`DDL`) inside an open application transaction block.
- **Task**: Audit and establish clear operational boundaries for database execution pipelines between DDL, DML, DCL, and TCL commands.
- **Action**: Separated CI/CD database deployment pipelines: restricted DDL migrations to automated migration tools (Flyway), managed access controls via DCL scripts, and strictly isolated application DML operations within TCL transaction wrappers.
- **Result**: Standardized deployment safety, preventing unintended table locks during production deployment releases.

---

### Q5: What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?
**Technical Answer:**
| Feature | `DELETE` | `TRUNCATE` | `DROP` |
| :--- | :--- | :--- | :--- |
| **Command Type** | DML | DDL | DDL |
| **Operation** | Removes specific or all rows | Removes all rows | Removes data + table schema |
| **WHERE Clause** | Allowed | Not Allowed | Not Allowed |
| **Performance** | Slow (logs row-by-row) | Very Fast (deallocates pages) | Very Fast |
| **Rollback Support**| Supported in transaction | Dependent on DB engine | Supported in TCL-aware DBs |
| **Identity Reset** | Does not reset auto-increment | Resets auto-increment seed | Deletes identity sequence |

**STAR Framework Answer:**
- **Situation**: Nightly cleanup of an intermediate 50-million-row staging table using `DELETE FROM staging_table` was timing out and filling transaction log disks.
- **Task**: Optimize the automated staging reset pipeline to run within a 1-minute maintenance window.
- **Action**: Replaced row-by-row `DELETE` queries with DDL `TRUNCATE TABLE staging_table`, which deallocates data pages directly without generating individual row-level transaction logs.
- **Result**: Reduced staging reset time from 25 minutes down to 350 milliseconds and saved 40GB of transaction log disk space nightly.

---

### Q6: What is a Primary Key vs Foreign Key?
**Technical Answer:**
- **Primary Key (PK)**: A column (or set of columns) that uniquely identifies each record in a table. It cannot contain `NULL` values and automatically creates a clustered index in most engines.
- **Foreign Key (FK)**: A column in a child table that points to the Primary Key of a parent table, establishing a referential constraint between the two entities.

**STAR Framework Answer:**
- **Situation**: User profile deletions in our user management service caused residual orphaned order records in the billing table, breaking financial analytics.
- **Task**: Enforce referential integrity between users and orders at the database schema layer.
- **Action**: Defined `user_id` as a Primary Key in the `users` table and established a Foreign Key constraint in `orders(user_id) REFERENCES users(id) ON DELETE RESTRICT`.
- **Result**: Completely prevented invalid order creation for non-existent users and guaranteed data consistency across microservice database tables.

---

### Q7: What is a Composite Key?
**Technical Answer:**
A Composite Key is a Primary Key composed of two or more columns to uniquely identify a record when no single column is sufficient.
```sql
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);
```

**STAR Framework Answer:**
- **Situation**: In an e-commerce platform, users were able to add duplicate line items for the same product within the same shopping cart, leading to inventory discrepancies.
- **Task**: Enforce unique product entry per cart without introducing a artificial surrogate key.
- **Action**: Created a composite primary key on `(cart_id, product_id)` in the `cart_items` table.
- **Result**: Enforced strict uniqueness at the database engine level, automatically converting repeated additions into quantity updates and eliminating duplicate cart rows.

---

### Q8: What is Database Normalization and why is it used?
**Technical Answer:**
Normalization is the systematic process of organizing data in a database to reduce data redundancy, eliminate data anomalies (Insertion, Update, Deletion anomalies), and improve data integrity.

**STAR Framework Answer:**
- **Situation**: An unnormalized customer address table stored user names alongside order details. When customers updated their name, old orders retained stale names, causing shipping invoice mismatches.
- **Task**: Restructure the database schema to eliminate update anomalies and ensure data integrity.
- **Action**: Normalized the schema into 3NF by extracting customer metadata into a dedicated `customers` table and referencing `customer_id` inside `orders`.
- **Result**: Guaranteed 100% consistent customer details across all historic orders and reduced overall database storage footprint by 30%.

---

### Q9: Explain 1NF, 2NF, 3NF, and BCNF.
**Technical Answer:**
1. **1NF (First Normal Form)**: Each column must contain atomic (indivisible) values; no repeating groups or arrays.
2. **2NF (Second Normal Form)**: Must be in 1NF, and all non-key columns must be fully functionally dependent on the entire Primary Key (eliminates partial dependency).
3. **3NF (Third Normal Form)**: Must be in 2NF, and no non-key column can depend on another non-key column (eliminates transitive dependency).
4. **BCNF (Boyce-Codd Normal Form)**: A stricter version of 3NF where for every functional dependency $X \rightarrow Y$, $X$ must be a Super Key.

**STAR Framework Answer:**
- **Situation**: A legacy healthcare table stored comma-separated lists of patient medical codes inside a single column, making searching for specific conditions impossible without full table scans.
- **Task**: Refactor the schema to achieve 3NF compliance while ensuring zero downtime.
- **Action**: Decomposed the flat table: converted comma-separated strings into atomic rows (1NF), removed partial functional dependencies (2NF), and separated doctor department attributes into standalone lookup tables (3NF).
- **Result**: Enabled indexed condition searches, improving medical history query lookup speed by 95%.

---

### Q10: What is Denormalization and when would you use it?
**Technical Answer:**
Denormalization is the deliberate process of adding redundancy or combining tables in a normalized database to reduce expensive `JOIN` operations and optimize query read performance in Data Warehouses and OLAP systems.

**STAR Framework Answer:**
- **Situation**: Our analytics dashboard required joining 6 normalized tables (`orders`, `customers`, `products`, `categories`, `stores`, `payments`) on every page refresh, causing 10-second latency.
- **Task**: Optimize reporting query performance for heavy analytical reads.
- **Action**: Designed a denormalized star-schema reporting table updated via hourly ETL triggers, pre-aggregating customer names and product categories alongside order metrics.
- **Result**: Reduced dashboard load times from 10 seconds down to 180 milliseconds.

---

### Q11: How does SQL handle `NULL` values?
**Technical Answer:**
`NULL` represents an unknown or missing value. In SQL:
- Comparisons using `=`, `<>`, or `!=` with `NULL` evaluate to `UNKNOWN` (Three-Valued Logic).
- Special operators `IS NULL` and `IS NOT NULL` must be used.
- Aggregate functions (e.g., `AVG`, `SUM`, `COUNT(col)`) ignore `NULL` values, except `COUNT(*)`.

**STAR Framework Answer:**
- **Situation**: A financial summary query was returning incorrect average account balances because missing balance records were being treated as zero by inexperienced query writers.
- **Task**: Ensure accurate financial reporting while correctly handling missing/NULL account entries.
- **Action**: Rewrote accounting queries using `WHERE balance IS NOT NULL` for explicit filtering and `COALESCE(balance, 0)` when zero default imputation was explicitly business-required.
- **Result**: Corrected a $45,000 reporting variance and established strict SQL guidelines on Three-Valued Logic for the data engineering team.

---

### Q12: What is the difference between `COUNT(*)`, `COUNT(col)`, and `COUNT(DISTINCT col)`?
**Technical Answer:**
- `COUNT(*)`: Counts all rows in the table/group, including `NULL` rows.
- `COUNT(col)`: Counts all non-null values in the specified column.
- `COUNT(DISTINCT col)`: Counts unique, non-null values in the specified column.

**STAR Framework Answer:**
- **Situation**: Product managers reported conflicting active user numbers because different SQL queries used `COUNT(*)`, `COUNT(user_id)`, and `COUNT(DISTINCT user_id)` interchangeably on event logs containing guest user sessions.
- **Task**: Standardize event metric reporting across all analytical dashboards.
- **Action**: Conducted an audit and updated core queries: used `COUNT(*)` for raw event counts, `COUNT(user_id)` for authenticated event counts, and `COUNT(DISTINCT user_id)` for Daily Active Users (DAU).
- **Result**: Unified company KPI reporting and eliminated metric discrepancies across executive dashboards.

---

### Q13: What is the logical execution order of an SQL query?
**Technical Answer:**
1. `FROM` & `JOIN`
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT`
6. `DISTINCT`
7. `ORDER BY`
8. `LIMIT` / `OFFSET`

**STAR Framework Answer:**
- **Situation**: A developer tried using a column alias created in the `SELECT` clause inside the `WHERE` clause, causing a `Column reference error`.
- **Task**: Fix the query error and educate the team on logical SQL evaluation order.
- **Action**: Rewrote the query by moving the condition into a CTE or repeating the full expression in the `WHERE` clause, explaining that `WHERE` (Step 2) executes before `SELECT` (Step 5).
- **Result**: Fixed production query errors and established code review linting rules for alias usage.

---

### Q14: What is the difference between `WHERE` and `HAVING` clauses?
**Technical Answer:**
- **`WHERE`**: Filters individual rows *before* aggregation occurs. Cannot contain aggregate functions.
- **`HAVING`**: Filters summary groups *after* `GROUP BY` aggregation occurs. Can evaluate aggregate expressions (`HAVING COUNT(*) > 5`).

**STAR Framework Answer:**
- **Situation**: A slow analytical query was filtering grouped department salaries using `HAVING salary > 50000` after grouping millions of records, degrading performance.
- **Task**: Optimize query performance by restructuring filter clause evaluation order.
- **Action**: Moved non-aggregate row filters to `WHERE salary > 50000` (filtering rows before `GROUP BY`) and reserved `HAVING` exclusively for `HAVING COUNT(*) > 10`.
- **Result**: Reduced dataset size processed during aggregation by 80% and improved query execution time by 4x.

---

### Q15: What is the `COALESCE()` function?
**Technical Answer:**
`COALESCE(val1, val2, ..., valN)` evaluates arguments in order and returns the first non-null expression.
```sql
SELECT employee_id, COALESCE(phone, mobile, email, 'No Contact Info') AS primary_contact
FROM employees;
```

**STAR Framework Answer:**
- **Situation**: An automated SMS notification system failed whenever a user's primary mobile phone field was `NULL`, even if their work phone or email was populated.
- **Task**: Ensure the notification service fallback mechanism retrieves valid contact details.
- **Action**: Implemented `COALESCE(primary_phone, work_phone, mobile_phone, 'UNAVAILABLE')` in the notification data query.
- **Result**: Increased successful notification delivery rates from 84% to 99.8%.

---

### Q16: What is the `NULLIF()` function?
**Technical Answer:**
`NULLIF(expr1, expr2)` returns `NULL` if `expr1 = expr2`; otherwise, it returns `expr1`. It is commonly used to avoid division-by-zero errors.
```sql
SELECT total_revenue / NULLIF(total_units, 0) AS unit_price FROM sales;
```

**STAR Framework Answer:**
- **Situation**: An automated financial batch job crashed with a `Divide by Zero` error whenever products had zero unit sales during a holiday period.
- **Task**: Prevent pipeline crashes caused by division by zero without complex conditional statements.
- **Action**: Replaced direct division expressions `total_revenue / units_sold` with `total_revenue / NULLIF(units_sold, 0)`.
- **Result**: Allowed the job to calculate metrics smoothly, returning `NULL` for zero-sale items while processing all remaining products without pipeline failure.

---

### Q17: What are constraints in SQL? Name the common ones.
**Technical Answer:**
Constraints enforce data rules on table columns: `NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, `CHECK`, `DEFAULT`.

**STAR Framework Answer:**
- **Situation**: Bad input data from third-party APIs was inserting negative discount prices and duplicate promo codes into our database.
- **Task**: Block invalid data insertion at the database boundary layer.
- **Action**: Added table constraints: `CHECK (discount_price >= 0)` and `UNIQUE(promo_code)`.
- **Result**: Prevented invalid API payloads from corrupting database state and reduced manual data cleanups to zero.

---

### Q18: What is a Unique Constraint vs Primary Key?
**Technical Answer:**
- **Primary Key**: Exactly one per table, cannot contain `NULL` values, creates a clustered index by default.
- **Unique Constraint**: Multiple per table allowed, can accept `NULL` values, creates a non-clustered index by default.

**STAR Framework Answer:**
- **Situation**: Users registered with duplicate tax identification numbers because tax ID was not set as the Primary Key (which was an auto-increment ID).
- **Task**: Prevent duplicate tax IDs while maintaining surrogate auto-increment Primary Keys.
- **Action**: Added a `UNIQUE` constraint on `tax_id_number` while preserving `id INT PRIMARY KEY`.
- **Result**: Successfully prevented duplicate tax ID registration while retaining simple numeric surrogate keys for internal microservice joins.

---

### Q19: What is the difference between `CHAR` and `VARCHAR`?
**Technical Answer:**
- **`CHAR(n)`**: Fixed-length string. If string length is less than `n`, it is right-padded with spaces. Uses fixed memory allocation.
- **`VARCHAR(n)`**: Variable-length string. Stores only actual characters plus 1-2 length bytes. Conserves storage.

**STAR Framework Answer:**
- **Situation**: Storing 2-character country ISO codes (`US`, `IN`, `UK`) in a `VARCHAR(255)` column was wasting memory overhead and index space across 100M rows.
- **Task**: Optimize column storage data types for high-density tables.
- **Action**: Replaced `VARCHAR(255)` with `CHAR(2)` for fixed-length ISO codes, and converted long text columns to `VARCHAR(100)`.
- **Result**: Reduced index disk footprint by 2.2GB and improved index scan throughput by 18%.

---

### Q20: How do `BETWEEN` and `IN` operators work?
**Technical Answer:**
- `BETWEEN low AND high`: Inclusive range filter (`val >= low AND val <= high`).
- `IN (val1, val2, ...)`: Discrete set matching (`val = val1 OR val = val2`).

**STAR Framework Answer:**
- **Situation**: A quarterly audit report query using multiple OR conditions (`quarter = 1 OR quarter = 2 OR quarter = 3`) was verbose and difficult to maintain.
- **Task**: Refactor query syntax for clarity and performance.
- **Action**: Replaced repeated `OR` statements with `WHERE quarter IN (1, 2, 3)` and date filters with `WHERE transaction_date BETWEEN '2023-01-01' AND '2023-09-30'`.
- **Result**: Improved query readability and reduced query parser processing overhead.

---

### Q21: What is Pattern Matching in SQL? Explain `LIKE` wildcards.
**Technical Answer:**
`LIKE` uses wildcard characters: `%` (zero or more characters), `_` (exactly one character).

**STAR Framework Answer:**
- **Situation**: Customer support agents could not locate accounts when users mistyped prefixes or trailing characters in email addresses.
- **Task**: Implement flexible partial text matching for account lookups.
- **Action**: Implemented parameterized search queries using `WHERE email LIKE CONCAT(?, '%')` for prefix search and created a trigram GIN index (PostgreSQL) to support fast wildcard searches.
- **Result**: Search response times remained under 50ms even with leading and trailing wildcards across 5 million user records.

---

### Q22: What are SQL Aliases (`AS`) and why are they used?
**Technical Answer:**
Aliases temporarily rename a table or column output to increase code readability or disambiguate joins.

**STAR Framework Answer:**
- **Situation**: Joining 4 tables with identical column names (`id`, `created_at`, `name`) created ambiguous output columns in frontend JSON payloads.
- **Task**: Disambiguate query results for frontend API integration.
- **Action**: Applied explicit table aliases (`employees e JOIN departments d ON e.dept_id = d.id`) and descriptive column aliases (`e.name AS employee_name, d.name AS department_name`).
- **Result**: Eliminated JSON field collision bugs in web applications and standardized API response models.

---

### Q23: What is the difference between `UNION` and `UNION ALL`?
**Technical Answer:**
- **`UNION`**: Combines result sets of two queries and removes duplicate rows (requires sorting/hashing overhead).
- **`UNION ALL`**: Combines result sets of two queries *without* removing duplicates (faster execution).

**STAR Framework Answer:**
- **Situation**: Combining historical archive logs with active operational logs using `UNION` took 45 seconds due to memory sort-deduplication overhead.
- **Task**: Optimize log consolidation query speed.
- **Action**: Analyzed schema business logic; since active and archive log IDs were guaranteed disjoint, replaced `UNION` with `UNION ALL`.
- **Result**: Reduced query execution time from 45 seconds down to 1.2 seconds by eliminating expensive duplicate removal passes.

---

### Q24: What conditions must be met to perform `UNION` operations?
**Technical Answer:**
1. Each `SELECT` query must have the exact same number of columns.
2. Corresponding columns must have compatible data types.
3. Columns must be in the same position in each query.

**STAR Framework Answer:**
- **Situation**: Integrating legacy transaction data with new system records via `UNION` caused execution errors due to mismatched column ordering and incompatible integer/string types.
- **Task**: Harmonize query structures across legacy and modern database schemas.
- **Action**: Created explicit subquery projections enforcing identical column order, typecasting numeric types (`CAST(legacy_id AS INT)`), and aligning column names.
- **Result**: Successfully unified legacy and modern data sources into a single consolidated financial view.

---

### Q25: How do `EXCEPT` (or `MINUS`) and `INTERSECT` work?
**Technical Answer:**
- **`EXCEPT` / `MINUS`**: Returns distinct rows from the first query that are not present in the second query.
- **`INTERSECT`**: Returns only distinct rows that are present in both query result sets.

**STAR Framework Answer:**
- **Situation**: The marketing team needed to identify active subscribers who registered for a webinar but had *not* completed a product purchase.
- **Task**: Extract the exact delta user list efficiently.
- **Action**: Executed `SELECT user_id FROM webinar_registrants EXCEPT SELECT user_id FROM product_purchasers`.
- **Result**: Generated the targeted marketing segment list in seconds without complex subqueries.

---

## Part 2: Joins, Subqueries & CTEs (Q26 - Q45)

### Q26: What is a SQL JOIN? Name the primary join types.
**Technical Answer:**
A `JOIN` combines records from two or more tables based on a related logical column between them: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`, `CROSS JOIN`, `SELF JOIN`.

**STAR Framework Answer:**
- **Situation**: A reporting service was under-reporting revenue because missing customer profile rows were causing order records to be excluded.
- **Task**: Correct join logic to ensure every order is accounted for regardless of optional profile existence.
- **Action**: Replaced `INNER JOIN customers` with `LEFT JOIN customers`, ensuring orders with missing customer metadata still populated financial summary rows.
- **Result**: Recovered $120,000 in uncounted orders on monthly financial statements.

---

### Q27: Explain `INNER JOIN` vs `LEFT JOIN`.
**Technical Answer:**
- **`INNER JOIN`**: Returns only rows where there is a match in both left and right tables.
- **`LEFT JOIN`**: Returns all rows from the left table, and matching rows from the right table. Non-matching right table columns return `NULL`.

**STAR Framework Answer:**
- **Situation**: An automated audit script needed to list all registered users alongside their active subscriptions, including users who hadn't subscribed yet.
- **Task**: Generate a single comprehensive report without dropping non-subscribed accounts.
- **Action**: Utilized `users u LEFT JOIN subscriptions s ON u.id = s.user_id` and flagged non-subscribers where `s.id IS NULL`.
- **Result**: Provided marketing with a clear list of 15,000 free-tier users for conversion targeting.

---

### Q28: What is a `CROSS JOIN`?
**Technical Answer:**
A `CROSS JOIN` returns the Cartesian product of two tables ($M \times N$ rows).

**STAR Framework Answer:**
- **Situation**: We needed to build a master scheduling matrix combining all active store locations with all daily 1-hour time slots for a calendar view.
- **Task**: Generate all valid store-timeslot combinations without manual looping scripts.
- **Action**: Executed `SELECT s.store_id, t.slot_time FROM stores s CROSS JOIN time_slots t`.
- **Result**: Generated a complete 10,000-row empty schedule matrix in milliseconds, ready for outer joining with actual booking data.

---

### Q29: What is a `SELF JOIN` and when would you use it?
**Technical Answer:**
A `SELF JOIN` joins a table with itself using aliases to query hierarchical data or compare rows within the same table.

**STAR Framework Answer:**
- **Situation**: An HR portal needed to display an organizational tree showing each employee alongside their direct manager's name from a single `employees` table.
- **Task**: Query self-referential manager relationships in a single SQL statement.
- **Action**: Wrote `SELECT e.name AS Employee, m.name AS Manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id`.
- **Result**: Successfully generated full organizational hierarchy data for frontend tree rendering.

---

### Q30: How do `NULL` values affect Join conditions?
**Technical Answer:**
In SQL, `NULL = NULL` evaluates to `UNKNOWN`. Standard equi-joins (`ON a.id = b.id`) do **not** match rows where join keys are `NULL`.

**STAR Framework Answer:**
- **Situation**: Joining custom product attributes where `supplier_id` could be `NULL` omitted valid supplier-less product matches.
- **Task**: Enable join matching on nullable keys.
- **Action**: Used PostgreSQL's `ON a.supplier_id IS NOT DISTINCT FROM b.supplier_id` (or MySQL `<=>`).
- **Result**: Captured all product-supplier combinations correctly without losing supplier-less inventory items.

---

### Q31: What is the difference between a `LEFT JOIN` with a condition in `ON` clause vs `WHERE` clause?
**Technical Answer:**
- **Condition in `ON`**: Filters right table rows *before* joining; all left table rows are still returned.
- **Condition in `WHERE`**: Filters the final result set *after* joining. Filtering on a right table column implicitly converts `LEFT JOIN` into `INNER JOIN`.

**STAR Framework Answer:**
- **Situation**: A customer list report intended to show all users plus their active 2023 subscriptions was accidentally dropping users without subscriptions because `WHERE s.year = 2023` was used.
- **Task**: Restore missing non-subscribed users to the output report.
- **Action**: Shifted the year constraint from the `WHERE` clause into the join condition: `LEFT JOIN subscriptions s ON u.id = s.user_id AND s.year = 2023`.
- **Result**: Successfully returned all users while correctly attaching 2023 subscription details where present.

---

### Q32: What is a Subquery? What are its types?
**Technical Answer:**
A Subquery is a query nested inside another query: Scalar (1 value), Multi-Row (`IN`, `ANY`), or Correlated (references outer query).

**STAR Framework Answer:**
- **Situation**: The fraud detection team needed to identify transactions whose amount was greater than the average transaction amount of that specific user category.
- **Task**: Compute dynamic benchmarks within transaction filtering queries.
- **Action**: Built a multi-row subquery returning category averages to compare against individual transaction records.
- **Result**: Automated detection of anomalous transactions exceeding 3x category baseline averages.

---

### Q33: What is a Correlated Subquery and why can it be slow?
**Technical Answer:**
A Correlated Subquery references columns from the outer query and executes once per candidate row ($O(N^2)$ complexity).

**STAR Framework Answer:**
- **Situation**: A query finding the latest transaction per customer using `WHERE t.date = (SELECT MAX(date) FROM transactions WHERE cust_id = t.cust_id)` took 2 minutes over 5M rows.
- **Task**: Eliminate $O(N^2)$ correlated execution overhead.
- **Action**: Rewrote the query using `ROW_NUMBER() OVER (PARTITION BY cust_id ORDER BY date DESC)` inside a CTE.
- **Result**: Reduced execution time from 120 seconds down to 1.4 seconds.

---

### Q34: What is the difference between `EXISTS` and `IN`?
**Technical Answer:**
- **`IN`**: Evaluates entire inner subquery first, creates value list. Slow for huge subquery outputs.
- **`EXISTS`**: Returns boolean (`TRUE`/`FALSE`) upon finding first match (short-circuit evaluation). Faster for large datasets.

**STAR Framework Answer:**
- **Situation**: Checking if orders belonged to an active user list via `WHERE user_id IN (SELECT id FROM users)` was causing memory spikes.
- **Task**: Optimize membership checking performance over large user tables.
- **Action**: Replaced `IN` with `WHERE EXISTS (SELECT 1 FROM users u WHERE u.id = o.user_id AND u.status = 'active')`.
- **Result**: Reduced memory overhead by 70% and accelerated query execution time by 3x.

---

### Q35: What is a Common Table Expression (CTE)?
**Technical Answer:**
A CTE (defined via `WITH`) is a temporary named result set existing only during single query execution.

**STAR Framework Answer:**
- **Situation**: A complex financial query had 4 levels of nested subqueries, making code debugging extremely difficult for the team.
- **Task**: Refactor monolithic nested queries into modular readable components.
- **Action**: Structured the query into sequential named CTEs (`WITH MonthlySales AS (...), RegionalTax AS (...), FinalReport AS (...)`).
- **Result**: Significantly improved codebase readability, reducing onboarding time for new engineers.

---

### Q36: What are the advantages of CTEs over Subqueries?
**Technical Answer:**
1. Readability & Maintainability.
2. Reusability within same query.
3. Recursive execution support.

**STAR Framework Answer:**
- **Situation**: An analytics calculation required joining the same aggregated customer summary subquery three separate times.
- **Task**: Eliminate redundant subquery code duplication.
- **Action**: Defined the customer summary once as a CTE at the top of the statement and referenced it multiple times in subsequent joins.
- **Result**: Cut SQL script lines by 50% and allowed query optimizer to reuse CTE materialized results.

---

### Q37: What is a Recursive CTE? Explain its components.
**Technical Answer:**
A Recursive CTE references itself to iterate over hierarchical data. Components: Anchor Member, `UNION ALL`, Recursive Member, Termination Condition.

**STAR Framework Answer:**
- **Situation**: Multi-level referral marketing attribution required calculating total commissions across 8 levels of user inviter chains.
- **Task**: Traverse variable-depth referral trees in SQL.
- **Action**: Wrote a Recursive CTE starting with top-level referrers (Anchor) and iteratively joining child referrers (`UNION ALL`).
- **Result**: Successfully computed multi-level attribution payouts in a single query pass.

---

### Q38: What is the difference between a Views and a CTE?
**Technical Answer:**
- **CTE**: Transient object; exists only during statement execution.
- **View**: Persistent database object metadata stored in data dictionary.

**STAR Framework Answer:**
- **Situation**: Multiple microservices independently wrote custom SQL queries to compute active user metrics, leading to inconsistent definitions.
- **Task**: Centralize active user metric logic across services.
- **Action**: Created a persistent database `VIEW active_users_v` and granted `SELECT` permissions to microservices.
- **Result**: Ensured consistent business logic enforcement across all application services.

---

### Q39: What is a Materialized View?
**Technical Answer:**
A Materialized View physically stores query results on disk and refreshes periodically for fast analytical reads.

**STAR Framework Answer:**
- **Situation**: Real-time aggregation over 200M IoT sensor records caused dashboard timeouts.
- **Task**: Provide sub-second dashboard performance for heavy aggregate queries.
- **Action**: Created a Materialized View refreshing every 15 minutes (`REFRESH MATERIALIZED VIEW CONCURRENTLY`).
- **Result**: Reduced dashboard query latency from 18 seconds down to 45 milliseconds.

---

### Q40: What is a Temporary Table?
**Technical Answer:**
A Temporary Table (`CREATE TEMPORARY TABLE`) exists in session memory/tempdb and automatically drops when session ends.

**STAR Framework Answer:**
- **Situation**: A multi-step batch ETL job kept recalculating intermediate customer scoring datasets across 10 sequential SQL statements.
- **Task**: Store intermediate results efficiently across a multi-statement transaction session.
- **Action**: Created an indexed Temporary Table `CREATE TEMP TABLE #customer_scores` to hold intermediate state.
- **Result**: Sped up overall ETL batch runtime from 40 minutes to 6 minutes.

---

### Q41: Compare CTE, View, Temporary Table, and Table Variable.
**Technical Answer:**
| Feature | CTE | View | Temp Table | Table Variable |
| :--- | :--- | :--- | :--- | :--- |
| **Scope** | Single Statement | Database Global | Session Scope | Batch / Procedure Scope |
| **Storage** | Memory/Inline | None (Query Def) | Tempdb (Disk/Mem)| Memory / Tempdb |
| **Indexing** | No | No | Yes | PK/Unique only |

**STAR Framework Answer:**
- **Situation**: An ETL process required adding custom indexes to an intermediate dataset of 2 million rows, which CTEs could not support.
- **Task**: Select the optimal temporary storage mechanism supporting indexing.
- **Action**: Evaluated options and chose a Temporary Table, applying a composite index on `(user_id, status)`.
- **Result**: Accelerated downstream join queries by 8x compared to an unindexed CTE.

---

### Q42: What is an Anti-Join? How is it implemented?
**Technical Answer:**
An Anti-Join returns rows from the left table that have **no** matching rows in the right table (`LEFT JOIN ... WHERE right.id IS NULL` or `NOT EXISTS`).

**STAR Framework Answer:**
- **Situation**: Identified inactive users who registered over 30 days ago but never logged a single session.
- **Task**: Query non-matching records between users and sessions efficiently.
- **Action**: Implemented an Anti-Join using `SELECT u.id FROM users u LEFT JOIN sessions s ON u.id = s.user_id WHERE s.id IS NULL`.
- **Result**: Isolated 45,000 inactive accounts for automated email re-engagement campaigns.

---

### Q43: What is a Semi-Join?
**Technical Answer:**
A Semi-Join returns rows from the left table if at least one match exists in the right table, without duplicating left rows.

**STAR Framework Answer:**
- **Situation**: Querying departments having high-value sales using `INNER JOIN` caused duplicate department rows when multiple sales matched.
- **Task**: Retrieve unique department rows matching sales criteria without explicit `DISTINCT` overhead.
- **Action**: Used a Semi-Join: `SELECT * FROM departments d WHERE EXISTS (SELECT 1 FROM sales s WHERE s.dept_id = d.id AND s.amount > 10000)`.
- **Result**: Avoided sorting overhead required by `DISTINCT` and improved execution speed by 35%.

---

### Q44: What happens when you perform `NOT IN` with a subquery containing `NULL` values?
**Technical Answer:**
If a `NOT IN` subquery returns even a single `NULL`, the entire query returns **zero rows** because `x != NULL` evaluates to `UNKNOWN`.

**STAR Framework Answer:**
- **Situation**: An automated compliance query returned zero results when checking accounts not present in a blacklisted table containing a single `NULL` entry.
- **Task**: Fix the query to ensure compliant accounts are properly identified.
- **Action**: Replaced `NOT IN` with `NOT EXISTS` to safely handle nullable subquery keys.
- **Result**: Correctly identified 12,000 compliant accounts and eliminated a critical reporting defect.

---

### Q45: How can you safely replace `NOT IN` to prevent `NULL` bugs?
**Technical Answer:**
Use `NOT EXISTS` or `LEFT JOIN ... WHERE key IS NULL`.

**STAR Framework Answer:**
- **Situation**: Legacy code used `WHERE id NOT IN (SELECT manager_id FROM employees)`, which broke whenever `manager_id` had `NULL` values.
- **Task**: Refactor legacy queries to be resilient against `NULL` data integrity bugs.
- **Action**: Rewrote queries using `WHERE NOT EXISTS (SELECT 1 FROM employees e WHERE e.manager_id = main.id)`.
- **Result**: Guaranteed query resilience across all nullable schema columns.

---

## Part 3: Window Functions & Aggregations (Q46 - Q65)

### Q46: What is a Window Function in SQL?
**Technical Answer:**
A Window Function performs calculations across related table rows ("window") while retaining individual row identities.

**STAR Framework Answer:**
- **Situation**: Finance required showing individual employee salaries alongside their department's average salary on every detail row.
- **Task**: Compute aggregate benchmarks without collapsing individual rows using `GROUP BY`.
- **Action**: Applied `SELECT name, salary, AVG(salary) OVER (PARTITION BY dept_id) AS dept_avg FROM employees`.
- **Result**: Delivered detailed salary benchmarking reports in a single query pass.

---

### Q47: What is the syntax of a Window Function?
**Technical Answer:**
`FUNCTION() OVER (PARTITION BY col ORDER BY col ROWS|RANGE frame)`

**STAR Framework Answer:**
- **Situation**: Calculating cumulative order totals per customer required strict ordering and boundary controls.
- **Task**: Write a precise window function specification.
- **Action**: Implemented `SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.
- **Result**: Produced accurate historical running balances for customer invoices.

---

### Q48: Explain the difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`.
**Technical Answer:**
For ties `(100, 100, 90)`: `ROW_NUMBER` = (1, 2, 3), `RANK` = (1, 1, 3), `DENSE_RANK` = (1, 1, 2).

**STAR Framework Answer:**
- **Situation**: Leaderboard gaming system needed to handle tie scores without skipping rank positions (e.g., two 1st place players, next player gets 2nd place).
- **Task**: Select the exact ranking window function for business rules.
- **Action**: Implemented `DENSE_RANK() OVER (ORDER BY score DESC)` instead of `RANK()`.
- **Result**: Correctly displayed seamless ranking numbers on public player leaderboards.

---

### Q49: How do you find the Nth highest salary in SQL using Window Functions?
**Technical Answer:**
Use `DENSE_RANK() OVER (ORDER BY salary DESC)` in a CTE and filter `WHERE rnk = N`.

**STAR Framework Answer:**
- **Situation**: Compensation review required finding the 3rd highest salary per department.
- **Task**: Query generic Nth highest values per group dynamically.
- **Action**: Wrote `WITH Ranked AS (SELECT salary, dept_id, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) rn FROM emp) SELECT * FROM Ranked WHERE rn = 3`.
- **Result**: Provided HR with accurate Nth salary benchmarks across all departments.

---

### Q50: How do `LAG()` and `LEAD()` functions work?
**Technical Answer:**
`LAG()` accesses data from a preceding row; `LEAD()` accesses data from a subsequent row.

**STAR Framework Answer:**
- **Situation**: Needed to calculate duration spent by users on each web page by comparing timestamp of current page view with next page view.
- **Task**: Access next row timestamp without performing expensive self-joins.
- **Action**: Used `LEAD(event_time) OVER (PARTITION BY user_id ORDER BY event_time)` to capture next page click time.
- **Result**: Calculated accurate page dwell times while reducing query time by 90%.

---

### Q51: How do you calculate Month-over-Month (MoM) revenue growth using `LAG()`?
**Technical Answer:**
Compare current month revenue with `LAG(revenue, 1) OVER (ORDER BY month)`.

**STAR Framework Answer:**
- **Situation**: Executive team requested an automated monthly revenue growth percentage report.
- **Task**: Compute MoM growth percentage directly in SQL.
- **Action**: Wrote `SELECT month, (revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / LAG(revenue) OVER (ORDER BY month) AS mom_growth FROM monthly_sales`.
- **Result**: Automated executive financial KPI reporting with zero manual Excel calculations.

---

### Q52: What is a Running Total and how is it calculated in SQL?
**Technical Answer:**
A Running Total computes cumulative sums using `SUM(col) OVER (ORDER BY col)`.

**STAR Framework Answer:**
- **Situation**: Needed to display daily cumulative bank account balances over time.
- **Task**: Calculate running balances efficiently across millions of transactions.
- **Action**: Applied `SUM(amount) OVER (PARTITION BY account_id ORDER BY trans_date)`.
- **Result**: Generated instant historical ledger balances for mobile banking applications.

---

### Q53: What is the difference between `ROWS` and `RANGE` window frame specifications?
**Technical Answer:**
- **`ROWS`**: Operates on physical row offsets.
- **`RANGE`**: Operates on logical value bounds (groups tied values together).

**STAR Framework Answer:**
- **Situation**: A 7-day moving average calculation gave incorrect results when multiple transactions shared identical timestamps due to `RANGE` default behavior.
- **Task**: Enforce exact row-count physical boundaries on moving average windows.
- **Action**: Specified `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` explicitly.
- **Result**: Corrected moving average metrics across high-frequency trading data.

---

### Q54: What is `NTILE(n)` function?
**Technical Answer:**
`NTILE(n)` divides partition rows into `n` roughly equal bucket groups.

**STAR Framework Answer:**
- **Situation**: Marketing needed to segment customers into 4 equal spend quartiles (VIP, High, Medium, Low).
- **Task**: Divide customer population into equal performance percentiles.
- **Action**: Executed `NTILE(4) OVER (ORDER BY total_spend DESC) AS quartile`.
- **Result**: Successfully segmented 500,000 customers for targeted promotional campaigns.

---

### Q55: How do `FIRST_VALUE()` and `LAST_VALUE()` work?
**Technical Answer:**
- `FIRST_VALUE(col)`: Returns first value in frame.
- `LAST_VALUE(col)`: Returns last value in frame (requires specifying explicit unbounded window frame).

**STAR Framework Answer:**
- **Situation**: Needed to compare every trade price of a stock against the opening price (`FIRST_VALUE`) and closing price (`LAST_VALUE`) of the trading day.
- **Task**: Retrieve window boundary values on every row.
- **Action**: Applied `FIRST_VALUE(price) OVER (PARTITION BY stock ORDER BY trade_time)` and specified `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` for `LAST_VALUE`.
- **Result**: Delivered accurate stock fluctuation analytics for financial dashboards.

---

### Q56: How can you pivot rows into columns in SQL?
**Technical Answer:**
Use conditional aggregation (`SUM(CASE WHEN...)`) or native `PIVOT`.

**STAR Framework Answer:**
- **Situation**: Quarterly sales data stored vertically as rows needed to be rendered horizontally as columns (`Q1`, `Q2`, `Q3`, `Q4`) for executive reporting.
- **Task**: Transform row values into column headers in SQL.
- **Action**: Wrote conditional aggregations `SUM(CASE WHEN quarter = 'Q1' THEN revenue END) AS Q1_revenue`.
- **Result**: Delivered formatted cross-tabulation reports without requiring application-side reshaping.

---

### Q57: How do you unpivot columns into rows in SQL?
**Technical Answer:**
Use `UNION ALL` or native `UNPIVOT` operator.

**STAR Framework Answer:**
- **Situation**: Legacy tables stored product sales across columns (`sales_2021`, `sales_2022`, `sales_2023`), preventing time-series analysis.
- **Task**: Normalize wide column data into narrow row format.
- **Action**: Unpivoted columns into rows using `UNION ALL` statements combining year and sales values.
- **Result**: Enabled standard time-series graphing and trend forecasting in BI tools.

---

### Q58: What is `GROUPING SETS` in SQL?
**Technical Answer:**
`GROUPING SETS` calculates multiple `GROUP BY` aggregations in a single query pass.

**STAR Framework Answer:**
- **Situation**: BI report required aggregations by `(Region, Category)`, `(Region)`, and `(Grand Total)`, requiring 3 separate queries combined with `UNION ALL`.
- **Task**: Optimize multi-level aggregation execution.
- **Action**: Replaced multiple queries with `GROUP BY GROUPING SETS ((region, category), (region), ())`.
- **Result**: Reduced database disk read I/O by 66% and cut execution time in half.

---

### Q59: What is `ROLLUP` operator?
**Technical Answer:**
`ROLLUP` generates hierarchical subtotal and grand total aggregations moving left-to-right.

**STAR Framework Answer:**
- **Situation**: Financial reports required hierarchical sales subtotals by Year -> Quarter -> Month.
- **Task**: Generate hierarchical totals automatically in SQL.
- **Action**: Executed `GROUP BY ROLLUP(year, quarter, month)`.
- **Result**: Produced structured drill-down financial reports directly from database query results.

---

### Q60: What is `CUBE` operator?
**Technical Answer:**
`CUBE` generates all possible cross-tabulation combination subtotals for columns ($2^N$ combinations).

**STAR Framework Answer:**
- **Situation**: Data science needed full cross-dimensional aggregations across `Region`, `Product`, and `Channel`.
- **Task**: Compute all $2^3 = 8$ aggregate combinations in one pass.
- **Action**: Executed `GROUP BY CUBE(region, product, channel)`.
- **Result**: Populated analytical data cube tables in a single scheduled query pass.

---

### Q61: What is the `GROUPING()` function used for?
**Technical Answer:**
`GROUPING(col)` returns `1` if the column is aggregated (subtotal row) or `0` for detail rows.

**STAR Framework Answer:**
- **Situation**: Output report needed to label subtotal rows generated by `ROLLUP` as "All Regions" or "Grand Total".
- **Task**: Distinguish subtotal nulls from actual data nulls.
- **Action**: Used `CASE WHEN GROUPING(region) = 1 THEN 'All Regions' ELSE region END`.
- **Result**: Delivered clean, human-readable summary labels in reporting UI tables.

---

### Q62: How do you calculate moving averages (e.g., 7-day moving average)?
**Technical Answer:**
`AVG(col) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`

**STAR Framework Answer:**
- **Situation**: Smoothed out daily website traffic spikes by displaying a 7-day moving average trendline.
- **Task**: Compute rolling 7-day averages efficiently.
- **Action**: Applied `AVG(daily_visits) OVER (ORDER BY visit_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`.
- **Result**: Provided product managers with clear, noise-free user growth trends.

---

### Q63: Can window functions be used inside `WHERE` or `HAVING` clauses?
**Technical Answer:**
**No.** Window functions evaluate during `SELECT` phase (Step 5), *after* `WHERE` (Step 2) and `HAVING` (Step 4). Must wrap in CTE/subquery to filter.

**STAR Framework Answer:**
- **Situation**: Query failed with `Window functions not allowed in WHERE` when trying to filter `ROW_NUMBER() = 1`.
- **Task**: Filter query results based on window function output.
- **Action**: Encapsulated the window calculation inside a CTE and filtered `WHERE rn = 1` in the outer query.
- **Result**: Fixed query syntax errors and established team design patterns.

---

### Q64: How do you find duplicate rows in a database table?
**Technical Answer:**
`GROUP BY` candidate columns and filter `HAVING COUNT(*) > 1`.

**STAR Framework Answer:**
- **Situation**: System integration errors caused duplicate user registrations with identical email addresses.
- **Task**: Identify all duplicate user records for cleanup.
- **Action**: Executed `SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1`.
- **Result**: Located 350 duplicate email groups for automated deduplication.

---

### Q65: How do you delete duplicate rows while keeping only one copy?
**Technical Answer:**
Use `ROW_NUMBER() OVER (PARTITION BY col ORDER BY id)` inside a CTE and `DELETE WHERE rn > 1`.

**STAR Framework Answer:**
- **Situation**: Needed to clean up 50,000 duplicate customer records while preserving the oldest record (`id` smallest).
- **Task**: Safely delete duplicates in a single SQL operation.
- **Action**: Wrote `WITH Dups AS (SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id ASC) rn FROM users) DELETE FROM Dups WHERE rn > 1`.
- **Result**: Safely purged duplicate records while retaining 100% of original account creations.

---

## Part 4: Database Architecture, Indexing & Optimization (Q66 - Q80)

### Q66: What is a Database Index? How does it work?
**Technical Answer:**
An Index is a B-Tree data structure that speeds up data retrieval at the cost of additional storage and write overhead.

**STAR Framework Answer:**
- **Situation**: User search by `last_name` over 10 million rows took 8 seconds (Full Table Scan).
- **Task**: Speed up lookup performance to under 100ms.
- **Action**: Created a B-Tree index `CREATE INDEX idx_users_lastname ON users(last_name)`.
- **Result**: Reduced query response time from 8,000ms to 4ms ($2000\times$ speedup).

---

### Q67: What is the difference between a Clustered Index and a Non-Clustered Index?
**Technical Answer:**
- **Clustered Index**: Physical data rows sorted on disk by key. Max 1 per table. Leaf nodes contain data.
- **Non-Clustered Index**: Separate structure with key pointers to data. Multiple allowed per table.

**STAR Framework Answer:**
- **Situation**: High range-query scan latency on order creation dates (`order_date BETWEEN...`).
- **Task**: Optimize disk I/O scan performance for date range queries.
- **Action**: Defined `order_date` as the Clustered Index key (and surrogate PK as Non-Clustered).
- **Result**: Accelerated range scan performance by storing sequential dates physically adjacent on disk.

---

### Q68: What is a B-Tree Index structure?
**Technical Answer:**
A balanced tree keeping data sorted, supporting logarithmic search, insert, and delete operations ($O(\log N)$).

**STAR Framework Answer:**
- **Situation**: Evaluated database index choices for equality and range query performance across 50M records.
- **Task**: Select an index structure capable of handling both point lookups and range queries efficiently.
- **Action**: Standardized on B-Tree indexes, leveraging leaf-node linked lists for range scans.
- **Result**: Maintained sub-10ms lookup latencies across all core application search queries.

---

### Q69: What is a Composite Index? What is the "Leftmost Prefix" rule?
**Technical Answer:**
An index on multiple columns `(A, B, C)`. It can only be used if query filters include columns starting from the leftmost position (`A`, or `A, B`).

**STAR Framework Answer:**
- **Situation**: Query filtering `WHERE tenant_id = 5 AND status = 'active'` was skipping an unoptimized index on `(status, tenant_id)`.
- **Task**: Re-order composite index columns matching query predicate selectivity.
- **Action**: Created composite index `(tenant_id, status)` following the Leftmost Prefix rule based on high cardinality of `tenant_id`.
- **Result**: Improved query execution speed by 15x.

---

### Q70: What is a Covering Index?
**Technical Answer:**
A non-clustered index containing all columns requested by a query, enabling Index-Only Scans without table lookups.

**STAR Framework Answer:**
- **Situation**: High-frequency query `SELECT id, email FROM users WHERE status = 'active'` caused excessive random disk lookups.
- **Task**: Eliminate table row disk lookup overhead entirely.
- **Action**: Created a covering index `CREATE INDEX idx_status_inc ON users(status) INCLUDE (email)`.
- **Result**: Converted query executions to Index-Only Scans, doubling API throughput.

---

### Q71: What is Index Fragmentation and how is it resolved?
**Technical Answer:**
Page gaps and out-of-order pages caused by heavy writes. Resolved via Index Reorganize or Index Rebuild.

**STAR Framework Answer:**
- **Situation**: Over time, query latencies degraded by 40% on tables handling 1M daily updates due to 85% index fragmentation.
- **Task**: Restore index scan efficiency automatically.
- **Action**: Scheduled weekly automated maintenance jobs executing `ALTER INDEX ALL ON orders REBUILD` during off-peak hours.
- **Result**: Restored query latencies to baseline speeds and reclaimed 15GB of fragmented disk space.

---

### Q72: What is an Execution Plan (EXPLAIN / EXPLAIN ANALYZE)?
**Technical Answer:**
Displays steps chosen by Query Optimizer. `EXPLAIN` shows estimates; `EXPLAIN ANALYZE` executes and outputs real timings.

**STAR Framework Answer:**
- **Situation**: A critical checkout query suddenly slowed down during peak traffic.
- **Task**: Identify exact bottleneck operators in query execution.
- **Action**: Ran `EXPLAIN ANALYZE`, discovering the optimizer chose a Sequential Scan due to outdated table statistics.
- **Result**: Ran `ANALYZE orders`, which updated statistics, restoring index seek execution and fixing latency.

---

### Q73: What is a Full Table Scan vs Index Scan vs Index Seek?
**Technical Answer:**
- **Table Scan**: Sequential disk scan of all rows ($O(N)$).
- **Index Scan**: Sequential scan of index leaf pages.
- **Index Seek**: B-Tree traversal directly to target row ($O(\log N)$).

**STAR Framework Answer:**
- **Situation**: API latency spiked because user login query executed a Full Table Scan on 20M rows.
- **Task**: Convert execution from Full Table Scan to Index Seek.
- **Action**: Added missing unique index on `users(email)`.
- **Result**: Execution operator changed from Seq Scan to Index Seek, dropping latency from 4.5s to 1.2ms.

---

### Q74: What makes a query Non-SARGable? Give examples.
**Technical Answer:**
Applying functions/operators to columns in `WHERE` prevents index usage: `WHERE YEAR(created_at) = 2023`.

**STAR Framework Answer:**
- **Situation**: Query using `WHERE UPPER(email) = 'USER@DOMAIN.COM'` was taking 6 seconds, ignoring the email index.
- **Task**: Make query predicate SARGable or index the expression.
- **Action**: Created an expression index `CREATE INDEX idx_upper_email ON users(UPPER(email))`.
- **Result**: Restored index usage, cutting execution time from 6,000ms to 3ms.

---

### Q75: What is Table Partitioning? Contrast Range vs List vs Hash Partitioning.
**Technical Answer:**
Splits large tables physically on disk (Range, List, Hash) while maintaining a single logical table interface.

**STAR Framework Answer:**
- **Situation**: 2-billion-row audit log table was unmaintainable; queries searching recent logs scanned ancient data.
- **Task**: Improve query efficiency and log archival maintenance.
- **Action**: Implemented Range Partitioning by month (`PARTITION BY RANGE (log_date)`).
- **Result**: Queries filtering on current month scanned only the active partition, accelerating queries by 10x and allowing instant archival drop of old partitions.

---

### Q76: What is Partition Pruning?
**Technical Answer:**
Optimization feature where the engine skips unneeded physical table partitions based on `WHERE` filters.

**STAR Framework Answer:**
- **Situation**: Verifying partition efficiency on 50 partitioned tables.
- **Task**: Ensure queries avoid scanning historical partitions.
- **Action**: Enforced partition key inclusion in all application `WHERE` clauses (`WHERE log_date >= '2023-10-01'`).
- **Result**: Execution plans confirmed 11 out of 12 monthly partitions were pruned from execution.

---

### Q77: What is the difference between Database Partitioning and Database Sharding?
**Technical Answer:**
- **Partitioning**: Splits table across files/disks on a **single database node**.
- **Sharding**: Horizontally distributes rows across **multiple independent server nodes**.

**STAR Framework Answer:**
- **Situation**: Single PostgreSQL instance hit hardware CPU/disk limits at 100,000 writes/second.
- **Task**: Scale database infrastructure beyond single-node physical capacity.
- **Action**: Architected horizontal database sharding using Citus, partitioning data by `tenant_id` across 8 worker nodes.
- **Result**: Scaled throughput capacity linearly to 500,000 writes/second.

---

### Q78: What are Database Statistics and why are they vital?
**Technical Answer:**
Statistical distribution summaries (histograms) used by Cost-Based Optimizer to select execution plans.

**STAR Framework Answer:**
- **Situation**: Post data migration, complex join queries unexpectedly chose slow Nested Loops instead of Hash Joins.
- **Task**: Fix suboptimal optimizer join strategies.
- **Action**: Discovered statistics were missing on newly loaded tables; ran `ANALYZE` across all schemas.
- **Result**: Optimizer correctly identified table cardinalities and switched to Hash Joins, speeding up reports by 20x.

---

### Q79: Explain Nested Loop Join vs Hash Join vs Merge Join.
**Technical Answer:**
- **Nested Loop**: Iterates outer row, seeks inner. Best for small/indexed inputs.
- **Hash Join**: Builds in-memory hash table for smaller input, probes with larger. Best for large unsorted datasets.
- **Merge Join**: Merges pre-sorted inputs concurrently. Best for large sorted/indexed inputs.

**STAR Framework Answer:**
- **Situation**: Joining 10M unindexed rows was stalling backend workers due to Nested Loop selection.
- **Task**: Guide optimizer to use high-throughput join operators for bulk operations.
- **Action**: Increasing work memory (`work_mem = 64MB`) enabled the optimizer to build in-memory Hash Joins.
- **Result**: Cut bulk join execution time from 15 minutes to 35 seconds.

---

### Q80: How do you identify and optimize slow-running queries in production?
**Technical Answer:**
1. Monitor Slow Query Logs (`pg_stat_statements`).
2. Run `EXPLAIN ANALYZE`.
3. Fix non-SARGable predicates / Add targeted composite indexes.
4. Eliminate `SELECT *`.

**STAR Framework Answer:**
- **Situation**: P99 latency degraded to 4 seconds during peak user activity.
- **Task**: Diagnose and remediate top slow queries impacting production SLAs.
- **Action**: Used `pg_stat_statements` to locate top CPU-consuming query, analyzed plan (`EXPLAIN ANALYZE`), added missing composite index on `(user_id, created_at)`, and replaced `SELECT *` with specific columns.
- **Result**: Dropped P99 latency from 4,000ms down to 85ms, meeting production SLA.

---

## Part 5: Transactions, Concurrency & Security (Q81 - Q90)

### Q81: What is a Database Transaction?
**Technical Answer:**
A logical unit of work executing completely or not at all (Atomic execution).

**STAR Framework Answer:**
- **Situation**: System crash during fund transfer deducted money from Sender without crediting Receiver.
- **Task**: Ensure complete transactional integrity across monetary updates.
- **Action**: Wrapped both updates inside an explicit transaction block (`BEGIN ... COMMIT`) with `ROLLBACK` on error.
- **Result**: Guaranteed zero partial transfers; failed operations roll back cleanly 100% of the time.

---

### Q82: Explain ACID properties in detail.
**Technical Answer:**
Atomicity (All or nothing), Consistency (Constraints enforced), Isolation (Concurrent safety), Durability (Persisted on commit).

**STAR Framework Answer:**
- **Situation**: Financial audit required proving database compliance against hardware failure and concurrent double-spending.
- **Task**: Audit and configure engine parameters enforcing strict ACID guarantees.
- **Action**: Enabled write-ahead logging (`wal_level = replica`), set `full_page_writes = ON`, and enforced strict Foreign Key constraints.
- **Result**: Successfully passed financial compliance audit with zero data loss during simulated failover tests.

---

### Q83: What read anomalies can occur during concurrent transactions?
**Technical Answer:**
- **Dirty Read**: Reading uncommitted data.
- **Non-Repeatable Read**: Value changes upon re-reading.
- **Phantom Read**: New rows appear in range query upon re-reading.

**STAR Framework Answer:**
- **Situation**: Booking system allowed two users to reserve the same seat because uncommitted reservations were read by concurrent sessions (Dirty Read).
- **Task**: Eliminate read anomalies in seat reservation workflows.
- **Action**: Raised transaction isolation level to `Read Committed` and applied `SELECT ... FOR UPDATE` row locks during seat verification.
- **Result**: Completely eliminated double-booking bugs.

---

### Q84: What are the 4 ANSI SQL Transaction Isolation Levels?
**Technical Answer:**
Read Uncommitted, Read Committed, Repeatable Read, Serializable.

**STAR Framework Answer:**
- **Situation**: Financial ledger report required constant data snapshot consistency while concurrent batch updates modified balances.
- **Task**: Select isolation level preventing phantom reads during report generation.
- **Action**: Executed audit queries under `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ` (or `SERIALIZABLE`).
- **Result**: Generated perfectly balanced financial reports without locking out concurrent writers.

---

### Q85: What is Optimistic Locking vs Pessimistic Locking?
**Technical Answer:**
- **Pessimistic**: Locks row immediately (`SELECT FOR UPDATE`). Best for high contention.
- **Optimistic**: Uses version column check on update (`WHERE version = old_ver`). Best for low contention.

**STAR Framework Answer:**
- **Situation**: High-concurrency inventory update service experienced DB lock escalation under Pessimistic locking.
- **Task**: Increase write concurrency while preventing lost updates.
- **Action**: Converted to Optimistic Locking, adding `version_id` column and updating via `UPDATE inventory SET stock = stock - 1, version_id = version_id + 1 WHERE id = 10 AND version_id = current_ver`.
- **Result**: Increased concurrent throughput by 5x while handling collision retries in application layer.

---

### Q86: What is a Deadlock and how can it be resolved?
**Technical Answer:**
Circular lock dependency between transactions. Engine aborts one transaction (victim). Resolved by standardizing resource locking order.

**STAR Framework Answer:**
- **Situation**: Deadlock errors were aborting 5% of concurrent account transfers during peak hours.
- **Task**: Eliminate circular wait lock dependencies.
- **Action**: Standardized locking order: modified application code to always sort account IDs and acquire locks in ascending order (`WHERE account_id IN (smaller_id, larger_id)`).
- **Result**: Reduced production deadlock rate to 0%.

---

### Q87: What is SQL Injection (SQLi)? How do you prevent it?
**Technical Answer:**
Injection of malicious SQL strings via user input. Prevented using Parameterized Queries / Prepared Statements.

**STAR Framework Answer:**
- **Situation**: Security audit identified dynamic SQL string concatenation vulnerability in search endpoints (`"SELECT * FROM users WHERE name = '" + input + "'"`).
- **Task**: Remediate all SQL injection vulnerabilities across backend codebase.
- **Action**: Refactored database access code to strictly use Prepared Statements with bound parameters (`WHERE name = ?`).
- **Result**: Achieved 100% security vulnerability remediation compliance.

---

### Q88: What is Row-Level Security (RLS)?
**Technical Answer:**
Database feature restricting row visibility per user session context automatically.

**STAR Framework Answer:**
- **Situation**: Multi-tenant SaaS app risked data leakage if developers forgot to include `WHERE tenant_id = X` in custom queries.
- **Task**: Enforce tenant data isolation at database engine level.
- **Action**: Enabled PostgreSQL Row-Level Security (`ALTER TABLE documents ENABLE ROW LEVEL SECURITY`) with policy `USING (tenant_id = current_setting('app.current_tenant'))`.
- **Result**: Guaranteed complete cross-tenant data isolation even if application queries omitted tenant filters.

---

### Q89: What is the difference between `GRANT` and `REVOKE`?
**Technical Answer:**
- `GRANT`: Assigns privileges.
- `REVOKE`: Removes privileges.

**STAR Framework Answer:**
- **Situation**: Application service account had excessive DB superuser privileges, violating least privilege policy.
- **Task**: Restrict microservice database permissions to minimal required operations.
- **Action**: Revoked superuser status (`REVOKE ALL ON DATABASE`), created restricted role, and granted specific DML (`GRANT SELECT, INSERT, UPDATE ON ALL TABLES TO app_role`).
- **Result**: Passed SOC2 compliance audit for database access control.

---

### Q90: What is Data Masking / Dynamic Data Masking?
**Technical Answer:**
Obfuscates sensitive data (SSN, credit card) for non-privileged database users dynamically.

**STAR Framework Answer:**
- **Situation**: Customer support reps viewing customer records needed access to profiles without exposing full credit card numbers.
- **Task**: Protect PII/PCI data from unauthorized internal visibility.
- **Action**: Configured Dynamic Data Masking on `credit_card` column (`MASKED WITH (FUNCTION = 'partial(0,"XXXX-XXXX-XXXX-",4)')`).
- **Result**: Displayed masked cards (`XXXX-XXXX-XXXX-1234`) to support reps while preserving full data for payment processors.

---

## Part 6: Advanced & System Design Scenarios (Q91 - Q100)

### Q91: What is the difference between OLTP and OLAP systems?
**Technical Answer:**
- **OLTP**: Normalized (3NF), high volume fast single-row writes (Operational).
- **OLAP**: Denormalized (Star Schema), columnar storage, heavy aggregate queries (Analytical).

**STAR Framework Answer:**
- **Situation**: Running complex analytical queries directly on our PostgreSQL production OLTP database was locking tables and freezing checkout APIs.
- **Task**: Separate operational transactions from analytical reporting workloads.
- **Action**: Built an ETL pipeline streaming OLTP data into Snowflake (OLAP columnar warehouse) dedicated for BI reporting.
- **Result**: Restored sub-50ms latency to OLTP checkout transactions and enabled fast BI queries over billions of rows.

---

### Q92: What is a Star Schema vs Snowflake Schema in Data Warehousing?
**Technical Answer:**
- **Star Schema**: Central Fact table joined directly to denormalized Dimension tables (Fewer joins, faster reads).
- **Snowflake Schema**: Dimension tables normalized into sub-dimensions (Saves storage, more joins).

**STAR Framework Answer:**
- **Situation**: BI queries on a normalized Snowflake schema required 12 joins per report, degrading dashboard performance.
- **Task**: Optimize Data Warehouse schema for faster BI query execution.
- **Action**: Redesigned data model into a Star Schema, denormalizing dimension tables into central `dim_customers` and `dim_products`.
- **Result**: Reduced join count from 12 to 3 and improved report generation speed by 4x.

---

### Q93: What are Fact Tables and Dimension Tables?
**Technical Answer:**
- **Fact Table**: Contains numeric metrics/measures of business events (`sales_amount`, `quantity`).
- **Dimension Table**: Contains descriptive attributes (`customer_name`, `category`, `location`).

**STAR Framework Answer:**
- **Situation**: Designed a data mart for retail analytics tracking millions of daily store sales transactions.
- **Task**: Create an extensible data model separating quantitative metrics from descriptive attributes.
- **Action**: Built `fact_sales` storing foreign keys, quantities, and dollar amounts, linked to `dim_store`, `dim_date`, and `dim_product`.
- **Result**: Provided flexible slice-and-dice analytics capability across all retail business dimensions.

---

### Q94: What is a Slowly Changing Dimension (SCD)? Describe SCD Type 1, 2, and 3.
**Technical Answer:**
Manages historical dimension changes: Type 1 (Overwrite), Type 2 (Add new row with dates), Type 3 (Add previous column).

**STAR Framework Answer:**
- **Situation**: When customers moved cities, updating their address erased historical regional sales attribution records.
- **Task**: Preserve full historical customer address changes over time.
- **Action**: Implemented **SCD Type 2** on `dim_customers`, adding `effective_date`, `end_date`, and `is_current` columns.
- **Result**: Preserved 100% accurate historical regional sales attribution for audit reporting.

---

### Q95: What is a Stored Procedure vs User-Defined Function (UDF)?
**Technical Answer:**
- **Procedure**: Can perform DML/DDL, manages transactions (`COMMIT`), executed via `CALL`/`EXEC`.
- **UDF**: Must return value/table, cannot execute DML/DDL or transactions, called inline in `SELECT`.

**STAR Framework Answer:**
- **Situation**: Needed a reusable helper to format currency strings inline in `SELECT` queries, and a separate process to run night-end accounting reconciliation.
- **Task**: Implement correct database programmatic abstractions for both requirements.
- **Action**: Built a deterministic UDF `fn_format_currency(amount)` for inline SELECT formatting, and a Stored Procedure `sp_reconcile_daily_ledger()` managing transaction commits.
- **Result**: Cleanly separated inline computation logic from transactional batch workflows.

---

### Q96: What is Change Data Capture (CDC)?
**Technical Answer:**
Captures row-level database modifications from Write-Ahead Logs (WAL) and streams change events to downstream systems.

**STAR Framework Answer:**
- **Situation**: Polling production database with `SELECT * WHERE updated_at > last_poll` overloaded DB CPU during ETL extraction.
- **Task**: Extract real-time database changes with zero impact on operational database query load.
- **Action**: Deployed Debezium CDC reading PostgreSQL WAL log stream directly to Apache Kafka topics.
- **Result**: Reduced DB extraction load to near-zero while enabling sub-second real-time streaming ETL updates.

---

### Q97: What is Database Connection Pooling?
**Technical Answer:**
Caches reusable database connections to avoid TCP handshake overhead on every request.

**STAR Framework Answer:**
- **Situation**: Microservices opening/closing raw DB connections per HTTP request exhausted PostgreSQL `max_connections` limits under load spikes.
- **Task**: Prevent connection exhaustion and reduce latency.
- **Action**: Deployed PgBouncer connection pooler in transaction pooling mode between services and database.
- **Result**: Handled 10,000 concurrent client requests using only 100 backend DB connections, reducing connection overhead latency by 90%.

---

### Q98: How do you handle pagination efficiently in SQL for millions of records?
**Technical Answer:**
- Avoid `OFFSET N` (scans and discards N rows).
- Use **Keyset / Seek Pagination**: `WHERE id > last_seen_id ORDER BY id ASC LIMIT 20`.

**STAR Framework Answer:**
- **Situation**: Infinite scroll API endpoint using `OFFSET 500000 LIMIT 20` took 5 seconds to load page 25,000.
- **Task**: Provide constant $O(1)$ time pagination performance regardless of page depth.
- **Action**: Refactored API pagination to Keyset / Seek Pagination using `WHERE id > last_seen_id ORDER BY id ASC LIMIT 20`.
- **Result**: Reduced deep pagination response time from 5,000ms down to 3ms across 50 million records.

---

### Q99: What is Database Replication? Compare Primary-Replica (Master-Slave) vs Multi-Master.
**Technical Answer:**
- **Primary-Replica**: Writes routed to Primary; read-only data replicated asynchronously/synchronously to Replicas.
- **Multi-Master**: All nodes handle reads/writes; continuous synchronization with conflict resolution.

**STAR Framework Answer:**
- **Situation**: High read volume (95% reads, 5% writes) degraded Primary database CPU to 98%.
- **Task**: Offload read traffic to scale read capacity.
- **Action**: Configured 3 asynchronous Read Replicas and updated application database router to direct `SELECT` queries to Replicas while sending `INSERT/UPDATE` to Primary.
- **Result**: Reduced Primary CPU utilization to 25% and scaled overall read throughput by 4x.

---

### Q100: How do you design an SQL schema for a multi-tenant SaaS application?
**Technical Answer:**
1. Single DB + `tenant_id` column + Row-Level Security (RLS) - *Best scalability/cost*.
2. Schema-per-tenant - *Clean separation*.
3. Database-per-tenant - *Highest isolation/cost*.

**STAR Framework Answer:**
- **Situation**: Architected a multi-tenant SaaS platform serving 5,000 business tenants with strict data isolation and low cost footprint requirements.
- **Task**: Design a multi-tenant database strategy balancing cost, operational scalability, and strict security isolation.
- **Action**: Selected Single DB shared-schema model with `tenant_id` on all tables, enforcing PostgreSQL Row-Level Security (RLS) and automatic connection pool tenant context setting.
- **Result**: Scaled to 5,000 tenants on a cost-effective single cluster with 100% guaranteed tenant data isolation verified by external security audit.

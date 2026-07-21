# SQL Query Practice Questions

A curated collection of practical SQL query practice problems commonly asked in technical coding interviews at top product companies.

---

## Table of Contents
- [Easy Problems (1 - 15)](#easy-problems-1---15)
- [Medium Problems (16 - 35)](#medium-problems-16---35)
- [Hard Problems (36 - 50)](#hard-problems-36---50)

---

## Easy Problems (1 - 15)

### Problem 1: Second Highest Salary
**Difficulty**: Easy  
**Scenario**: Find the second highest salary from the `employees` table. If there is no second highest salary, return `NULL`.

#### Schema & Sample Data
`employees` table:
| id | salary |
|---|---|
| 1 | 10000 |
| 2 | 20000 |
| 3 | 30000 |

#### Expected Output
| SecondHighestSalary |
|---|
| 20000 |

#### Solution (ANSI SQL / Postgres / MySQL)
```sql
SELECT (
    SELECT DISTINCT salary 
    FROM employees
    ORDER BY salary DESC
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;
```

#### Explanation
Wrapping the subquery in `SELECT (...) AS ...` ensures that if offset 1 returns no row (e.g., table has only 1 row), the query safely evaluates to `NULL` instead of an empty result set.

---

### Problem 2: Duplicate Emails
**Difficulty**: Easy  
**Scenario**: Write a query to find all duplicate emails in the `users` table.

#### Schema & Sample Data
`users` table:
| id | email |
|---|---|
| 1 | a@b.com |
| 2 | c@d.com |
| 3 | a@b.com |

#### Expected Output
| email |
|---|
| a@b.com |

#### Solution
```sql
SELECT email
FROM users
GROUP BY email
HAVING COUNT(email) > 1;
```

---

### Problem 3: Customers Who Never Order
**Difficulty**: Easy  
**Scenario**: Find all customers who never placed any orders.

#### Solution
```sql
SELECT c.name AS Customers
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
```

---

### Problem 4: Employees Earning More Than Their Managers
**Difficulty**: Easy  
**Scenario**: Find employees who earn more than their direct manager.

#### Solution
```sql
SELECT e.name AS Employee
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;
```

---

### Problem 5: Big Countries
**Difficulty**: Easy  
**Scenario**: A country is big if it has an area of at least 3,000,000 km² or a population of at least 25,000,000. Write a query to report the name, population, and area of big countries.

#### Solution
```sql
SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;
```

---

### Problem 6: Classes With More Than 5 Students
**Difficulty**: Easy  
**Scenario**: Query all classes that have at least 5 students.

#### Solution
```sql
SELECT class
FROM courses
GROUP BY class
HAVING COUNT(DISTINCT student) >= 5;
```

---

### Problem 7: Delete Duplicate Emails
**Difficulty**: Easy  
**Scenario**: Delete duplicate emails from `person` table, keeping only one unique email with the smallest `id`.

#### Solution
```sql
DELETE p1
FROM person p1
JOIN person p2 ON p1.email = p2.email
WHERE p1.id > p2.id;
```

---

### Problem 8: Swap Salary
**Difficulty**: Easy  
**Scenario**: Swap all 'f' and 'm' values in `salary` table with a single `UPDATE` statement.

#### Solution
```sql
UPDATE salary
SET sex = CASE 
    WHEN sex = 'm' THEN 'f' 
    ELSE 'm' 
END;
```

---

### Problem 9: Combine Two Tables
**Difficulty**: Easy  
**Scenario**: Report first_name, last_name, city, and state for each person. If address is not present, report `NULL`.

#### Solution
```sql
SELECT p.first_name, p.last_name, a.city, a.state
FROM person p
LEFT JOIN address a ON p.person_id = a.person_id;
```

---

### Problem 10: Rising Temperature
**Difficulty**: Easy  
**Scenario**: Find all dates' `id` with higher temperatures compared to its previous dates (yesterday).

#### Solution
```sql
SELECT w1.id
FROM weather w1
JOIN weather w2 ON DATEDIFF(w1.record_date, w2.record_date) = 1
WHERE w1.temperature > w2.temperature;
```

---

### Problem 11: Replace Employee ID With Unique Identifier
**Difficulty**: Easy  
**Scenario**: Show the unique ID of each user, if a user does not have a unique ID, show `NULL`.

#### Solution
```sql
SELECT u.unique_id, e.name
FROM employees e
LEFT JOIN employee_uni u ON e.id = u.id;
```

---

### Problem 12: Product Sales Analysis
**Difficulty**: Easy  
**Scenario**: Write a query that reports the `product_name`, `year`, and `price` for each `sale_id` in the `Sales` table.

#### Solution
```sql
SELECT p.product_name, s.year, s.price
FROM sales s
JOIN product p ON s.product_id = p.product_id;
```

---

### Problem 13: Customer Who Visited but Did Not Make Any Transactions
**Difficulty**: Easy  
**Scenario**: Find IDs of users who visited without making transactions and count of such visits.

#### Solution
```sql
SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans
FROM visits v
LEFT JOIN transactions t ON v.visit_id = t.visit_id
WHERE t.transaction_id IS NULL
GROUP BY v.customer_id;
```

---

### Problem 14: Article Views
**Difficulty**: Easy  
**Scenario**: Find all authors that viewed at least one of their own articles. Sort result by `id` ascending.

#### Solution
```sql
SELECT DISTINCT author_id AS id
FROM views
WHERE author_id = viewer_id
ORDER BY id ASC;
```

---

### Problem 15: Invalid Tweets
**Difficulty**: Easy  
**Scenario**: Find IDs of invalid tweets whose content length is strictly greater than 15 characters.

#### Solution
```sql
SELECT tweet_id
FROM tweets
WHERE LENGTH(content) > 15;
```

---

## Medium Problems (16 - 35)

### Problem 16: Nth Highest Salary Function
**Difficulty**: Medium  
**Scenario**: Write a generic SQL query to find the Nth highest salary.

#### Solution
```sql
WITH RankedSalaries AS (
    SELECT salary,
           DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
    FROM employee
)
SELECT DISTINCT salary
FROM RankedSalaries
WHERE rnk = N;
```

---

### Problem 17: Department Highest Salary
**Difficulty**: Medium  
**Scenario**: Find employees who have the highest salary in each of the departments.

#### Solution
```sql
WITH DepartmentRanked AS (
    SELECT e.name AS Employee, e.salary, d.name AS Department,
           DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS rnk
    FROM employee e
    JOIN department d ON e.department_id = d.id
)
SELECT Department, Employee, salary AS Salary
FROM DepartmentRanked
WHERE rnk = 1;
```

---

### Problem 18: Consecutive Numbers
**Difficulty**: Medium  
**Scenario**: Find all numbers that appear at least three times consecutively.

#### Solution
```sql
WITH MarkedLogs AS (
    SELECT num,
           LAG(num, 1) OVER (ORDER BY id) AS prev1,
           LAG(num, 2) OVER (ORDER BY id) AS prev2
    FROM logs
)
SELECT DISTINCT num AS ConsecutiveNums
FROM MarkedLogs
WHERE num = prev1 AND num = prev2;
```

---

### Problem 19: Rank Scores
**Difficulty**: Medium  
**Scenario**: Rank scores without skipping rank numbers for ties (Dense Rank).

#### Solution
```sql
SELECT score,
       DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank'
FROM scores;
```

---

### Problem 20: Tree Node Classification
**Difficulty**: Medium  
**Scenario**: Each node in a binary tree can be 'Root', 'Inner', or 'Leaf'. Write a query to output node ID and node type.

#### Solution
```sql
SELECT id,
       CASE 
           WHEN p_id IS NULL THEN 'Root'
           WHEN id IN (SELECT DISTINCT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner'
           ELSE 'Leaf'
       END AS type
FROM Tree;
```

---

### Problem 21: Capital Gain/Loss
**Difficulty**: Medium  
**Scenario**: Write a query to report the Capital Gain/Loss for each stock (Total Sell Price - Total Buy Price).

#### Solution
```sql
SELECT stock_name,
       SUM(CASE WHEN operation = 'Sell' THEN price ELSE -price END) AS capital_gain_loss
FROM stocks
GROUP BY stock_name;
```

---

### Problem 22: Monthly Transactions
**Difficulty**: Medium  
**Scenario**: Find for each month and country: number of transactions, approved transaction count, total amount, approved total amount.

#### Solution
```sql
SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month,
       country,
       COUNT(*) AS trans_count,
       SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
       SUM(amount) AS trans_total_amount,
       SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM transactions
GROUP BY month, country;
```

---

### Problem 23: Immediate Food Delivery
**Difficulty**: Medium  
**Scenario**: If customer's preferred delivery date is same as order date, it is immediate, else scheduled. Find percentage of immediate orders in first orders of all customers.

#### Solution
```sql
WITH FirstOrders AS (
    SELECT customer_id, order_date, customer_pref_delivery_date,
           ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date ASC) as rn
    FROM delivery
)
SELECT ROUND(
    (SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) * 100.0) / COUNT(*), 
    2
) AS immediate_percentage
FROM FirstOrders
WHERE rn = 1;
```

---

### Problem 24: Game Play Analysis (1-Day Retention)
**Difficulty**: Medium  
**Scenario**: Write a query to report the fraction of players that logged in again on the day after their first login.

#### Solution
```sql
WITH FirstLogin AS (
    SELECT player_id, MIN(event_date) AS first_date
    FROM activity
    GROUP BY player_id
)
SELECT ROUND(
    COUNT(a.player_id) * 1.0 / (SELECT COUNT(DISTINCT player_id) FROM activity), 
    2
) AS fraction
FROM FirstLogin fl
JOIN activity a ON fl.player_id = a.player_id AND a.event_date = DATE_ADD(fl.first_date, INTERVAL 1 DAY);
```

---

### Problem 25: Managers with at Least 5 Direct Reports
**Difficulty**: Medium  
**Scenario**: Find managers with at least 5 direct reports.

#### Solution
```sql
SELECT name
FROM employee
WHERE id IN (
    SELECT manager_id
    FROM employee
    GROUP BY manager_id
    HAVING COUNT(*) >= 5
);
```

---

### Problem 26: Product Price at a Given Date
**Difficulty**: Medium  
**Scenario**: Find prices of all products on `2019-08-16`. Assume initial price before any change is 10.

#### Solution
```sql
WITH LatestChange AS (
    SELECT product_id, new_price,
           ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY change_date DESC) AS rn
    FROM products
    WHERE change_date <= '2019-08-16'
)
SELECT p.product_id, COALESCE(lc.new_price, 10) AS price
FROM (SELECT DISTINCT product_id FROM products) p
LEFT JOIN LatestChange lc ON p.product_id = lc.product_id AND lc.rn = 1;
```

---

### Problem 27: Count Salary Categories
**Difficulty**: Medium  
**Scenario**: Calculate number of bank accounts for each salary category: "Low Salary" (< 20000), "Average Salary" ([20000, 50000]), "High Salary" (> 50000).

#### Solution
```sql
SELECT 'Low Salary' AS category, COUNT(*) AS accounts_count FROM accounts WHERE income < 20000
UNION ALL
SELECT 'Average Salary' AS category, COUNT(*) AS accounts_count FROM accounts WHERE income BETWEEN 20000 AND 50000
UNION ALL
SELECT 'High Salary' AS category, COUNT(*) AS accounts_count FROM accounts WHERE income > 50000;
```

---

### Problem 28: Find Users With Valid E-Mails
**Difficulty**: Medium  
**Scenario**: Find users who have valid emails ending with `@leetcode.com`.

#### Solution
```sql
SELECT *
FROM users
WHERE email REGEXP '^[A-Za-z][A-Za-z0-9_.-]*@leetcode[.]com$';
```

---

### Problem 29: Movie Rating (Top User & Top Movie)
**Difficulty**: Medium  
**Scenario**: 1. Find user rating most movies. 2. Find movie with highest average rating in Feb 2020.

#### Solution
```sql
(
    SELECT u.name AS results
    FROM movie_rating mr
    JOIN users u ON mr.user_id = u.user_id
    GROUP BY u.user_id
    ORDER BY COUNT(*) DESC, u.name ASC
    LIMIT 1
)
UNION ALL
(
    SELECT m.title AS results
    FROM movie_rating mr
    JOIN movies m ON mr.movie_id = m.movie_id
    WHERE mr.created_at BETWEEN '2020-02-01' AND '2020-02-29'
    GROUP BY m.movie_id
    ORDER BY AVG(mr.rating) DESC, m.title ASC
    LIMIT 1
);
```

---

### Problem 30: Last Person to Fit in the Bus
**Difficulty**: Medium  
**Scenario**: Bus weight limit is 1000 kg. Find the name of the last person who can board.

#### Solution
```sql
WITH RunningWeight AS (
    SELECT person_name, turn,
           SUM(weight) OVER (ORDER BY turn ASC) AS total_weight
    FROM Queue
)
SELECT person_name
FROM RunningWeight
WHERE total_weight <= 1000
ORDER BY turn DESC
LIMIT 1;
```

---

### Problem 31: Exchange Seats
**Difficulty**: Medium  
**Scenario**: Swap seat id of every two consecutive students.

#### Solution
```sql
SELECT 
    CASE 
        WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM seat) THEN id
        WHEN id % 2 = 1 THEN id + 1
        ELSE id - 1
    END AS id,
    student
FROM seat
ORDER BY id ASC;
```

---

### Problem 32: Friend Requests: Who Has the Most Friends
**Difficulty**: Medium  
**Scenario**: Find the person who has the most friends and total number of friends.

#### Solution
```sql
WITH AllFriends AS (
    SELECT requester_id AS id FROM request_accepted
    UNION ALL
    SELECT accepter_id AS id FROM request_accepted
)
SELECT id, COUNT(*) AS num
FROM AllFriends
GROUP BY id
ORDER BY num DESC
LIMIT 1;
```

---

### Problem 33: Investments in 2016
**Difficulty**: Medium  
**Scenario**: Sum `tiv_2016` for policyholders matching criteria.

#### Solution
```sql
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM insurance
WHERE tiv_2015 IN (
    SELECT tiv_2015 FROM insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1
)
AND (lat, lon) IN (
    SELECT lat, lon FROM insurance GROUP BY lat, lon HAVING COUNT(*) = 1
);
```

---

### Problem 34: Second Most Recent Activity
**Difficulty**: Medium  
**Scenario**: Show second most recent activity of each user (or 1st if only 1).

#### Solution
```sql
WITH ActivityRank AS (
    SELECT username, activity, startDate, endDate,
           COUNT(*) OVER (PARTITION BY username) AS total_act,
           ROW_NUMBER() OVER (PARTITION BY username ORDER BY endDate DESC) AS rn
    FROM UserActivity
)
SELECT username, activity, startDate, endDate
FROM ActivityRank
WHERE rn = 2 OR total_act = 1;
```

---

### Problem 35: Calculate Special Bonus
**Difficulty**: Medium  
**Scenario**: Calculate bonus of each employee based on conditions.

#### Solution
```sql
SELECT employee_id,
       CASE 
           WHEN employee_id % 2 = 1 AND name NOT LIKE 'M%' THEN salary
           ELSE 0
       END AS bonus
FROM employees
ORDER BY employee_id;
```

---

## Hard Problems (36 - 50)

### Problem 36: Stadium Consecutive Rows (Gaps & Islands)
**Difficulty**: Hard  
**Scenario**: Display records with 3 or more consecutive rows where `people >= 100`.

#### Solution
```sql
WITH Filtered AS (
    SELECT id, visit_date, people,
           id - ROW_NUMBER() OVER (ORDER BY id) AS grp
    FROM stadium
    WHERE people >= 100
),
GroupCounts AS (
    SELECT id, visit_date, people, grp,
           COUNT(*) OVER (PARTITION BY grp) AS cnt
    FROM Filtered
)
SELECT id, visit_date, people
FROM GroupCounts
WHERE cnt >= 3
ORDER BY visit_date ASC;
```

---

### Problem 37: Department Top 3 Salaries
**Difficulty**: Hard  
**Scenario**: Find employees who earn top 3 unique salaries in each department.

#### Solution
```sql
WITH SalaryRanks AS (
    SELECT e.name AS Employee, e.salary AS Salary, d.name AS Department,
           DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) as rnk
    FROM employee e
    JOIN department d ON e.department_id = d.id
)
SELECT Department, Employee, Salary
FROM SalaryRanks
WHERE rnk <= 3;
```

---

### Problem 38: Trips and Users (Cancellation Rate)
**Difficulty**: Hard  
**Scenario**: Find cancellation rate of unbanned users each day between `"2013-10-01"` and `"2013-10-03"`.

#### Solution
```sql
SELECT t.request_at AS Day,
       ROUND(
           SUM(CASE WHEN t.status LIKE 'cancelled%' THEN 1.0 ELSE 0.0 END) / COUNT(*),
           2
       ) AS 'Cancellation Rate'
FROM trips t
JOIN users c ON t.client_id = c.users_id AND c.banned = 'No'
JOIN users d ON t.driver_id = d.users_id AND d.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at;
```

---

### Problem 39: Consecutive Active Days (User Streaks)
**Difficulty**: Hard  
**Scenario**: Find users who logged in for 5 or more consecutive days.

#### Solution
```sql
WITH UniqueLogins AS (
    SELECT DISTINCT user_id, CAST(login_date AS DATE) AS log_date
    FROM user_logins
),
GroupedLogins AS (
    SELECT user_id, log_date,
           DATE_SUB(log_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY log_date) DAY) AS streak_group
    FROM UniqueLogins
)
SELECT user_id, COUNT(*) AS streak_length
FROM GroupedLogins
GROUP BY user_id, streak_group
HAVING COUNT(*) >= 5;
```

---

### Problem 40: Quiet Students in an Exam
**Difficulty**: Hard  
**Scenario**: Report quiet students who took exams but never scored highest or lowest score.

#### Solution
```sql
WITH ExamMinMax AS (
    SELECT exam_id,
           MIN(score) AS min_score,
           MAX(score) AS max_score
    FROM exam
    GROUP BY exam_id
),
LoudStudents AS (
    SELECT DISTINCT e.student_id
    FROM exam e
    JOIN ExamMinMax mm ON e.exam_id = mm.exam_id
    WHERE e.score = mm.min_score OR e.score = mm.max_score
)
SELECT s.student_id, s.student_name
FROM student s
WHERE s.student_id IN (SELECT DISTINCT student_id FROM exam)
  AND s.student_id NOT IN (SELECT student_id FROM LoudStudents);
```

---

### Problem 41: Median Employee Salary
**Difficulty**: Hard  
**Scenario**: Find median salary of each company.

#### Solution
```sql
WITH Ranked AS (
    SELECT id, company, salary,
           ROW_NUMBER() OVER (PARTITION BY company ORDER BY salary ASC, id ASC) AS rn,
           COUNT(*) OVER (PARTITION BY company) AS total_cnt
    FROM employee
)
SELECT id, company, salary
FROM Ranked
WHERE rn IN (FLOOR((total_cnt + 1) / 2.0), FLOOR((total_cnt + 2) / 2.0));
```

---

### Problem 42: Overlapping User Sessions
**Difficulty**: Hard  
**Scenario**: Identify users who have concurrent overlapping sessions.

#### Solution
```sql
SELECT DISTINCT s1.user_id
FROM sessions s1
JOIN sessions s2 ON s1.user_id = s2.user_id AND s1.session_id <> s2.session_id
WHERE s1.start_time < s2.end_time AND s1.end_time > s2.start_time;
```

---

### Problem 43: Page Recommendations
**Difficulty**: Hard  
**Scenario**: Recommend pages liked by friends of user 1, excluding pages already liked by user 1.

#### Solution
```sql
WITH User1Friends AS (
    SELECT user2_id AS friend_id FROM friendship WHERE user1_id = 1
    UNION
    SELECT user1_id AS friend_id FROM friendship WHERE user2_id = 1
)
SELECT DISTINCT page_id AS recommended_page
FROM likes
WHERE user_id IN (SELECT friend_id FROM User1Friends)
  AND page_id NOT IN (SELECT page_id FROM likes WHERE user_id = 1);
```

---

### Problem 44: Date Expansion Sales Report
**Difficulty**: Hard  
**Scenario**: Expand report period into annual sales amount per product.

#### Solution
```sql
WITH RECURSIVE Dates AS (
    SELECT product_id, average_daily_sales, start_date, end_date, start_date AS current_day
    FROM sales
    UNION ALL
    SELECT product_id, average_daily_sales, start_date, end_date, DATE_ADD(current_day, INTERVAL 1 DAY)
    FROM Dates
    WHERE current_day < end_date
)
SELECT d.product_id, p.product_name, 
       CAST(YEAR(d.current_day) AS CHAR) AS report_year,
       SUM(d.average_daily_sales) AS total_amount
FROM Dates d
JOIN product p ON d.product_id = p.product_id
GROUP BY d.product_id, p.product_name, report_year
ORDER BY d.product_id, report_year;
```

---

### Problem 45: Market Analysis (Favorite Brand Check)
**Difficulty**: Hard  
**Scenario**: Find for each seller whether brand of 2nd item sold matches their favorite brand.

#### Solution
```sql
WITH RankedOrders AS (
    SELECT seller_id, item_id,
           ROW_NUMBER() OVER (PARTITION BY seller_id ORDER BY order_date ASC) AS rn
    FROM orders
)
SELECT u.user_id AS seller_id,
       CASE 
           WHEN i.item_brand = u.favorite_brand THEN 'yes'
           ELSE 'no'
       END AS 2nd_item_fav_brand
FROM users u
LEFT JOIN RankedOrders ro ON u.user_id = ro.seller_id AND ro.rn = 2
LEFT JOIN items i ON ro.item_id = i.item_id;
```

---

### Problem 46: User Churn Rate Calculation
**Difficulty**: Hard  
**Scenario**: Calculate monthly churn rate.

#### Solution
```sql
WITH MonthlyActive AS (
    SELECT DISTINCT user_id, DATE_TRUNC('month', activity_date) AS m_date
    FROM user_activity
)
SELECT m1.m_date AS month,
       COUNT(m1.user_id) AS active_start,
       COUNT(m1.user_id) - COUNT(m2.user_id) AS churned_users,
       ROUND((COUNT(m1.user_id) - COUNT(m2.user_id)) * 1.0 / COUNT(m1.user_id), 4) AS churn_rate
FROM MonthlyActive m1
LEFT JOIN MonthlyActive m2 ON m1.user_id = m2.user_id AND m2.m_date = m1.m_date + INTERVAL '1 month'
GROUP BY m1.m_date;
```

---

### Problem 47: First and Last Order per Customer
**Difficulty**: Hard  
**Scenario**: Display customer name, first order date, last order date, and total amount spent.

#### Solution
```sql
SELECT c.name,
       MIN(o.order_date) AS first_order_date,
       MAX(o.order_date) AS last_order_date,
       SUM(o.amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;
```

---

### Problem 48: Relational Division (Assigned All Projects)
**Difficulty**: Hard  
**Scenario**: Find employees assigned to every single project.

#### Solution
```sql
SELECT employee_id
FROM employee_projects
GROUP BY employee_id
HAVING COUNT(DISTINCT project_id) = (SELECT COUNT(*) FROM projects);
```

---

### Problem 49: Top 2 Transactions Without Window Functions
**Difficulty**: Hard  
**Scenario**: Retrieve top 2 highest amounts for each customer without window functions.

#### Solution
```sql
SELECT t1.customer_id, t1.amount
FROM transactions t1
WHERE (
    SELECT COUNT(DISTINCT t2.amount)
    FROM transactions t2
    WHERE t2.customer_id = t1.customer_id AND t2.amount > t1.amount
) < 2
ORDER BY t1.customer_id, t1.amount DESC;
```

---

### Problem 50: Quarterly Revenue Pivot & YoY Growth
**Difficulty**: Hard  
**Scenario**: Produce quarterly revenue pivot table alongside YoY growth percentage.

#### Solution
```sql
WITH QuarterlySummary AS (
    SELECT year,
           SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END) AS Q1,
           SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS Q2,
           SUM(CASE WHEN quarter = 'Q3' THEN revenue ELSE 0 END) AS Q3,
           SUM(CASE WHEN quarter = 'Q4' THEN revenue ELSE 0 END) AS Q4,
           SUM(revenue) AS total_annual_revenue
    FROM company_revenue
    GROUP BY year
)
SELECT year, Q1, Q2, Q3, Q4, total_annual_revenue,
       ROUND(
           ((total_annual_revenue - LAG(total_annual_revenue) OVER (ORDER BY year)) * 100.0) / 
           NULLIF(LAG(total_annual_revenue) OVER (ORDER BY year), 0),
           2
       ) AS yoy_growth_pct
FROM QuarterlySummary;
```

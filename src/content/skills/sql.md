# SQL — cheatsheet

## When to reach for it

- **OLTP** — every relational database (PostgreSQL, MySQL, SQL Server, Oracle, SQLite) speaks SQL.
- **Analytics & reporting** — modern warehouses (BigQuery, Snowflake, Redshift, DuckDB) are all SQL-first.
- **Glue between systems** — ETL pipelines, dashboards, ad-hoc data exploration.

## Mental model

SQL is **declarative**: you describe the *shape* of the result you want, the engine's query planner figures out *how* to fetch it. Logical evaluation order (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT) is different from written order — knowing this explains 80% of the "why doesn't my alias work in WHERE" confusion. Indexes are sorted side-structures the planner *may* use; the right column order matters more than the column count.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **INNER / LEFT / FULL JOIN** | Intersection / left + matches / both sides full. Right is symmetric to Left. |
| **WHERE vs HAVING** | WHERE filters rows; HAVING filters groups (after `GROUP BY`). |
| **Primary key / unique / foreign key** | Identity / no duplicates / referential integrity. |
| **Index (B-tree)** | Sorted side-structure; O(log n) lookup; costs write speed. |
| **Clustered vs non-clustered** | Clustered = data ordered by key (one per table); non-clustered = pointer (many). |
| **Normalization (1NF→3NF)** | Eliminate redundancy / partial / transitive dependencies. |
| **CTE (`WITH`)** | Named, reusable subquery — also enables recursive queries. |
| **Window function** | Aggregate that doesn't collapse rows — `OVER (PARTITION BY ... ORDER BY ...)`. |
| **NULL semantics** | NULL ≠ NULL — comparisons return UNKNOWN; use `IS NULL`. |
| **ACID** | Atomicity / Consistency / Isolation / Durability — the OLTP safety promise. |
| **Isolation levels** | READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE. |

## Minimum example

```sql
-- Top 3 highest-paid employees per department, with rank, using a CTE + window.
WITH ranked AS (
  SELECT
    department,
    employee,
    salary,
    DENSE_RANK() OVER (
      PARTITION BY department
      ORDER BY salary DESC
    ) AS rk
  FROM employees
)
SELECT department, employee, salary
FROM ranked
WHERE rk <= 3
ORDER BY department, rk;

-- Always EXPLAIN before deploying a slow query.
EXPLAIN ANALYZE
SELECT u.id, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.signup_date >= '2025-01-01'
GROUP BY u.id;
```

## Common pitfalls

- **`WHERE col = NULL`** — never matches. Use `IS NULL`.
- **`NOT IN (subquery)` returning NULLs** — silently filters everything out. Use `NOT EXISTS`.
- **`SELECT *` in production code** — breaks when columns change, returns more data than needed, kills indexes' covering ability.
- **Over-indexing** — every index costs write speed and storage. Index frequent WHERE/JOIN columns, not every column.
- **N+1 queries from an ORM** — looping and querying per row instead of one JOIN. Watch the SQL log.
- **Functions on indexed columns** in WHERE (`WHERE YEAR(created_at) = 2025`) — disables index use. Rewrite to a range.

## What to learn next

- **`EXPLAIN`/`EXPLAIN ANALYZE`** for query plans · **window functions** in depth · **CTEs + recursive queries** · **transactions & isolation** · **dialect deep-dives** (PostgreSQL specifically — by far the richest open-source SQL) · **vendor extensions** (PostgreSQL JSON, full-text search, vectors).

> **Personal note:** _<TODO: what dialects you've worked with (MySQL/MSSQL) and tricky queries you've shipped.>_

## Sources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/)
- [MySQL Reference Manual](https://dev.mysql.com/doc/)
- [SQL on Wikipedia](https://en.wikipedia.org/wiki/SQL)
- [GeeksforGeeks — SQL Interview Questions](https://www.geeksforgeeks.org/sql/sql-interview-questions/)

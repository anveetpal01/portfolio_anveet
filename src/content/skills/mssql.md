# MSSQL — cheatsheet

## When to reach for it

- **Enterprise Windows / .NET shops** — first-class integration with .NET, Entity Framework Core, Azure.
- **Heavy transactional + analytical workloads** — mature OLTP plus column-store for OLAP in one engine.
- **Cross-platform now** — runs on Linux, Docker, ARM Macs (via Docker) since 2017.

## Mental model

SQL Server is a full-featured commercial RDBMS with three things you should always have in your mind: **T-SQL** (the dialect — variables, IF/WHILE, TRY/CATCH, procedures), **the query optimizer** (cost-based, plan-caching, parameterised), and **SSMS / Azure Data Studio** (the IDE tooling, with execution plans + Query Store + Profiler / Extended Events). Pick the right **edition** (Developer is free for non-prod; Express for tiny apps; Standard/Enterprise for production with a budget).

## Key concepts

| Concept | One-line meaning |
|---|---|
| **T-SQL** | Microsoft's procedural SQL dialect — used everywhere in SQL Server. |
| **Editions** | Express (free, small) · Standard · Enterprise · Developer (= Enterprise, non-prod). |
| **Clustered vs non-clustered** | Same logic as SQL standard — one clustered (=PK by default) + many non-clustered. |
| **Included columns** | Add extra columns to a non-clustered index → make it covering. |
| **`VARCHAR` vs `NVARCHAR`** | ASCII vs Unicode (UTF-16 / UTF-8 with `_UTF8` collation since 2019). |
| **Stored procedure vs function** | Procs do I/O + side effects; functions return a value/table inline. |
| **READ COMMITTED SNAPSHOT (RCSI)** | Optional MVCC mode — readers don't block writers. |
| **tempdb** | System DB for sorts, temp tables, version store — needs careful sizing. |
| **Execution plan** | The optimizer's chosen access path; estimated vs actual. |
| **Query Store** | Built-in plan & performance history (since 2016). |
| **AlwaysOn AG** | Primary + replicas for HA / read scaling (Enterprise). |
| **Column store** | Built-in columnar engine for analytics, often 10–100× faster. |

## Minimum example

```sql
-- Create a table with a clustered PK + a covering index.
CREATE TABLE dbo.Orders (
  OrderId      BIGINT IDENTITY(1,1) PRIMARY KEY,   -- clustered by default
  CustomerId   INT NOT NULL,
  CreatedAt    DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
  Amount       DECIMAL(10,2) NOT NULL,
  Status       NVARCHAR(20) NOT NULL
);

CREATE NONCLUSTERED INDEX IX_Orders_Customer
  ON dbo.Orders (CustomerId)
  INCLUDE (CreatedAt, Amount, Status);   -- covering index

-- A small stored procedure with TRY/CATCH + transaction.
CREATE OR ALTER PROCEDURE dbo.PlaceOrder
  @CustomerId INT,
  @Amount DECIMAL(10,2)
AS
BEGIN
  SET NOCOUNT ON;
  BEGIN TRY
    BEGIN TRAN;
      INSERT INTO dbo.Orders (CustomerId, Amount, Status)
      VALUES (@CustomerId, @Amount, N'pending');

      DECLARE @id BIGINT = SCOPE_IDENTITY();
      -- ... more DML here ...

    COMMIT;
    SELECT @id AS NewOrderId;
  END TRY
  BEGIN CATCH
    IF XACT_STATE() <> 0 ROLLBACK;
    THROW;       -- re-raise to caller, preserves stack
  END CATCH;
END
```

## Common pitfalls

- **`VARCHAR` for user names** → no Unicode = breaks on accents/CJK/emoji. Use `NVARCHAR`.
- **Default tempdb config on a busy server** → contention on allocation pages. Configure multiple equally-sized data files.
- **Long-running transactions** → blocks others, blows version store under RCSI. Keep transactions short.
- **Scalar UDFs in WHERE/SELECT** → historically killed parallelism + per-row execution. Use **inline TVFs** or schema-bound `WITH SCHEMABINDING` UDFs (2019+ inlining helps).
- **Index on every column** → write penalty, fragmentation. Audit with `sys.dm_db_index_usage_stats`.
- **Sniffing problem** — a parameterised query gets a plan optimal for the first run's params, terrible for the next. Mitigations: `OPTION (RECOMPILE)`, `OPTIMIZE FOR UNKNOWN`, plan guides.

## What to learn next

- **Query Store** (built-in plan history) + **Execution Plans** in SSMS
- **`sys.dm_*` DMVs** for live diagnostics (`dm_exec_query_stats`, `dm_db_index_usage_stats`)
- **AlwaysOn Availability Groups** for HA/DR
- **In-Memory OLTP** (Hekaton) for ultra-low-latency tables
- **Column-store indexes** for analytics
- **Azure SQL** managed offerings (Single DB, Managed Instance, SQL Edge)

> **Personal note:** _<TODO: where you've used SQL Server and your favourite SSMS trick.>_

## Sources

- [SQL Server Documentation — Microsoft Learn](https://learn.microsoft.com/en-us/sql/sql-server/)
- [T-SQL Language Reference](https://learn.microsoft.com/en-us/sql/t-sql/)
- [SQL Server Performance Tuning](https://learn.microsoft.com/en-us/sql/relational-databases/performance/monitor-and-tune-for-performance)
- [SQL Server on Wikipedia](https://en.wikipedia.org/wiki/Microsoft_SQL_Server)

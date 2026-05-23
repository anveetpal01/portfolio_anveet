# MySQL — cheatsheet

## When to reach for it

- **OLTP web apps** — the M in LAMP/LEMP; WordPress, MediaWiki, Magento, Drupal all default to MySQL.
- **General-purpose RDBMS** when you need transactions, foreign keys and a battle-tested storage engine.
- **Compatibility with the broader ecosystem** — every ORM, every cloud provider supports it natively.

## Mental model

MySQL is a relational database with a **pluggable storage-engine** architecture — the engine you almost certainly want is **InnoDB** (default since 5.5). InnoDB is ACID, uses **MVCC** for snapshot reads, has row-level locking, supports foreign keys, and stores rows physically ordered by the **primary key** (clustered index). Secondary indexes store the PK as their pointer, so designing the PK well matters more in MySQL than in many other DBs.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **InnoDB** | Default engine — ACID + FKs + MVCC + row locking. Use this. |
| **MyISAM** | Legacy engine — no transactions, table-level locking. Avoid for new work. |
| **Clustered index = PK** | Data physically ordered by PK; secondaries hold the PK value. |
| **`utf8` vs `utf8mb4`** | `utf8` is 3-byte (no emoji). Always `utf8mb4`. |
| **MVCC** | Reads see a snapshot; writers don't block readers. |
| **Default isolation** | REPEATABLE READ (different from most other DBs). |
| **Gap locks** | InnoDB locks ranges in REPEATABLE READ — prevents phantoms. |
| **Buffer pool** | RAM cache of data + index pages; size it to ~70–80% of dedicated RAM. |
| **Binlog** | Logical change log; basis of replication + point-in-time recovery. |
| **Replication** | Source → replica(s); statement/row/mixed; read scaling + HA. |
| **EXPLAIN** | Shows the planner's chosen access path — first debugging tool. |
| **JSON type** | Native JSON column since 5.7; can be indexed via generated columns. |

## Minimum example

```sql
-- Schema with sensible defaults for a new table in 2025.
CREATE TABLE users (
  id           BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  email        VARCHAR(255) NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  created_at   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  data         JSON,
  UNIQUE KEY uq_email (email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;

-- Covering index for a hot lookup pattern.
CREATE INDEX ix_users_email_name
  ON users (email, display_name);

-- Use EXPLAIN to confirm the index is actually used.
EXPLAIN
SELECT email, display_name
FROM   users
WHERE  email = 'a@b.c';
-- Want: type=ref, key=ix_users_email_name, Extra="Using index" (covering).
```

## Common pitfalls

- **`utf8` instead of `utf8mb4`** → silent truncation on emoji / 4-byte chars.
- **Random UUIDv4 as PK** → kills InnoDB insert performance (page splits). Use auto-increment, UUIDv7, ULID, or snowflake.
- **`SELECT * FROM huge_table` without a WHERE** → full table scan + huge result. Use `EXPLAIN` first.
- **Missing index on a foreign-key column** → cascading deletes turn into full scans.
- **Forgetting `LIMIT` on dev queries** → accidentally drag down prod.
- **Not setting a sane `innodb_buffer_pool_size`** → leaving the 128 MB default on a 32 GB DB server.
- **Long transactions** → InnoDB's version store grows, undo log balloons, performance tanks.

## What to learn next

- **`EXPLAIN ANALYZE`** for actual execution stats
- **Replication topologies** (async, semi-sync, group replication / InnoDB Cluster)
- **Performance schema** + `sys` schema for live monitoring
- **JSON functions** + generated columns for hybrid relational/JSON workloads
- **MariaDB** as an alternative — and its differences (column store, system-versioned tables)
- **PlanetScale / Vitess** for sharded MySQL at scale

> **Personal note:** _<TODO: where you've used MySQL (e.g. Rewards API), and your most painful production lesson.>_

## Sources

- [MySQL Reference Manual](https://dev.mysql.com/doc/)
- [InnoDB Storage Engine Overview](https://dev.mysql.com/doc/refman/8.4/en/innodb-storage-engine.html)
- [MySQL on Wikipedia](https://en.wikipedia.org/wiki/MySQL)
- [DB-Engines Ranking](https://db-engines.com/en/ranking)

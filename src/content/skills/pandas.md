# Pandas — cheatsheet

## When to reach for it

- **Tabular data analysis** in Python — cleaning, reshaping, summarising.
- **ETL between sources** — CSV/Parquet/SQL/JSON/Excel/REST → process → DataFrame → output.
- **Glue between SQL warehouses and ML pipelines** (read query → DataFrame → scikit-learn / XGBoost).

## Mental model

A `DataFrame` is a **dict of column Series sharing an index**. Each Series is a labelled NumPy array, so vectorised math is C-fast. Most operations return *new* DataFrames (immutable-ish); reassign or use `inplace=True` (sparingly). The index aligns rows across operations — `df1 + df2` matches by index labels, not row position.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **Series** | 1-D labelled array — basically a single column. |
| **DataFrame** | 2-D labelled table — dict of aligned Series. |
| **Index** | Row labels; ops align on it. `set_index` / `reset_index`. |
| **`.loc[]` / `.iloc[]`** | Label-based vs positional selection. |
| **`groupby`** | Split-apply-combine; `agg`, `transform`, `apply`. |
| **`merge` / `join`** | SQL-style joins (`how='inner'|'left'|'outer'|'right'`). |
| **`concat`** | Stack along an axis (no key matching). |
| **`pivot` / `melt`** | Wide ↔ long reshape. |
| **`dt` / `str` accessors** | Vectorised datetime / string ops on a Series. |
| **`category` dtype** | Low-memory enum for low-cardinality strings. |
| **PyArrow backend (2.0+)** | Faster strings, smaller memory, future default. |
| **`SettingWithCopyWarning`** | Sign you assigned to a possibly-copy slice. Use `.loc`. |

## Minimum example

```python
import pandas as pd

df = pd.read_csv("orders.csv", parse_dates=["created_at"])
df = df.dropna(subset=["customer_id"])

# Per-customer summary in one chain.
summary = (
    df.assign(month=df["created_at"].dt.to_period("M"))
      .groupby(["customer_id", "month"], as_index=False)
      .agg(
          orders=("order_id", "count"),
          revenue=("amount", "sum"),
          avg_basket=("amount", "mean"),
      )
      .sort_values(["customer_id", "month"])
)

# Join with a small dim table.
customers = pd.read_parquet("customers.parquet")
summary = summary.merge(customers[["customer_id", "country"]],
                        on="customer_id", how="left")

# Rolling 3-month revenue per customer.
summary["rev_3mo"] = (
    summary.groupby("customer_id")["revenue"]
           .transform(lambda s: s.rolling(3, min_periods=1).sum())
)

summary.to_parquet("customer_monthly.parquet", index=False)
```

## Common pitfalls

- **Chained assignment** (`df[df.x > 5]['y'] = 0`) → silent failure or SettingWithCopyWarning. Use `df.loc[df.x > 5, 'y'] = 0`.
- **Looping with `iterrows`** → slow (Python overhead per row). Use vectorised ops, `apply`, or move to NumPy.
- **Reading CSV without `dtype` / `usecols`** → wastes memory; Pandas guesses every column. Specify what you need.
- **`==` on float columns** → floating-point equality is dangerous; use `np.isclose(a, b)`.
- **`df.sort_values()` then mutating in-place** → forgetting `inplace=True` (or assigning) leaves the original untouched.
- **Merging on columns of different dtypes** (`int` ↔ `string`) → returns empty or wrong result; cast explicitly first.

## What to learn next

- **Vectorisation patterns** — `np.where`, `np.select`, `.assign`, `.pipe`
- **Time series** — `resample`, `rolling`, `shift`, timezone-aware datetimes
- **PyArrow backend** (`dtype_backend='pyarrow'`) for speed + memory
- **`pd.read_sql` + SQLAlchemy** for warehouse-driven pipelines
- **Polars / DuckDB** when Pandas hits performance walls
- **`.pipe()` + method chaining** for readable transformation pipelines

> **Personal note:** _<TODO: which Pandas patterns you use most and where you've hit memory limits.>_

## Sources

- [Pandas User Guide](https://pandas.pydata.org/docs/user_guide/)
- [Pandas API Reference](https://pandas.pydata.org/docs/reference/)
- [Pandas on Wikipedia](https://en.wikipedia.org/wiki/Pandas_(software))
- [Wes McKinney — "Python for Data Analysis" (free online)](https://wesmckinney.com/book/)

# Power BI — cheatsheet

## When to reach for it

- **Interactive dashboards** for business stakeholders — drag-and-drop, no code required for 80% of charts.
- **Self-service BI at scale** — model once, distribute via the Power BI Service to dozens/hundreds of users.
- **Multi-source reporting** — Power Query connects to SQL, files, REST APIs, SaaS apps, and unifies them in one model.

## Mental model

Three layers stacked vertically:

1. **Power Query (M)** — connect + transform (rename, filter, pivot, merge) → clean tables.
2. **Data model** — relationships between tables (star schema is king). Stored in the in-memory columnar **VertiPaq** engine.
3. **DAX + Visuals** — calculated columns/measures + drag-and-drop charts that react to slicers and filters.

The single hardest concept is **context** — every measure runs in a *filter context* (what's selected in slicers + visuals) and sometimes a *row context* (one row at a time in calc columns / iterators). `CALCULATE` is how you bend the filter context.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **Power Query / M** | Visual + functional ETL. Steps recorded; can be repeated/refreshed. |
| **Star schema** | One fact table, many dimension tables — Power BI's preferred shape. |
| **VertiPaq** | The in-memory columnar engine — aggressive compression, fast aggregations. |
| **Filter context** | The active filters when a measure evaluates (slicers, visuals, page filters). |
| **Row context** | Calc columns + iterators (`SUMX`, `FILTER`) evaluate per-row. |
| **`CALCULATE`** | The only function that modifies filter context. Foundation of advanced DAX. |
| **Calculated column** | Computed at refresh, stored, row context. Costs memory. |
| **Measure** | Computed at query time, filter context. Cheaper, dynamic. |
| **`RELATED` / `RELATEDTABLE`** | Cross-table value pull along a relationship. |
| **Time intelligence** | `SAMEPERIODLASTYEAR`, `DATEADD`, `TOTALYTD` — need a marked date table. |
| **RLS** | Row-Level Security — DAX filters per role to restrict visible rows. |
| **Import vs DirectQuery** | Copy & cache vs live query per visual. Composite mixes per-table. |

## Minimum example

```dax
-- Two measures: total sales + same-period-last-year + YoY %.
Total Sales = SUMX( Sales, Sales[Quantity] * Sales[UnitPrice] )

Total Sales LY =
  CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR( 'Date'[Date] )
  )

Sales YoY % =
  DIVIDE(
    [Total Sales] - [Total Sales LY],
    [Total Sales LY]
  )
```

## Common pitfalls

- **Skipping a marked date table** → time-intelligence functions silently return wrong numbers.
- **Calc columns where a measure would do** → bloats memory, slows refresh, and gives wrong totals (calc columns evaluate per row, not per visual).
- **Auto Date/Time enabled** → Power BI silently builds a hidden date table per date column — model balloons. Disable in Options.
- **Snowflake schemas** → kills VertiPaq performance and forces complex DAX. Flatten dimensions into a star.
- **Visual interactions surprise** → in Format → Edit interactions, you can disable cross-filtering between specific visuals.
- **No incremental refresh on huge fact tables** → 30-minute refresh windows that should be 30 seconds.

## What to learn next

- **`CALCULATE` deep dive** + `FILTER`, `ALL`, `ALLEXCEPT`, `REMOVEFILTERS`
- **DAX Studio** for measure performance + tracing query plans
- **Composite models** + aggregations for huge fact tables
- **RLS** (static + dynamic via a user-mapping table)
- **Power BI Service**: workspaces, apps, refresh schedules, dataflows, deployment pipelines
- **Tabular Editor 2/3** for advanced model authoring (calc groups, perspectives)

> **Personal note:** _<TODO: which datasets you've shipped dashboards on and your most-used DAX patterns.>_

## Sources

- [Microsoft Learn — Power BI](https://learn.microsoft.com/en-us/power-bi/)
- [DAX Function Reference](https://learn.microsoft.com/en-us/dax/dax-function-reference)
- [Power BI on Wikipedia](https://en.wikipedia.org/wiki/Microsoft_Power_BI)
- [SQLBI](https://www.sqlbi.com/) — the canonical DAX learning site

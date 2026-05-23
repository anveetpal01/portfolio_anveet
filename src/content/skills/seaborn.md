# Seaborn — cheatsheet

## When to reach for it

- **Statistical EDA charts** in 1–2 lines: distributions, joint plots, categorical breakdowns, correlations.
- **DataFrame-aware plotting** — map columns directly to aesthetics (`x=`, `y=`, `hue=`, `col=`).
- **Publication-quality defaults** — colourblind-safe palettes, sensible themes out of the box.

## Mental model

Seaborn is **Matplotlib with opinions**. Every plot is technically a Matplotlib figure (so all customisation tricks still work), but Seaborn gives you a higher-level API that expects **tidy / long-format** data (one row per observation, categories as values). You map columns to visual aesthetics; Seaborn handles aggregation, colour scales, and faceting.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **Axes-level vs figure-level** | Axes-level draws into one Axes; figure-level builds the whole figure (with facets). |
| **`relplot` / `displot` / `catplot`** | Figure-level family for relational / distribution / categorical plots. |
| **`hue` / `col` / `row` / `size` / `style`** | Map a column to colour / column-facet / row-facet / dot-size / marker. |
| **`pairplot`** | Every numeric column × every other — instant EDA. |
| **`heatmap`** | 2-D matrix (correlations, confusion matrix). |
| **`set_theme()`** | Global style + context + palette. |
| **Tidy data** | One row per obs, category as value — Seaborn's assumption. |
| **Palettes** | `viridis`, `mako`, `rocket` (sequential), `coolwarm` (diverging), `tab10` (qualitative). |
| **`seaborn.objects`** (0.12+) | Grammar-of-graphics API — `Plot(df, x, y).add(Dots()).add(Line())`. |

## Minimum example

```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid", context="notebook", palette="mako")

tips = sns.load_dataset("tips")

# A faceted scatter with regression lines per category.
g = sns.lmplot(
    data=tips,
    x="total_bill", y="tip",
    hue="smoker", col="time",
    height=4, aspect=1.2,
    scatter_kws={"alpha": 0.6, "s": 30},
)
g.set_axis_labels("Total bill ($)", "Tip ($)")
g.fig.suptitle("Tip vs Bill, by smoking status and meal", y=1.03)
plt.tight_layout()
plt.show()

# Correlation heatmap.
corr = tips.select_dtypes("number").corr()
sns.heatmap(corr, annot=True, fmt=".2f",
            cmap="coolwarm", center=0,
            vmin=-1, vmax=1, square=True)
```

## Common pitfalls

- **Wide-format data** → Seaborn won't map it; reshape with `df.melt()` to long format first.
- **Forgetting `plt.show()` outside Jupyter** → script runs but nothing appears.
- **`pairplot` on 500k rows** → grinding; `df.sample(5000)` first.
- **Custom styling lost after `sns.set_theme()`** — order matters; set the theme first, then tweak.
- **Saving figures with the wrong DPI** — set `plt.savefig("out.png", dpi=200, bbox_inches="tight")`.
- **`legend=False` removed in figure-level functions** — argument differs between axes-level (`legend=False`) and figure-level (`legend='auto'|False`).

## What to learn next

- **`FacetGrid` / `PairGrid` / `JointGrid`** for manual multi-panel control
- **Diverging / qualitative / sequential palettes** and when each fits
- **`seaborn.objects`** declarative API (the future of Seaborn)
- **Combining with Matplotlib** to fine-tune (titles, annotations, custom legends)
- **Plotly / Altair / ggplot2 (R)** as alternatives for interactivity or different paradigms

> **Personal note:** _<TODO: what charts you reach for first when exploring a new dataset.>_

## Sources

- [Seaborn Documentation](https://seaborn.pydata.org/)
- [Seaborn — Choosing Color Palettes](https://seaborn.pydata.org/tutorial/color_palettes.html)
- [Seaborn on GitHub](https://github.com/mwaskom/seaborn)
- [Seaborn on Wikipedia](https://en.wikipedia.org/wiki/Seaborn_(software))

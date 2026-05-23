# XGBoost — cheatsheet

## When to reach for it

- **Tabular ML** (the kind of data that fits in a CSV) — classification, regression, ranking.
- **Strong baselines** on Kaggle / production scoring systems where deep learning is overkill.
- **Heterogeneous features** — numeric + categorical + missing — all handled with minimal preprocessing.

## Mental model

Train trees **sequentially**: each new tree predicts the *residuals* (errors) of the ensemble so far. XGBoost adds the second derivative of the loss (Hessian) to the split criterion, L1/L2 regularization on leaf weights, built-in handling of missing values (learnt split direction), histogram-based fast splits, and parallel tree-building. It's "gradient boosting, very well engineered".

## Key concepts

| Concept | One-line meaning |
|---|---|
| **GBDT** | Gradient-Boosted Decision Trees — sequential trees fitting residuals. |
| **Booster types** | `gbtree` (default), `gblinear`, `dart` (dropout-regularized trees). |
| **`learning_rate` + `n_estimators`** | Smaller `eta` + more rounds = smoother fit. |
| **`max_depth`** | Tree depth — bigger = more capacity = more overfit risk. |
| **`min_child_weight`** | Min sum of hessian per leaf — regularizer. |
| **`subsample` / `colsample_bytree`** | Stochastic row / column sampling per tree. |
| **`reg_alpha` / `reg_lambda`** | L1 / L2 regularization on leaf weights. |
| **`scale_pos_weight`** | `neg / pos` count — handles class imbalance for binary. |
| **`tree_method='hist'`** | Histogram-based splitter — fast, modern default. |
| **`device='cuda'`** | GPU training — typically 5–20× faster on big data. |
| **`early_stopping_rounds`** | Stop training when val metric stops improving for N rounds. |
| **SHAP** | Per-prediction feature attribution — the gold standard for interpretation. |

## Minimum example

```python
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
import pandas as pd

X = pd.read_parquet("features.parquet")
y = X.pop("target")

X_tr, X_va, y_tr, y_va = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

model = XGBClassifier(
    n_estimators=2000,
    learning_rate=0.05,
    max_depth=6,
    min_child_weight=5,
    subsample=0.8,
    colsample_bytree=0.8,
    reg_lambda=1.0,
    objective="binary:logistic",
    eval_metric="auc",
    early_stopping_rounds=50,
    tree_method="hist",
    n_jobs=-1,
    random_state=42,
)

model.fit(X_tr, y_tr, eval_set=[(X_va, y_va)], verbose=100)

print("val AUC:", roc_auc_score(y_va, model.predict_proba(X_va)[:, 1]))
model.save_model("model.json")     # portable; don't pickle for production
```

## Common pitfalls

- **Forgetting `early_stopping_rounds`** → trains for the full `n_estimators` even after overfitting starts.
- **Tuning `n_estimators` by hand** → let early stopping pick it; tune `learning_rate` + `max_depth` instead.
- **Using accuracy on imbalanced data** → meaningless. Use PR-AUC / F1; set `scale_pos_weight`.
- **Leaking the val set into preprocessing** → fit scalers/encoders inside a Pipeline / on train fold only.
- **Pickling for production** → `model.save_model('model.json')` is portable across versions; pickle isn't.
- **Trusting built-in feature importance blindly** → it can be misleading on correlated features. Prefer SHAP.

## What to learn next

- **SHAP** for interpretation (`shap.TreeExplainer`)
- **Hyperparameter tuning** with Optuna / Hyperopt
- **LightGBM** and **CatBoost** — sibling libraries with different strengths (faster categorical handling, leaf-wise vs level-wise growth)
- **Stacking / blending** XGBoost with LightGBM + a linear model for Kaggle-style ensembles
- **Monotonic constraints + interaction constraints** for regulated domains (finance, healthcare)
- **Production serving**: Triton XGBoost backend, ONNX, or a simple Python service

> **Personal note:** _<TODO: where you've used XGBoost (e.g. Disease/Asthma Prediction) and what tuning gave you the biggest lift.>_

## Sources

- [XGBoost Documentation](https://xgboost.readthedocs.io/)
- [XGBoost: A Scalable Tree Boosting System (Chen & Guestrin, 2016)](https://arxiv.org/abs/1603.02754)
- [XGBoost on GitHub](https://github.com/dmlc/xgboost)
- [XGBoost on Wikipedia](https://en.wikipedia.org/wiki/XGBoost)

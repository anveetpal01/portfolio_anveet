# Machine Learning — cheatsheet

## When to reach for it

- **Predictions from tabular data** — regression, classification, ranking (XGBoost / LightGBM / sklearn).
- **Pattern discovery** in unlabelled data — clustering, anomaly detection.
- **Decisions under uncertainty** when rules are too many to hand-code — fraud, churn, recommendations.

## Mental model

ML is **function approximation under constraints**: choose a hypothesis family (linear model, tree, neural net), define a loss that scores "how wrong", and an optimizer that walks the parameter space to minimize that loss on training data — while keeping the loss *small on data it hasn't seen* (generalization). Almost every concept (regularization, cross-validation, early stopping, drift) is a tactic to manage that train-vs-test gap.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **Bias / variance** | Wrong-assumption error vs sensitivity-to-data error — the core overfit/underfit tradeoff. |
| **Train / val / test split** | Train fits weights, val tunes hyperparams + early-stops, test reports final unbiased metric. |
| **k-fold CV** | Rotate the validation fold k times — more robust performance estimate, uses all data. |
| **Precision / Recall / F1** | TP/(TP+FP) · TP/(TP+FN) · harmonic mean — pick by what kind of error costs more. |
| **ROC-AUC vs PR-AUC** | ROC works generally; PR-AUC is the right one for imbalanced (rare-positive) problems. |
| **L1 vs L2 regularization** | L1 drives weights to zero (feature selection); L2 shrinks them smoothly. |
| **Random Forest vs GBDT (XGBoost)** | Bagging (parallel trees, average) vs boosting (sequential, fix residuals). |
| **Class imbalance** | Resample (SMOTE / undersample), class weights, threshold tuning, PR-AUC metric. |
| **Data leakage** | Future / out-of-fold info sneaks into training — fit preprocessing **inside** CV folds. |
| **Drift** | Input or input→target distribution changes after deploy — monitor PSI/KL + live metrics. |

## Minimum example

```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import StratifiedKFold, cross_validate
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

X, y = load_breast_cancer(return_X_y=True)

# Preprocess INSIDE the pipeline so fit only sees training folds (no leakage).
pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000, class_weight="balanced")),
])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
scores = cross_validate(pipe, X, y, cv=cv, scoring=["roc_auc", "f1"])
print({k: float(v.mean()) for k, v in scores.items() if k.startswith("test_")})
```

## Common pitfalls

- **Fitting the scaler / encoder on the whole dataset** before splitting — classic leakage. Use a `Pipeline`.
- **Reporting test accuracy on imbalanced data** — 99% by predicting "no" is meaningless. Use PR-AUC / per-class F1.
- **Tuning hyperparams on the test set** — leaks the test signal into model selection. Use a separate val fold or nested CV.
- **Random split for time-series** — use time-based split or `TimeSeriesSplit` so the model only ever predicts the future.
- **"Better model = more accuracy"** — pick metric and threshold from business cost of FP vs FN, not raw accuracy.
- **No baseline** — always benchmark against a trivial model (majority class, last value, linear regression) before trusting a complex one.

## What to learn next

- **scikit-learn pipelines & `ColumnTransformer`** · **XGBoost / LightGBM** tuning (early stopping, monotonic constraints) · **SHAP** for explainability · **MLflow** / **Weights & Biases** for tracking · **MLOps**: drift monitoring, retraining triggers, A/B rollout.

> **Personal note:** _<TODO: what kind of ML you've trained (e.g. XGBoost asthma model) and one thing you learnt the hard way.>_

## Sources

- [scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)
- [DataCamp — Top ML Interview Questions](https://www.datacamp.com/blog/top-machine-learning-interview-questions)
- [Exponent — Top ML Interview Questions](https://www.tryexponent.com/blog/top-machine-learning-interview-questions)
- [Analytics Vidhya — Top 40 ML Interview Questions](https://www.analyticsvidhya.com/blog/2024/01/ml-interview-questions/)

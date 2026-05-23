# Streamlit — cheatsheet

## When to reach for it

- **ML model demos** — wrap a `model.predict()` behind a slider/text input in 10 lines.
- **Internal data tools / dashboards** — when the audience is technical and time-to-ship beats design polish.
- **Quick prototypes** for clients/stakeholders before committing to a real frontend.

## Mental model

The **entire script reruns top-to-bottom on every interaction**. Streamlit tracks widget values and diffs the rendered output. Persistent things live in `st.session_state`; expensive things live behind `@st.cache_data` (return values) or `@st.cache_resource` (singletons like DB connections, ML models). No HTML / CSS / JS — you write Python and get a web app.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **Rerun-on-interaction** | Every widget change reruns the script from the top. |
| **`st.session_state`** | Dict-like object that persists across reruns per user session. |
| **`@st.cache_data`** | Cache return values (DataFrames, JSON) — copied per session. |
| **`@st.cache_resource`** | Cache singletons (DB, models) — shared across sessions, not copied. |
| **`st.form`** | Group widgets that only trigger a rerun on submit. |
| **`st.columns` / `st.tabs` / `st.expander`** | Layout primitives. |
| **`st.sidebar`** | Left-side panel for nav and global filters. |
| **`pages/` directory** | Auto multi-page app — files become sidebar pages. |
| **`st.fragment`** (1.32+) | Rerun only part of the app for snappy interactions. |
| **`st.rerun()`** | Force a rerun (e.g. after mutating session state in a callback). |

## Minimum example

```python
import streamlit as st
import pandas as pd

st.set_page_config(page_title="Demo", layout="wide")

@st.cache_resource
def load_model():
    # Expensive — built once, shared across all sessions.
    from sklearn.linear_model import LogisticRegression
    import joblib
    return joblib.load("model.pkl")

@st.cache_data
def load_data(path: str) -> pd.DataFrame:
    return pd.read_csv(path)

st.title("Asthma severity demo")
df = load_data("samples.csv")
model = load_model()

with st.sidebar:
    threshold = st.slider("Decision threshold", 0.0, 1.0, 0.5, 0.05)
    show_table = st.checkbox("Show raw rows", value=False)

col1, col2 = st.columns([2, 3])
with col1:
    age = st.number_input("Age", 0, 120, 35)
    smoker = st.selectbox("Smoker", ["No", "Yes"])
    if st.button("Predict"):
        prob = float(model.predict_proba([[age, int(smoker == "Yes")]])[0, 1])
        st.metric("Severity probability", f"{prob:.2f}",
                  delta="High" if prob > threshold else "Low")

with col2:
    if show_table:
        st.dataframe(df.head(50), use_container_width=True)
    st.line_chart(df.groupby("age").severity.mean())
```

## Common pitfalls

- **Forgetting that the script reruns** — code at the module level runs every interaction. Expensive ops without `@st.cache_*` will hammer your CPU.
- **`@st.cache_data` on objects with non-hashable inputs** — use `_arg` prefix to skip hashing for that argument, or restructure.
- **Mutating session state inside the script body** — usually means you needed `st.session_state.setdefault(...)` once at the top.
- **Auth & RBAC** — Streamlit's built-in story is thin; put it behind a reverse proxy with SSO if you need real access control.
- **Long-running compute on the main rerun** — gate it behind a button (`if st.button("Run")`) so slider drags don't kick it off.

## What to learn next

- **`st.fragment`** for partial reruns · **multi-page apps** via `pages/` or `st.navigation` · **deployment** on Streamlit Community Cloud / Hugging Face Spaces / Render · **theming** via `.streamlit/config.toml` · **st.connection** for DB integrations.

> **Personal note:** _<TODO: which Streamlit apps you've shipped (e.g. Multi-domain Recommender, ML demos) and your favourite tricks.>_

## Sources

- [Streamlit Documentation](https://docs.streamlit.io/)
- [Streamlit — Caching](https://docs.streamlit.io/develop/concepts/architecture/caching)
- [Streamlit on Wikipedia](https://en.wikipedia.org/wiki/Streamlit)
- [Snowflake to Acquire Streamlit (announcement)](https://blog.streamlit.io/snowflake-to-acquire-streamlit/)

# Python — cheatsheet

## When to reach for it

- **Backend APIs / automation / scripting** — vast ecosystem (FastAPI, Flask, Django, Celery, scripts).
- **Data, ML & scientific computing** — Pandas, NumPy, scikit-learn, PyTorch, XGBoost.
- **Glue code** — calling C/C++/CUDA libraries (OpenCV, Ultralytics, TensorRT) from a clean high-level API.

## Mental model

Python is an *interpreter that walks a tree of objects*. Everything (numbers, functions, classes) is an object with a type; names are just labels bound to objects. Most of Python's perceived "magic" — duck typing, attribute access, decorators, context managers — is a small set of well-defined protocols (`__init__`, `__iter__`, `__enter__/__exit__`, `__call__`) the interpreter looks up on those objects.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **GIL** | One thread executes Python bytecode at a time (CPython); use processes or async for parallelism. |
| **Reference counting + GC** | Memory freed when refcount→0; a separate cyclic GC handles reference cycles. |
| **`*args` / `**kwargs`** | Collect extra positional / keyword arguments into a tuple / dict. |
| **Decorator** | A callable that wraps a function: `@deco` ≡ `f = deco(f)`. Wrap with `functools.wraps`. |
| **Generator** | Function with `yield` — produces values lazily, keeps state automatically. |
| **Context manager** | Object with `__enter__/__exit__` (or `@contextmanager`) used by `with` for setup/teardown. |
| **List vs tuple** | List = mutable, unhashable. Tuple = immutable, hashable. |
| **Type hints** | Static metadata — not enforced at runtime unless a tool (mypy, Pydantic) does. |
| **MRO (C3)** | Deterministic method-lookup order across multiple inheritance — `Cls.__mro__`. |
| **`__slots__`** | Replace per-instance `__dict__` with fixed slots — saves memory for many small objects. |

## Minimum example

```python
from functools import wraps
from contextlib import contextmanager
import time

def timed(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        t = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:
            print(f"{fn.__name__} took {time.perf_counter()-t:.3f}s")
    return wrapper

@contextmanager
def open_db(path: str):
    print("connect", path)
    try:
        yield {"conn": path}
    finally:
        print("close", path)

@timed
def main():
    with open_db("postgres://...") as db:
        return [n*n for n in range(5)]

print(main())
```

## Common pitfalls

- **Mutable default arguments** — `def f(x, l=[])` shares the list across calls. Use `l=None` and init inside.
- **Late-binding closures in loops** — `[lambda: i for i in range(3)]` all return 2. Capture with `lambda i=i:`.
- **Mixing `is` and `==`** — `is` checks identity, not equality. Don't use `is` to compare strings or numbers.
- **Blocking calls inside `async def`** — freezes the event loop. Use async libraries (`httpx`, `asyncpg`) or `run_in_executor`.
- **`except:`** without a class — swallows `KeyboardInterrupt` and `SystemExit`. Use `except Exception:`.

## What to learn next

- **FastAPI** (async APIs) · **Pydantic** (type-driven validation) · **asyncio** · **pytest** (testing) · **packaging with `pyproject.toml`**.

> **Personal note:** _<TODO: a sentence or two about how you actually use Python day-to-day.>_

## Sources

- [Python Language Reference](https://docs.python.org/3/reference/)
- [DataCamp — Top Python Interview Questions](https://www.datacamp.com/blog/top-python-interview-questions-and-answers)
- [InterviewBit — Python Interview Questions](https://www.interviewbit.com/python-interview-questions/)
- [GeeksforGeeks — Python Interview Questions](https://www.geeksforgeeks.org/python/python-interview-questions/)

# FastAPI — cheatsheet

## When to reach for it

- **Modern Python web APIs** — REST + JSON, with type-safe request validation out of the box.
- **High-concurrency I/O** — async routes that talk to DBs / external APIs without blocking the loop.
- **Auto-documented services** — `/docs` (Swagger UI) and `/redoc` come free from your type hints.

## Mental model

FastAPI is **Starlette (ASGI) for the HTTP plumbing + Pydantic for the data layer**. You declare *what* the route expects (types) and *what it depends on* (`Depends(...)`); FastAPI handles parsing, validation, serialization, OpenAPI schema, and dependency lifecycle. Think of it as *"types are the contract, the framework enforces the contract"*.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **Path / query parameters** | Path = in the URL template (`/items/{id}`); query = everything else; both validated by type hint. |
| **Pydantic model** | Schema class — defines request bodies, response models and auto-generates JSON Schema/docs. |
| **`response_model`** | Filter/coerce the returned data through a schema before serialization (hides extra fields). |
| **`Depends(...)`** | Dependency injection — share auth/DB session/settings across routes; resolved per request. |
| **`async def` vs `def`** | `async def` runs in the event loop (use with `await`); plain `def` runs in a threadpool. |
| **`lifespan`** | Async context manager passed to `FastAPI(lifespan=...)` for startup/shutdown (replaces `@on_event`). |
| **`TestClient`** | `from fastapi.testclient import TestClient` — sync requests-style client for tests. |
| **OAuth2 / JWT** | `OAuth2PasswordBearer` extracts the token; a `get_current_user` dependency verifies it. |
| **422 Unprocessable Entity** | FastAPI's default response when a request fails Pydantic validation. |
| **ASGI server** | Uvicorn (or Gunicorn + UvicornWorker) — what actually runs the app in production. |

## Minimum example

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel

class ItemIn(BaseModel):
    name: str
    price: float

class ItemOut(ItemIn):
    id: int

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("startup")
    yield
    print("shutdown")

app = FastAPI(lifespan=lifespan)
DB: dict[int, ItemOut] = {}

def get_db() -> dict[int, ItemOut]:
    return DB

@app.post("/items", response_model=ItemOut, status_code=201)
async def create(item: ItemIn, db: dict = Depends(get_db)):
    new = ItemOut(id=len(db) + 1, **item.model_dump())
    db[new.id] = new
    return new

@app.get("/items/{item_id}", response_model=ItemOut)
async def read(item_id: int, db: dict = Depends(get_db)):
    if item_id not in db:
        raise HTTPException(404, "Not found")
    return db[item_id]
```

## Common pitfalls

- **Blocking calls inside `async def`** — kills concurrency. Use `httpx.AsyncClient`, `asyncpg`, etc. or switch the route to plain `def`.
- **Forgetting `response_model`** — internal fields (password hashes, IDs) leak in responses.
- **Using deprecated `@app.on_event("startup")`** — switch to `lifespan=` (FastAPI ≥ 0.93).
- **Sync ORM in async** — `sqlalchemy` sync inside `async def` blocks the loop. Use SQLAlchemy 2.0 async, `databases`, or move the route to `def`.
- **Running `app.run()` / Uvicorn single-worker in prod** — use Gunicorn with `UvicornWorker` and tune workers ≈ cores.

## What to learn next

- **Pydantic v2** (validators, model config) · **SQLAlchemy 2.0 async** / **asyncpg** · **pytest + TestClient / `httpx.AsyncClient`** · **Background tasks & Celery** · **OpenTelemetry / structured logs**.

> **Personal note:** _<TODO: a sentence on the FastAPI services you've shipped or what you find most powerful.>_

## Sources

- [FastAPI Official Docs](https://fastapi.tiangolo.com/)
- [InterviewBit — FastAPI Interview Questions](https://www.interviewbit.com/fastapi-interview-questions-answers/)
- [Index.dev — FastAPI Developer Q&A](https://www.index.dev/interview-questions/fastapi-developer)
- [ProjectPractical — FastAPI Interview Questions](https://www.projectpractical.com/fastapi-interview-questions-and-answers/)

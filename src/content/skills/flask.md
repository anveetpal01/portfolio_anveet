# Flask — cheatsheet

## When to reach for it

- **Lightweight REST APIs / microservices** when you want full control over architecture.
- **Quick prototypes & internal tools** — a working app in 10 lines.
- **ML model serving** (Flask + gunicorn behind nginx) when async isn't required.

## Mental model

Flask is *Werkzeug (WSGI) + Jinja2 + a thin router*, with everything else delegated to **extensions**. You bring your own ORM, auth, validation. The unit of work is a *request context* (with `request`, `session`) pushed for each incoming request and torn down at the end.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **WSGI** | Sync Python web standard; Flask apps are WSGI apps run by Gunicorn/uWSGI. |
| **Route** | `@app.route("/path", methods=["GET","POST"])` binds a URL pattern to a view. |
| **Jinja2** | Templating: `{{ var }}` for output, `{% if %}` for logic; auto-escapes HTML. |
| **`request` / `session` / `g`** | Per-request objects (form data, signed-cookie session, per-request scratchpad). |
| **App context vs request context** | App context (`current_app`) wraps each request and is also used for CLI/background. |
| **Blueprint** | A module bundle of routes/templates registered onto the app — how you split big apps. |
| **App factory** | `def create_app(): app = Flask(...); return app` — required for clean testing & extensions. |
| **`jsonify` / dict return** | `jsonify({...})` returns JSON; Flask 1.1+ auto-jsonifies a dict returned from a view. |
| **`url_for(name)`** | Reverse-route lookup — never hard-code URLs in templates. |
| **`flask --app app run --debug`** | Dev server only — never use in production. |

## Minimum example

```python
from flask import Flask, request, jsonify, abort

def create_app():
    app = Flask(__name__)
    items: dict[int, dict] = {}

    @app.post("/items")
    def create():
        data = request.get_json(silent=True) or {}
        if "name" not in data:
            abort(400, "name required")
        new_id = max(items, default=0) + 1
        items[new_id] = {"id": new_id, **data}
        return jsonify(items[new_id]), 201

    @app.get("/items/<int:item_id>")
    def read(item_id: int):
        if item_id not in items:
            abort(404)
        return jsonify(items[item_id])

    return app
```

## Common pitfalls

- **Running `app.run()` in production** — Werkzeug's dev server is single-threaded and unsafe. Use Gunicorn / uWSGI.
- **Circular imports without an app factory** — initialize `db = SQLAlchemy()` at module level, then `db.init_app(app)` inside `create_app()`.
- **No CSRF protection by default** — for form-based apps add Flask-WTF; for cookie-session APIs set `SameSite` and prefer token auth.
- **Logging only to stderr** — production needs structured JSON logs + a real logging config.
- **Mutating `g` to share between requests** — `g` is reset per request; use Redis or app-level state instead.

## What to learn next

- **Flask-SQLAlchemy** + Alembic migrations · **Flask-Login** / **Flask-JWT-Extended** · **Gunicorn** workers (sync/gevent) · **Celery / RQ** for background jobs · **FastAPI** when you want async + types.

> **Personal note:** _<TODO: where you've used Flask (e.g. the Asthma Prediction API) and what you'd build differently next time.>_

## Sources

- [Flask Official Docs](https://flask.palletsprojects.com/)
- [GeeksforGeeks — Flask Interview Questions](https://www.geeksforgeeks.org/python/flask-interview-questions-and-answers/)
- [AskPython — Flask Interview Questions](https://www.askpython.com/python/flask-interview-questions)
- [Hirist — Flask Interview Questions](https://www.hirist.tech/blog/top-30-flask-interview-questions-and-answers/)

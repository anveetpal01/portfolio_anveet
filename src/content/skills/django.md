# Django — cheatsheet

## When to reach for it

- **Full CRUD apps with admin** — built-in admin site is unmatched for internal tools.
- **Content / news / community sites** — Django was extracted from a newspaper; templates + ORM + auth ship together.
- **Multi-tenant SaaS** — strong ORM + migrations + permissions + DRF for APIs cover most needs.

## Mental model

**Model–Template–View (MTV)**, where Django itself is effectively the controller. Define data models → run `makemigrations` + `migrate` → wire URLs to views (functions or class-based) → render templates. The framework's philosophy is "batteries included, opinionated" — auth, admin, sessions, CSRF, migrations, signals, ORM, forms all in one box. You bring your business logic; Django brings the rest.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **MTV** | Model (data) · Template (HTML) · View (request → response). |
| **ORM** | `User.objects.filter(...).select_related('group')` — queries as Python, lazy. |
| **QuerySet** | Lazy chain; hits DB on iteration, slicing, `count()`, etc. |
| **Admin** | Auto CRUD UI per registered model; the killer feature. |
| **Migrations** | Versioned schema changes in `<app>/migrations/`, applied with `migrate`. |
| **Middleware** | Per-request hooks chained around every view. Order matters. |
| **Signals** | Pub-sub for model events (`post_save`, `pre_delete`, etc.). |
| **Forms / ModelForms** | Validation + HTML rendering bound to a model. |
| **Class-based views** | `ListView` / `DetailView` / `CreateView` mixins for stock CRUD. |
| **`select_related` / `prefetch_related`** | Avoid N+1: forward FK in JOIN / reverse + M2M in a second query. |
| **Async views** | `async def` (3.1+) + async ORM (4.1+) on an ASGI server. |

## Minimum example

```python
# models.py
from django.db import models
from django.contrib.auth import get_user_model

class Topic(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self): return self.title

# views.py
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .models import Topic
from .forms import TopicForm

@login_required
def topics(request):
    qs = (Topic.objects.filter(user=request.user)
                       .select_related('user')          # avoid N+1
                       .order_by('-created'))
    return render(request, 'topics.html', {'topics': qs})

@login_required
def new_topic(request):
    if request.method == 'POST':
        form = TopicForm(request.POST)
        if form.is_valid():
            topic = form.save(commit=False)
            topic.user = request.user
            topic.save()
            return redirect('topics')
    else:
        form = TopicForm()
    return render(request, 'new_topic.html', {'form': form})
```

## Common pitfalls

- **N+1 queries** — looping over a queryset and accessing a FK on each row. Add `select_related('fk')` or `prefetch_related('reverse')`.
- **`Model.objects.get(...)` raising `DoesNotExist`** — use `.first()` or wrap in `try/except` (or `get_object_or_404` for views).
- **Forgetting `on_delete`** on FK — required since Django 2.0. `CASCADE` and `SET_NULL` are the common choices.
- **Storing secrets in `settings.py`** — load from environment; never commit a real `SECRET_KEY`.
- **Skipping migrations in git** — generated files are the source of schema truth; check them in.
- **Templates doing heavy logic** — keep templates dumb; compute in the view or model.

## What to learn next

- **Django REST Framework** (serializers, viewsets, auth) · **Celery + Redis** for background jobs · **django-debug-toolbar** for N+1 / slow query detection · **Channels** for WebSockets · **async views & async ORM** · **deployment**: gunicorn / uvicorn behind nginx, `collectstatic` to a CDN.

> **Personal note:** _<TODO: where you've used Django (e.g. Learning Logs) and your favourite battery.>_

## Sources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django on GitHub](https://github.com/django/django)
- [Django on Wikipedia](https://en.wikipedia.org/wiki/Django_(web_framework))
- [Django REST Framework](https://www.django-rest-framework.org/)

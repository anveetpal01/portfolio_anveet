# HTML/CSS — cheatsheet

## When to reach for it

- **Every web page on earth** — HTML is the structural skeleton, CSS the styling.
- **Email templates, PDFs (via print CSS), Electron apps, embedded WebViews** — all the same skill.
- **Design systems** — CSS variables + utility classes (Tailwind) scale tokens across an org.

## Mental model

**HTML = meaning, CSS = appearance, JS = behaviour.** HTML elements are semantic ("this is a heading", "this is a button"); CSS layers visual rules on top via the **cascade**: source order, specificity, and `!important` decide which rule wins. Layout in modern CSS is done with **Flexbox** (1D) and **Grid** (2D); positioning (`relative`/`absolute`/`fixed`/`sticky`) is a separate axis that pulls elements out of normal flow.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **Semantic tags** | `<header>` `<main>` `<article>` `<nav>` `<section>` `<footer>` — meaning for screen readers + SEO. |
| **Box model** | content → padding → border → margin (set `box-sizing: border-box` to make width predictable). |
| **Flexbox** | One-dimensional layout (row or column) — alignment, spacing, ordering. |
| **Grid** | Two-dimensional layout — rows AND columns at once. |
| **Position** | `relative` (in flow), `absolute` (nearest positioned ancestor), `fixed` (viewport), `sticky` (hybrid). |
| **Specificity** | (inline, IDs, classes/attrs/pseudo-classes, elements) — higher tuple wins. |
| **Cascade** | Origin → specificity → source order → `!important`. |
| **`em` vs `rem`** | `em` = parent's font-size (compounds); `rem` = root's font-size (predictable). |
| **Media queries** | `@media (min-width: 768px) { ... }` — mobile-first is simpler. |
| **CSS variables** | `--brand: #c8ff3d;` — runtime, cascading, inheritable; powers theming. |
| **`:has()`** | True parent selector (2023+) — `article:has(img) { ... }`. |
| **ARIA** | Don't use it if a native semantic element already does the job. |

## Minimum example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sample</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    :root { --gap: 1rem; --brand: #c8ff3d; }
    body {
      margin: 0;
      font: 16px/1.5 system-ui, sans-serif;
      color: #f4f4f5;
      background: #0a0a0a;
    }
    /* Mobile first: 1 col by default, 2 cols from 640px, 3 from 1024px */
    .cards {
      display: grid;
      gap: var(--gap);
      grid-template-columns: 1fr;
      padding: var(--gap);
    }
    @media (min-width: 640px) { .cards { grid-template-columns: 1fr 1fr; } }
    @media (min-width: 1024px) { .cards { grid-template-columns: repeat(3, 1fr); } }

    .card { padding: 1rem; border: 1px solid #232327; border-radius: 12px; }
    .card:has(img) { border-color: var(--brand); }   /* :has() — parent selector */
  </style>
</head>
<body>
  <main class="cards">
    <article class="card"><h2>One</h2><p>Text only</p></article>
    <article class="card"><img src="x.jpg" alt="" /><h2>Two</h2></article>
    <article class="card"><h2>Three</h2></article>
  </main>
</body>
</html>
```

## Common pitfalls

- **`<div>` soup** — using `<div>` where `<button>`, `<nav>`, `<article>` would be correct kills accessibility and SEO.
- **Forgetting `box-sizing: border-box`** — padding/border add to width, making layouts unpredictable.
- **`!important` everywhere** — turns the cascade into a brawl. Fix specificity at the source instead.
- **Images without `width`/`height`/`aspect-ratio`** — cause Cumulative Layout Shift (a Core Web Vital).
- **Hiding content with `display: none` when you wanted just visual hide** — also removes from a11y tree (sometimes correct, sometimes not).
- **Random `z-index` numbers** like `9999` — define a small stacking-context scale instead.

## What to learn next

- **CSS Grid** in depth · **CSS variables + theming / dark mode** · **Container queries** (2023+) · **Tailwind / utility-first CSS** for production-scale teams · **Accessibility** (semantic HTML, ARIA, focus management, color contrast).

> **Personal note:** _<TODO: how you use HTML/CSS day-to-day and your go-to layout patterns.>_

## Sources

- [MDN — HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN — CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks — Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Web.dev — Learn CSS](https://web.dev/learn/css)
- [W3C — WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

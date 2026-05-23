# React.js — cheatsheet

## When to reach for it

- **Component-based SPAs and interactive UIs** — by far the most-used frontend library in the industry.
- **Cross-platform** — same skills carry to React Native (mobile) and Electron / Tauri (desktop).
- **Server-side rendered apps** — Next.js (RSC + App Router) is the default 'React framework' for production.

## Mental model

UI is a **function of state**: `view = f(state)`. You describe what the UI should look like for the current state; React figures out the minimum DOM changes via the **virtual DOM diff**. Components are pure-ish functions that return JSX (compiled to `createElement` calls). State changes trigger re-renders; hooks add behaviour (state, effects, refs) to function components in a strict call-order.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **JSX** | HTML-like syntax compiled to `React.createElement(...)`. Not magic; transpiled. |
| **Component** | Function returning JSX. Receives `props`, may use hooks. |
| **`useState`** | Local state for a component; returns `[value, setter]`; setter is async + batched. |
| **`useEffect`** | Side-effects after render; dependency array controls re-run; cleanup return value. |
| **`useRef`** | Mutable `{ current }` that persists across renders without triggering them. |
| **`useMemo` / `useCallback`** | Memoize values / functions — use only when profiling demands it. |
| **`React.memo`** | Skip re-render when props are shallowly equal. |
| **Context** | Tree-wide state for low-churn values (theme, auth). |
| **Suspense** | Declarative loading boundary — works with `lazy()` and modern data fetching. |
| **Concurrent rendering** | React 18+ — interruptible renders, `useTransition` for non-urgent updates. |
| **RSC** | React Server Components (React 19+) — server-only components; zero client JS. |
| **Rules of Hooks** | Top level only, only in components/custom hooks. ESLint enforces. |

## Minimum example

```jsx
import { useState, useEffect, useRef } from "react";

function SearchBox({ onPick }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const ctrlRef = useRef(null);

  useEffect(() => {
    if (!q) { setResults([]); return; }
    ctrlRef.current?.abort();          // cancel in-flight
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;

    fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then(setResults)
      .catch((e) => { if (e.name !== "AbortError") console.error(e); });

    return () => ctrl.abort();         // cleanup on unmount / next effect
  }, [q]);

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" />
      <ul>
        {results.map((r) => (
          <li key={r.id} onClick={() => onPick(r)}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Common pitfalls

- **State updates feel sync but aren't** — `setX(x+1); setX(x+1)` only increments once because `x` is stale. Use the functional form: `setX(v => v+1)`.
- **Missing dependency in `useEffect`** — eslint-plugin-react-hooks complains for a reason; stale closures cause subtle bugs.
- **Index as key in dynamic lists** — break diffing on reorder. Use stable IDs.
- **Premature `useMemo` / `useCallback`** — they have their own cost. Add only when a profile shows it matters.
- **Putting everything in Context** — every consumer re-renders on any change. Use a state lib (Zustand, Jotai) for high-churn shared state.
- **Mutating state in place** — `state.push(x); setState(state)` won't trigger a re-render. Always return a new array/object: `setState([...state, x])`.

## What to learn next

- **Next.js App Router** (RSC, server actions, streaming) · **state libraries** (Zustand, Jotai, Redux Toolkit) · **data fetching** (TanStack Query, SWR) · **testing** (Vitest + React Testing Library, Playwright) · **animations** (Framer Motion) · **TypeScript with React** generics & ref forwarding.

> **Personal note:** _<TODO: which React patterns/libraries you reach for and your stance on RSC.>_

## Sources

- [React Docs (react.dev)](https://react.dev/)
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [React on GitHub](https://github.com/facebook/react)
- [React Status — JSX Spec](https://facebook.github.io/jsx/)
- [Next.js — React Framework](https://nextjs.org/)

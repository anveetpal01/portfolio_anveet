# JavaScript — cheatsheet

## When to reach for it

- **Anything that runs in a browser** — interactivity, DOM manipulation, SPA frameworks (React/Vue/Svelte).
- **Server / tooling** — Node.js (Express, Next.js, Vite), CLIs, build tools, automation.
- **Cross-platform** — React Native (mobile), Electron (desktop), WebAssembly bridges.

## Mental model

JavaScript is **single-threaded with an event loop**. Synchronous code runs on the call stack; async work (timers, I/O, Promises) queues callbacks that run *between* stack frames. There's no shared-memory threading and no parallelism inside one JS context — concurrency comes from non-blocking I/O. Everything is an object (functions included), and almost everything (except `null` and `undefined`) has a prototype chain you can walk for properties.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **`===`** | Strict equality — same type AND value, no coercion. Always prefer over `==`. |
| **Hoisting** | Declarations are moved to the top of their scope; `var` initialises to `undefined`, `let`/`const` stay in the TDZ. |
| **Closure** | A function that retains access to variables from its outer lexical scope after that scope ends. |
| **Event loop** | Mechanism that picks tasks from the microtask + macrotask queues and runs them on the call stack. |
| **Microtask vs macrotask** | Promise callbacks (micro) drain *fully* between each macrotask (setTimeout, I/O). |
| **`this`** | Regular fn → depends on call site; arrow fn → captured lexically. |
| **Prototype chain** | Property lookup walks `[[Prototype]]` links until found or null. |
| **Modules (ESM)** | `import`/`export`, static, tree-shakeable — the modern standard. |
| **Promise / async-await** | Sugar over a state machine for non-blocking work. `await` pauses, doesn't block. |
| **WeakMap / WeakSet** | Hold object keys weakly — let GC reclaim them; useful for caches and metadata. |

## Minimum example

```js
// Async data fetch with timeout + cancellation, modern style.
async function fetchJSON(url, { timeoutMs = 5000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// Debounce — fires once after the calls stop for `wait` ms.
const debounce = (fn, wait) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

const onSearch = debounce((q) => fetchJSON(`/api/search?q=${q}`), 300);
```

## Common pitfalls

- **`==` coercion footguns** — `[] == ![]` is `true`. Use `===`.
- **Forgetting `await`** inside an async function — silently returns an unawaited Promise that may reject and become an "unhandled rejection".
- **`this` in callbacks** — arrow functions capture `this`; regular functions don't. Convert callbacks to arrows or `bind`.
- **Mutating shared state inside `.map`/`.filter`** — these are meant to be pure transformations; side effects belong in `.forEach` or a `for` loop.
- **Memory leaks from event listeners** that aren't removed (or detached DOM nodes still referenced by JS).

## What to learn next

- **TypeScript** (typing JS at scale) · **React / Next.js** · **Promises in depth** (`Promise.all`, `Promise.allSettled`, `Promise.any`) · **Web APIs** (Fetch, IntersectionObserver, Web Workers) · **Performance** (rendering, Core Web Vitals).

> **Personal note:** _<TODO: where you've used JavaScript and what you reach for most.>_

## Sources

- [MDN — JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [TC39 — ECMAScript Proposals](https://tc39.es/)
- [JavaScript on Wikipedia](https://en.wikipedia.org/wiki/JavaScript)
- [InterviewBit — JavaScript Interview Questions](https://www.interviewbit.com/javascript-interview-questions/)

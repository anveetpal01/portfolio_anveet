# Offline AI Coding Agent — Technical Deep-Dive

## Why I built it

Claude Code is unusable offline (no internet = no model). I wanted a
Claude-Code-like coding agent that runs **fully on my laptop**: takes a query,
makes a plan, reads/writes files, runs commands, and iterates.

The key realisation: "Claude Code" = a **harness** (the plan→act→observe loop +
tools) plus a **model** (a frontier model, running in the cloud). Offline you
lose the *model*, not the *harness*. So this project = **build the harness
myself in Python (to learn), and plug in the best local model my machine can
run via Ollama**. The harness can be genuinely Claude-Code-like; the
intelligence is capped by the local model.

Realistic outcome: an agent that behaves like a capable junior dev on small,
well-scoped tasks — write functions/scripts, small features, run and fix.
Not a frontier model, but genuinely useful offline, and a great way to learn
how agents actually work.

---

## Hardware target (verified)

| Component | Spec |
|---|---|
| GPU | RTX 5060 Laptop (~8 GB VRAM) |
| RAM | 16 GB |
| CPU | i7-14650HX (24 threads) |
| Sweet spot | **7B–8B models at Q4_K_M**, fully in VRAM (fast) |

---

## Decisions

- **Goal:** learn by building the harness myself.
- **Approach:** build the agent loop + tools in Python; **Ollama** serves the
  model — the best blend of real-world use and learning, without reinventing
  model inference.
- **v1 target:** chat + file read/write + run commands, with a basic
  plan → act loop.
- **Offline-first, hybrid-ready:** the LLM layer is designed so a
  `ClaudeClient` can be added later for an optional `--online` mode that uses
  the real cloud API.

### Recommended local models

- **Coding:** `qwen2.5-coder:7b` (proven) or `qwen3:8b` (newer, top HumanEval
  under 8B).
- **Most reliable tool-calling:** `qwen3:8b`, fallback `hermes3:8b` (fine-tuned
  for clean JSON tool calls).
- Start with **one model that does both** (`qwen3:8b`); keep `hermes3:8b` as a
  fallback if tool-call JSON gets flaky.

---

## Project structure

```
D:\AI_Agents\offline_claude\
├── requirements.txt       ollama, rich, openai, fastapi, uvicorn, pywebview
├── config.py              model name, backend, project root, settings
├── main.py                CLI REPL entry point
├── server.py              FastAPI + WebSocket bridge for the web UI
├── desktop.py             pywebview wrapper → native-app feel
├── web/                   index.html, app.js, style.css  (web front-end)
├── ui/                    console_ui.py, web_ui.py       (shared UI bases)
└── agent/
    ├── llm.py             LLM client abstraction → OllamaClient (cloud client later)
    ├── tools.py           tool functions + JSON schemas + dispatch/execution
    ├── loop.py            the agent loop: send → tool call? → execute → feed back → repeat
    ├── prompts.py         system prompt (drives the agent's behaviour)
    ├── modes.py           offline ↔ online switching
    └── context.py         conversation history + truncation/summarization
```

---

## Milestones

### M1 — Bare chat REPL
Terminal loop: read input → stream model reply via the `ollama` Python lib →
print → keep history.
**Teaches:** the model API, streaming, conversation history as a list of
role/content messages.
**Verify:** multi-turn chat where it remembers earlier turns. `rich` shows
clean streamed output.

### M2 — File tools + the agent loop
Define tools as Python functions with JSON schemas: `read_file`, `write_file`,
`edit_file` (exact-string replace), `list_dir`. Register them so the model can
call them. Implement the tool-use loop: model emits a tool call → harness
executes it → appends the result to the conversation → loops until the model
returns a final text answer.
**Teaches:** how tool/function calling actually works (schemas + a loop) —
the heart of an agent.
**Verify:** *"create fib.py with a fibonacci function"* → file appears, correct
content; *"read fib.py and explain it"* → accurate summary; *"rename the
function in fib.py"* → edit applied.

### M3 — Command execution + planning  (v1 complete)
Add `run_command` **with a safety gate**: print the command and ask Y/n before
running (and/or an allowlist). Never auto-run. Scope file ops to the project
root. Tighten the system prompt so the agent states a short plan first, then
executes step by step.
**Teaches:** permissions/safety (mirrors how Claude Code asks before running)
+ plan → act → observe.
**Verify (end-to-end):**
- *"write a script that prints the first 10 fibonacci numbers and run it"* →
  writes file → asks to run → runs → shows output.
- *"make a small CLI calculator with a test file, then run the tests"* →
  creates files → runs tests → reports results, fixing on failure.

### M4 — Polish & robustness (post-v1)

- **Context management:** summarise/truncate old turns near the model's
  context limit (small models have little room — a real pain point).
- **Robust tool calls:** validate the tool-call JSON; on malformed output,
  retry with a correction message (7B models occasionally mangle calls).
- **Better edits:** show diffs with `rich`.
- **Hybrid online mode:** add `ClaudeClient` + `anthropic` SDK + `--online`
  flag (uses real Claude API with caching when online).
- **Project awareness:** `/add <file>` to pull files into context; simple
  slash commands; save/load sessions.

---

## Safety (built in from M3)

- `run_command`: confirm before executing; allowlist plus blocking obvious
  destructive patterns. **This is the single most important safety feature.**
- File writes restricted to the project root (reject paths that escape it).
- These mirror Claude Code's permission model — and they're good learning
  about agent safety.

---

## Slash commands

The CLI REPL accepts in-chat commands so I can drive the agent without
restarting:

| Command | Effect |
|---|---|
| `/online`  /  `/offline` | Switch model backend (local ↔ cloud) |
| `/save [name]` | Save the current conversation to a local file |
| `/load [name]` | Restore a saved conversation |
| `/new` | Start a fresh conversation |
| `/status`  /  `/help` | Info |
| `exit` | Quit |

---

## Expectations / risks (honest)

- The 7B–8B model **will** make mistakes and sometimes mishandle tool calls —
  expected; the harness's validation/retry absorbs it.
- It will **not** match a frontier model. Best for small, scoped tasks; weak
  on large codebases and long, complex reasoning.
- Speed is good — the model fits fully in VRAM. 14B is possible but slower;
  starting at 7–8B is the right trade-off.

---

> **Personal note:** _<TODO: what surprised you most while building it, and the
> trickiest bug you fixed in the tool-call loop.>_

## Sources

- `PLAN.md` (project root) — the original design doc this page is curated from
- [Ollama — official docs](https://ollama.com/)
- [Ollama — OpenAI-compatible API](https://ollama.com/blog/openai-compatibility)
- [llama.cpp on GitHub](https://github.com/ggml-org/llama.cpp)
- [Qwen models on Ollama](https://ollama.com/library/qwen3)

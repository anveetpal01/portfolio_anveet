# C# — cheatsheet

## When to reach for it

- **Enterprise / business apps** — ASP.NET Core APIs, web apps, internal tooling.
- **Game development** — Unity uses C# for all gameplay scripting (Pokémon GO, Hollow Knight, Cities: Skylines).
- **Cross-platform .NET** — Windows, Linux, macOS, mobile (.NET MAUI), even WebAssembly (Blazor).

## Mental model

C# is a **statically-typed, JIT-compiled language on the CLR (Common Language Runtime)**. Source → IL bytecode → JIT → native machine code. The runtime brings a generational GC, strong typing, async via state machines, LINQ, and a massive standard library. Think of C# as Java's well-rested cousin: similar OOP shape but with `async`/`await`, value types (`struct`), pattern matching, records, and `Span<T>` baked in.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **Value vs reference type** | `struct`/`int` (stack, copy by value) vs `class`/`string` (heap, copy by reference). |
| **Boxing** | Wrapping a value type in a reference type — `object x = 5;` allocates on the heap. Hot-path killer. |
| **GC generations** | Gen 0 (new, often collected), Gen 1 (survivors), Gen 2 (long-lived, expensive). |
| **`async`/`await`** | Compiler rewrites the method into a state machine; releases the thread on await. |
| **`Task` vs `ValueTask`** | `Task` is a class (heap); `ValueTask` is a struct — use when most calls finish sync. |
| **`IEnumerable<T>` vs `IQueryable<T>`** | `IEnumerable` runs in-memory; `IQueryable` translates to SQL via expression trees. |
| **`IDisposable` / `using`** | Deterministic cleanup of unmanaged resources (files, sockets, connections). |
| **`record`** | Reference type with value equality + `with` syntax — perfect for DTOs (C# 9+). |
| **Nullable reference types** | `string?` opts a reference type into nullability; the compiler warns on misuse. |
| **`Span<T>`** | Stack-only slice over memory — zero-allocation parsing & buffer manipulation. |

## Minimum example

```csharp
// Minimal ASP.NET Core API with async endpoint, DI, and IDisposable.
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient<WeatherClient>();
var app = builder.Build();

app.MapGet("/weather/{city}", async (string city, WeatherClient client) =>
    Results.Ok(await client.GetForecastAsync(city)));

app.Run();

public sealed class WeatherClient(HttpClient http)
{
    public async Task<string> GetForecastAsync(string city)
    {
        using var res = await http.GetAsync($"/forecast?q={city}");
        res.EnsureSuccessStatusCode();
        return await res.Content.ReadAsStringAsync();
    }
}
```

## Common pitfalls

- **`async void`** — only valid for event handlers. Otherwise: exceptions can't be awaited and crash the process.
- **`.Result` / `.Wait()` in UI/ASP.NET contexts** — deadlocks the captured synchronization context. Always `await`.
- **Returning `IEnumerable<T>` from a DB query without materialising** — the query may re-run every iteration. Add `.ToList()` once.
- **`throw ex;` inside a `catch`** — resets the stack trace. Use `throw;` to rethrow or `throw new MyEx(\"...\", ex)` to wrap.
- **Forgetting `IDisposable`** — leaked file handles / DB connections eventually exhaust the OS or pool.

## What to learn next

- **ASP.NET Core** (Minimal APIs, middleware, DI) · **Entity Framework Core** · **gRPC** for typed RPC · **AOT compilation** (`PublishAot=true`) · **NuGet packaging** · **xUnit / NUnit** for testing.

> **Personal note:** _<TODO: where you've used C# (e.g. Rewards Management API .NET 8) and what surprised you.>_

## Sources

- [C# Language Documentation — Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/)
- [.NET on GitHub](https://github.com/dotnet)
- [C# Language Design Notes](https://github.com/dotnet/csharplang)
- [InterviewBit — C# Interview Questions](https://www.interviewbit.com/c-sharp-interview-questions/)

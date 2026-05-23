# .NET — cheatsheet

## When to reach for it

- **Enterprise APIs and web apps** — ASP.NET Core is among the fastest web stacks anywhere.
- **Cross-platform** services (Linux containers, Azure Functions, AWS Lambda).
- **Game scripting** (Unity), desktop (WPF / WinUI / MAUI), and even web (Blazor + WASM).

## Mental model

.NET = **runtime (CLR) + library (BCL) + frameworks** (ASP.NET Core for web, EF Core for data, MAUI for UI, ML.NET for ML). Source code in **C#/F#/VB** → IL bytecode → JIT-compiled to native code at run time (or AOT-compiled at publish time). Strong typing, generational GC, async via state machines, LINQ over any `IEnumerable`/`IQueryable`. Dependency injection is built into the framework, not bolted on.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **CLR** | Common Language Runtime — JIT, GC, type safety, threading, security. |
| **BCL** | Base Class Library — collections, IO, networking, JSON, crypto, etc. |
| **.NET vs .NET Framework** | Modern .NET (5+) is cross-platform, open source. Framework (1–4.8) is Windows-only legacy. |
| **GC generations** | Gen 0 / Gen 1 / Gen 2 + LOH; most allocations die in Gen 0. |
| **DI lifetimes** | Singleton (app), Scoped (request), Transient (every resolve). |
| **Kestrel** | Built-in cross-platform web server; run direct or behind nginx/IIS. |
| **Minimal APIs** | Define endpoints right in `Program.cs` — no controllers needed. |
| **EF Core** | The standard ORM — code-first, LINQ → SQL, async by default. |
| **Native AOT** | Publish-time native compilation; <50 ms cold start. |
| **`Span<T>` / `Memory<T>`** | Zero-allocation slicing for parsers / I/O hot paths. |
| **`Channel<T>`** | Async-first producer/consumer queue with backpressure. |

## Minimum example

```csharp
// Program.cs — full ASP.NET Core Minimal API
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDb>(opt =>
    opt.UseSqlite("Data Source=app.db"));
builder.Services.AddScoped<UserService>();

var app = builder.Build();

app.MapGet("/users", async (UserService svc) =>
    Results.Ok(await svc.AllAsync()));

app.MapPost("/users", async (
    [FromBody] CreateUser dto,
    UserService svc) =>
        Results.Created($"/users/{(await svc.AddAsync(dto)).Id}", null));

app.Run();

public record CreateUser(string Name, string Email);

public sealed class User { public int Id { get; set; } public string Name { get; set; } = ""; public string Email { get; set; } = ""; }

public sealed class AppDb(DbContextOptions<AppDb> opt) : DbContext(opt)
{
    public DbSet<User> Users => Set<User>();
}

public sealed class UserService(AppDb db)
{
    public Task<List<User>> AllAsync() => db.Users.AsNoTracking().ToListAsync();
    public async Task<User> AddAsync(CreateUser dto)
    {
        var u = new User { Name = dto.Name, Email = dto.Email };
        db.Users.Add(u); await db.SaveChangesAsync(); return u;
    }
}
```

## Common pitfalls

- **`async void`** outside event handlers — exceptions can't be observed; crash on unhandled.
- **`.Result` / `.Wait()` in ASP.NET / WPF** — sync-over-async deadlock risk; always `await`.
- **N+1 with EF Core** — use `Include()` / projection (`Select(u => new ...)`) instead of loading then iterating.
- **`throw ex;` in a catch** — resets the stack trace. Use `throw;` (or `throw new MyEx(\"...\", ex)`).
- **Leaving `IDisposable` undisposed** — use `using` / `using var` to guarantee release.
- **Capturing `HttpContext` outside a request** — it's scoped; storing it in a singleton leaks references.

## What to learn next

- **EF Core** (migrations, projections, change tracking) · **gRPC** for typed RPC · **SignalR** for realtime · **Authentication & Authorization** (JWT, OAuth2, OpenIdConnect) · **OpenTelemetry** for observability · **xUnit / NUnit + WebApplicationFactory** for integration tests · **Native AOT** for fast cold starts.

> **Personal note:** _<TODO: where you used .NET (e.g. Rewards Management API .NET 8) and what surprised you about the ecosystem.>_

## Sources

- [.NET Documentation](https://learn.microsoft.com/en-us/dotnet/)
- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core)
- [.NET on GitHub](https://github.com/dotnet)
- [InterviewBit — .NET Interview Questions](https://www.interviewbit.com/dot-net-interview-questions/)
- [TechEmpower Web Framework Benchmarks](https://www.techempower.com/benchmarks/)

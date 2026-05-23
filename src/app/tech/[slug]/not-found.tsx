import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TechNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        404
      </span>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Tech not found
      </h1>
      <p className="mt-5 max-w-md text-muted">
        No matching tech exists in the project registry. Head back and pick
        one from the work grid.
      </p>
      <Link
        href="/#work"
        data-cursor
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <ArrowLeft size={15} />
        Back to projects
      </Link>
    </main>
  );
}

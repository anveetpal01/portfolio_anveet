import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        404
      </span>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Project not found
      </h1>
      <p className="mt-5 max-w-md text-muted">
        That project doesn&apos;t exist (or hasn&apos;t been added yet). Head
        back and pick one from the grid.
      </p>
      <Link
        href="/#work"
        data-cursor
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <ArrowLeft size={15} />
        Back to all work
      </Link>
    </main>
  );
}

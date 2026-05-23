import { Zap } from "lucide-react";

/**
 * Shared "Interesting facts" UI — used by both /tech/<slug> and /skill/<slug>.
 * Pure presentational, server-rendered (no JS). On-brand: accent left border,
 * lightning bolt per fact in mono kicker scale, optional Sources footer with
 * truncated source URLs.
 */
export function FactsList({
  facts,
  sources,
}: {
  facts: string[];
  sources?: string[];
}) {
  if (!facts || facts.length === 0) return null;

  return (
    <div className="rounded-2xl border border-line bg-surface">
      <ul className="divide-y divide-line">
        {facts.map((fact, i) => (
          <li
            key={i}
            className="flex items-start gap-4 px-6 py-5"
          >
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
              <Zap size={14} fill="currentColor" />
            </span>
            <p className="flex-1 text-base leading-relaxed text-muted md:text-[17px]">
              {fact}
            </p>
          </li>
        ))}
      </ul>

      {sources && sources.length > 0 ? (
        <div className="border-t border-line px-6 py-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
            Sources
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {sources.map((src) => {
              let host = src;
              try {
                host = new URL(src).hostname.replace(/^www\./, "");
              } catch {
                // not a URL, keep as-is
              }
              return (
                <li key={src}>
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="font-mono text-xs text-muted transition-colors hover:text-accent"
                  >
                    {host}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

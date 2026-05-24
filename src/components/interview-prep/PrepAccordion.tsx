import type { ReactNode } from "react";

/**
 * Themed <details>/<summary> — mirrors the accent-border-on-open look the
 * skill-page Q&A accordion already uses. Server-side, no JS needed.
 */
export function PrepAccordion({
  summary,
  topic,
  open = false,
  children,
}: {
  summary: string;
  /** Optional small badge in the summary row (e.g. "JSON parser", "loop"). */
  topic?: string;
  open?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      open={open}
      className="group rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-faint open:border-accent"
    >
      <summary
        data-cursor
        className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden"
      >
        <div className="flex-1">
          {topic ? (
            <div className="mb-2 inline-flex items-center rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {topic}
            </div>
          ) : null}
          <div className="text-base font-medium text-foreground md:text-lg">
            {summary}
          </div>
        </div>
        <span
          aria-hidden
          className="mt-1 font-mono text-accent transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="mt-4 space-y-4 border-l-2 border-accent pl-4 text-base leading-relaxed text-muted md:text-[17px]">
        {children}
      </div>
    </details>
  );
}

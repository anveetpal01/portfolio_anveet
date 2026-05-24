/**
 * Themed code block — same look as the Markdown component's <pre>/<code>:
 * elevated background, mono font, horizontal scroll inside the block.
 * Optional language pill (e.g. "py", "ts", "ascii") in the top-right.
 */
export function PrepCode({
  code,
  lang,
}: {
  code: string;
  lang?: string;
}) {
  return (
    <div className="relative">
      {lang ? (
        <span className="absolute right-3 top-3 z-10 rounded border border-line bg-background/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted backdrop-blur">
          {lang}
        </span>
      ) : null}
      <pre className="my-4 overflow-x-auto rounded-xl border border-line bg-elevated p-5 text-sm leading-relaxed">
        <code className="block whitespace-pre font-mono text-foreground">
          {code}
        </code>
      </pre>
    </div>
  );
}

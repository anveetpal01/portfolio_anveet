/**
 * Mono "0X" kicker + accent line + foreground sub-heading — reused across
 * every sub-section of the interview-prep block.
 */
export function PrepHeading({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-accent/40" />
        <span className="text-muted">{kicker}</span>
      </div>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {title}
      </h3>
    </div>
  );
}

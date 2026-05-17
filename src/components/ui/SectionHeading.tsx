import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** Two-digit index, e.g. "01". */
  index: string;
  /** Small mono label above the title. */
  kicker: string;
  title: string;
  /** Optional supporting line under the title. */
  description?: string;
}

export function SectionHeading({
  index,
  kicker,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          <span>{index}</span>
          <span className="h-px w-10 bg-accent/50" />
          <span className="text-muted">{kicker}</span>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

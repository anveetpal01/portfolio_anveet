import { ArrowDownToLine } from "lucide-react";
import { experience, personal } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:py-36 lg:px-10"
    >
      <SectionHeading
        index="04"
        kicker="Experience"
        title="A path through code, craft & camera."
      />

      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="relative">
            {experience.map((job, i) => (
              <Reveal
                key={`${job.company}-${i}`}
                delay={i * 0.08}
                className="group relative border-l border-line pb-14 pl-8 last:pb-0"
              >
                <span className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-faint transition-colors duration-300 group-hover:bg-accent" />

                <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {job.period}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {job.role}
                </h3>
                <div className="mt-1 text-base text-muted">
                  {job.company}
                </div>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">
                  {job.summary}
                </p>
                <ul className="mt-5 space-y-2">
                  {job.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-sm text-foreground/80"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Résumé card */}
        <div className="lg:col-span-4">
          <Reveal delay={0.15}>
            <div className="sticky top-28 rounded-2xl border border-line bg-surface p-8">
              <h3 className="text-xl font-semibold text-foreground">
                Want the full story?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Grab the detailed résumé — roles, stack, awards and the
                projects behind the highlights.
              </p>
              <a
                href={personal.resumeUrl}
                download
                className="group mt-7 flex items-center justify-between rounded-xl bg-accent px-5 py-4 text-sm font-semibold text-background"
              >
                Download résumé
                <ArrowDownToLine
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
                ↳ add resume.pdf to <span className="text-muted">/public</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { disciplines, personal } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:py-36 lg:px-10"
    >
      <SectionHeading
        index="02"
        kicker="About"
        title="Engineer by training, artist by instinct."
      />

      <div className="grid gap-14 lg:grid-cols-12">
        {/* Bio */}
        <div className="lg:col-span-7">
          <div className="space-y-6">
            {personal.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-lg leading-relaxed text-muted md:text-xl">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <a
              href={`mailto:${personal.email}`}
              className="group mt-10 inline-flex items-center gap-3 font-mono text-sm text-foreground"
            >
              <span className="h-px w-12 bg-accent transition-all duration-300 group-hover:w-20" />
              {personal.email}
            </a>
          </Reveal>
        </div>

        {/* Portrait card */}
        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
              <div className="absolute inset-0 bg-gradient-to-br from-violet/40 via-pink/20 to-accent/30 transition-transform duration-700 group-hover:scale-105" />
              <div className="bg-grid absolute inset-0 opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[7rem] font-bold leading-none text-background/30 md:text-[9rem]">
                  {personal.firstName[0]}
                  {personal.lastName[0]}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-background/40 px-5 py-4 backdrop-blur-md">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                  {personal.firstName} {personal.lastName}
                </span>
                <span className="font-mono text-xs text-muted">
                  {personal.location}
                </span>
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              <span className="text-muted"></span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* Disciplines */}
      <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {disciplines.map((d, i) => (
          <Reveal
            key={d.title}
            delay={i * 0.08}
            className="group bg-background p-7 transition-colors duration-300 hover:bg-elevated"
          >
            <span className="font-mono text-xs text-faint">
              0{i + 1}
            </span>
            <h3 className="mt-6 text-xl font-semibold text-foreground">
              {d.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {d.desc}
            </p>
            <span className="mt-6 block h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

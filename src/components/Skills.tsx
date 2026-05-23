import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { skillGroups, skills } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const bySlug = new Map(skills.map((s) => [s.name.toLowerCase(), s] as const));

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:py-36 lg:px-10"
    >
      <SectionHeading
        index="03"
        kicker="Capabilities"
        title="A toolkit — click any to dive in."
        description="Each linked skill opens a cheatsheet, a proficiency calibration meter and curated interview questions."
      />

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.label}
            delay={i * 0.1}
            className="bg-background p-8"
          >
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
              <span>0{i + 1}</span>
              <span className="text-muted">{group.label}</span>
            </div>
            <ul className="mt-7 space-y-3.5">
              {group.items.map((item) => {
                const linked = bySlug.get(item.toLowerCase());
                if (linked) {
                  return (
                    <li key={item}>
                      <Link
                        href={`/skill/${linked.slug}`}
                        data-cursor
                        className="group/sk flex items-center gap-3 text-lg text-foreground transition-colors hover:text-accent"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-faint transition-colors duration-300 group-hover/sk:bg-accent" />
                        <span className="flex-1">{item}</span>
                        <ArrowUpRight
                          size={14}
                          className="text-muted opacity-0 transition-all duration-300 group-hover/sk:-translate-y-0.5 group-hover/sk:translate-x-0.5 group-hover/sk:text-accent group-hover/sk:opacity-100"
                        />
                      </Link>
                    </li>
                  );
                }
                return (
                  <li
                    key={item}
                    className="group flex items-center gap-3 text-lg text-foreground"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-faint transition-colors duration-300 group-hover:bg-accent" />
                    {item}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

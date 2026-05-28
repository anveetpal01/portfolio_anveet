import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { personal, projects, skills, type Skill } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Markdown } from "@/components/Markdown";
import { Calibration } from "@/components/skills/Calibration";
import { FactsList } from "@/components/skills/FactsList";

export function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = skills.find((s) => s.slug === slug);
  if (!skill) return { title: "Not found" };
  const title = `${skill.name} — ${personal.firstName} ${personal.lastName}`;
  const description = skill.oneLiner ?? `Interview prep & notes on ${skill.name}.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

async function loadDoc(docFile: string): Promise<string | null> {
  try {
    return await fs.readFile(
      path.join(process.cwd(), "src/content/skills", docFile),
      "utf8",
    );
  } catch {
    return null;
  }
}

function projectsForSkill(skill: Skill) {
  const needles = [skill.name, ...(skill.aliases ?? [])]
    .map((s) => s.toLowerCase())
    .filter(Boolean);
  return projects.filter((p) => {
    const haystack = [
      ...p.tags,
      ...(p.caseStudy?.techStack ?? []),
    ].map((s) => s.toLowerCase());
    return needles.some((n) => haystack.some((h) => h.includes(n) || n.includes(h)));
  });
}

const DIFF_COLOR: Record<string, string> = {
  easy: "border-cyan/40 text-cyan",
  medium: "border-accent/40 text-accent",
  hard: "border-pink/50 text-pink",
};

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = skills.find((s) => s.slug === slug);
  if (!skill) notFound();

  const docContent = skill.docFile ? await loadDoc(skill.docFile) : null;
  const used = projectsForSkill(skill);
  const qa = skill.interviewQuestions ?? [];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pb-28 pt-32 md:pt-40 lg:px-10">
        <Reveal>
          <Link
            href="/#skills"
            data-cursor
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            All skills
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Skill
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {skill.name}
          </h1>
        </Reveal>

        {skill.oneLiner ? (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
              {skill.oneLiner}
            </p>
          </Reveal>
        ) : null}

        <div className="mt-12">
          <Reveal>
            <Calibration value={skill.proficiency} />
          </Reveal>
        </div>

        {/* Cheatsheet */}
        <div className="mt-14 border-t border-line py-10">
          <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Cheatsheet
          </h2>
          {docContent ? (
            <Reveal>
              <Markdown>{docContent}</Markdown>
            </Reveal>
          ) : (
            <p className="text-muted">
              Cheatsheet coming soon.
            </p>
          )}
        </div>

        {/* Where I've used it */}
        <div className="border-t border-line py-10">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Where I&apos;ve used it
          </h2>
          {used.length === 0 ? (
            <p className="text-muted">
              No projects tagged with this skill yet.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {used.map((p) => (
                <Link
                  key={p.id}
                  href={`/work/${p.slug}`}
                  data-cursor
                  className="group block rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {p.category} · {p.year}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-foreground">
                    {p.title}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    View case study
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Interesting facts (only when present) */}
        {skill.interestingFacts && skill.interestingFacts.length > 0 ? (
          <div className="border-t border-line py-10">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Interesting facts
            </h2>
            <Reveal>
              <FactsList
                facts={skill.interestingFacts}
                sources={skill.sources}
              />
            </Reveal>
          </div>
        ) : null}

        {/* Interview prep */}
        <div className="border-t border-line py-10">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Interview prep
          </h2>
          {qa.length === 0 ? (
            <p className="text-muted">
              Interview questions coming soon.
            </p>
          ) : (
            <div className="space-y-3">
              {qa.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-faint open:border-accent"
                >
                  <summary
                    data-cursor
                    className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden"
                  >
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                        {item.difficulty ? (
                          <span
                            className={`rounded-full border px-2 py-0.5 ${
                              DIFF_COLOR[item.difficulty] ?? "border-line text-muted"
                            }`}
                          >
                            {item.difficulty}
                          </span>
                        ) : null}
                        {item.topic ? (
                          <span className="rounded-full border border-line px-2 py-0.5 text-muted">
                            {item.topic}
                          </span>
                        ) : null}
                      </div>
                      <div className="text-base font-medium text-foreground md:text-lg">
                        {item.q}
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="mt-1 font-mono text-accent transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  {item.a ? (
                    <p className="mt-4 border-l-2 border-accent pl-4 text-base leading-relaxed text-muted md:text-[17px]">
                      {item.a}
                    </p>
                  ) : null}
                </details>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <Link
            href="/#skills"
            data-cursor
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to all skills
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

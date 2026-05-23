import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { personal, projects, techs, type Tech } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { FactsList } from "@/components/skills/FactsList";

export function generateStaticParams() {
  return techs.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tech = techs.find((t) => t.slug === slug);
  if (!tech) return { title: "Not found" };
  const title = `${tech.name} — ${personal.firstName} ${personal.lastName}`;
  return {
    title,
    description: tech.oneLiner,
    openGraph: { title, description: tech.oneLiner, type: "article" },
  };
}

function projectsUsingTech(tech: Tech) {
  const needles = [tech.name, ...(tech.aliases ?? [])]
    .map((s) => s.toLowerCase().trim())
    .filter(Boolean);
  return projects.filter((p) => {
    const haystack = [
      ...p.tags,
      ...(p.caseStudy?.techStack ?? []),
    ].map((s) => s.toLowerCase());
    return needles.some((n) =>
      haystack.some((h) => h === n || h.includes(n) || n.includes(h)),
    );
  });
}

export default async function TechPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tech = techs.find((t) => t.slug === slug);
  if (!tech) notFound();

  const usedIn = projectsUsingTech(tech);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pb-28 pt-32 md:pt-40 lg:px-10">
        <Reveal>
          <Link
            href="/#work"
            data-cursor
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            All projects
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Tech
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {tech.name}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted md:text-2xl">
            {tech.oneLiner}
          </p>
        </Reveal>

        {/* Where it's used */}
        <div className="mt-14 border-t border-line py-10">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Where it&apos;s used
          </h2>
          {usedIn.length === 0 ? (
            <p className="text-muted">
              Not yet linked to a project in this portfolio.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {usedIn.map((p) => (
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

        {/* Interesting facts */}
        <div className="border-t border-line py-10">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Interesting facts
          </h2>
          <Reveal>
            <FactsList facts={tech.interestingFacts} sources={tech.sources} />
          </Reveal>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <Link
            href="/#work"
            data-cursor
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to all projects
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

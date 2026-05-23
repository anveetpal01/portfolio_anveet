import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { experience, personal, projects } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { MediaThumb } from "@/components/work/MediaThumb";

// Prerender every company that has a slug (skips education entries).
export function generateStaticParams() {
  return experience
    .filter((e): e is typeof e & { slug: string } => Boolean(e.slug))
    .map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = experience.find((e) => e.slug === slug);
  if (!company) return { title: "Not found" };
  const title = `${company.company} — ${personal.firstName} ${personal.lastName}`;
  return {
    title,
    description: company.summary,
    openGraph: { title, description: company.summary, type: "article" },
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = experience.find((e) => e.slug === slug);
  if (!company) notFound();

  const built = projects.filter((p) => p.companyId === slug);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pb-28 pt-32 md:pt-40 lg:px-10">
        <Reveal>
          <Link
            href="/#experience"
            data-cursor
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            All experience
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="text-accent">{company.role}</span>
            <span className="h-px w-8 bg-line" />
            <span>{company.period}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {company.company}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {company.summary}
          </p>
        </Reveal>

        {company.highlights.length > 0 ? (
          <div className="mt-14 border-t border-line py-10">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              What I did
            </h2>
            <ul className="max-w-3xl space-y-3">
              {company.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-base leading-relaxed text-muted md:text-[17px]"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="border-t border-line py-10">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Built here
          </h2>
          {built.length === 0 ? (
            <p className="text-muted">
              New projects from this company will appear here.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {built.map((p, idx) => (
                <article
                  key={p.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-faint"
                >
                  <MediaThumb
                    project={p}
                    isFeatured={false}
                    isFirst={idx === 0}
                  />
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                      {p.blurb}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-faint"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-7">
                      <Link
                        href={`/work/${p.slug}`}
                        data-cursor
                        className="group/cs inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-accent"
                      >
                        View case study
                        <ArrowUpRight
                          size={15}
                          className="transition-transform group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <Link
            href="/#experience"
            data-cursor
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to all experience
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

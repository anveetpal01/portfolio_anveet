import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { personal, projects } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { MetricsGrid } from "@/components/charts/MetricsGrid";
import { CaseStudyGallery } from "@/components/work/CaseStudyGallery";
import { Markdown } from "@/components/Markdown";
import { InterviewPrep } from "@/components/interview-prep/InterviewPrep";
import { findTechOrSkill } from "@/lib/lookup";

async function loadDoc(docFile: string): Promise<string | null> {
  try {
    const p = path.join(process.cwd(), "src/content/case-studies", docFile);
    return await fs.readFile(p, "utf8");
  } catch {
    return null;
  }
}

// Prerender every project page at build time (static).
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// v16: params is a Promise — it must be awaited here too.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };

  const title = `${project.title} — ${personal.firstName} ${personal.lastName}`;
  const description = project.caseStudy?.summary ?? project.blurb;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line py-10">
      <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
        {label}
      </h2>
      <div className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
        {children}
      </div>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  // Read the optional deep-dive Markdown at build time (static).
  const docContent = cs?.docFile ? await loadDoc(cs.docFile) : null;

  // Interview-prep gating — author-only, never shipped to public.
  // We strip it from the project object that crosses into client components
  // (e.g. <CaseStudyGallery> uses "use client" → Next serialises its props
  // into the RSC flight payload, which would otherwise leak the prep data
  // into the static HTML even though the dev-gate hides it visually).
  const isDev = process.env.NODE_ENV === "development";
  const prep = isDev ? cs?.interviewPrep : undefined;
  const safeProject = isDev
    ? project
    : {
        ...project,
        caseStudy: cs ? { ...cs, interviewPrep: undefined } : cs,
      };

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
            All work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="text-accent">{project.category}</span>
            <span className="h-px w-8 bg-line" />
            <span>{project.year}</span>
            {cs?.timeline ? (
              <>
                <span className="h-px w-8 bg-line" />
                <span>{cs.timeline}</span>
              </>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {cs?.summary ?? project.blurb}
          </p>
        </Reveal>

        {project.links && project.links.length > 0 ? (
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          </Reveal>
        ) : null}

        {/* Media */}
        <div className="mt-14">
          <Reveal>
            <CaseStudyGallery project={safeProject} />
          </Reveal>
        </div>

        {/* Narrative */}
        {cs ? (
          <div className="mt-16">
            {cs.problem ? <Block label="Problem">{cs.problem}</Block> : null}
            {cs.approach ? <Block label="Approach">{cs.approach}</Block> : null}
            {cs.role ? <Block label="My role">{cs.role}</Block> : null}
            {cs.outcome ? <Block label="Outcome">{cs.outcome}</Block> : null}
            {(cs.sections ?? []).map((s) => (
              <Block key={s.heading} label={s.heading}>
                {s.body}
              </Block>
            ))}

            {cs.techStack && cs.techStack.length > 0 ? (
              <div className="border-t border-line py-10">
                <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Tech stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cs.techStack.map((t) => {
                    const hit = findTechOrSkill(t);
                    if (hit) {
                      return (
                        <Link
                          key={t}
                          href={hit.href}
                          data-cursor
                          className="group inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                        >
                          {t}
                          <ArrowUpRight
                            size={11}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </Link>
                      );
                    }
                    return (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted"
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {(cs.metrics?.length ?? 0) > 0 || (cs.charts?.length ?? 0) > 0 ? (
              <div className="border-t border-line py-10">
                <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Results & numbers
                </h2>
                <MetricsGrid metrics={cs.metrics} charts={cs.charts} />
              </div>
            ) : null}

            {docContent ? (
              <div className="border-t border-line py-10">
                <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Technical deep-dive
                </h2>
                <Reveal>
                  <Markdown>{docContent}</Markdown>
                </Reveal>
              </div>
            ) : null}

            {/* Interview prep is for the author's personal use only.
                Dev-only render → completely absent from production SSG output.
                Safe today because the case-study page and all <InterviewPrep>
                components are SERVER components — the gated branch is dropped
                at build time and the data never reaches the client bundle.
                If any of those components becomes a client component, this
                gate must be re-audited. */}
            {prep ? (
              <div className="border-t border-line py-10">
                <h2 className="mb-2 flex flex-wrap items-baseline gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Interview prep
                  <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] tracking-[0.2em] text-accent">
                    Dev only · not shipped
                  </span>
                </h2>
                <Reveal>
                  <InterviewPrep data={prep} />
                </Reveal>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="mt-16 border-t border-line pt-10 text-muted">
            A detailed write-up for this project is coming soon.
          </p>
        )}

        <div className="mt-16 border-t border-line pt-10">
          <Link
            href="/#work"
            data-cursor
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to all work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

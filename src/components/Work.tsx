"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { projects, type ProjectCategory } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaThumb } from "@/components/work/MediaThumb";
import { Lightbox } from "@/components/work/Lightbox";

// Only categories that currently have projects. Re-add "Design" / "Photography"
// / "Video" here when you add work in those areas.
const FILTERS: ("All" | ProjectCategory)[] = ["All", "Development"];

export default function Work() {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const reduce = useReducedMotion();

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  const openProject = openId
    ? projects.find((p) => p.id === openId) ?? null
    : null;

  return (
    <section
      id="work"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:py-36 lg:px-10"
    >
      <SectionHeading
        index="01"
        kicker="Selected Work"
        title="Things I've built, designed & shot."
        description="A cross-section of engineering, ML and visual work. Filter by craft — open a project for the full case study and the numbers."
      />

      {/* Filters */}
      <div className="mb-12 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              data-cursor
              className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
                isActive
                  ? "border-accent bg-accent text-background"
                  : "border-line text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, idx) => {
            const isFeatured = !!p.featured && active === "All";
            const hasMedia = (p.media?.length ?? 0) > 0;
            const isExpanded = expandedId === p.id;
            const topMetrics = p.caseStudy?.metrics?.slice(0, 3) ?? [];

            return (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-faint ${
                  isFeatured ? "md:col-span-2" : ""
                }`}
              >
                {/* Visual — click opens the media lightbox (if any media), else
                    falls back to the external link, else just a static cover. */}
                <div className="relative">
                  <MediaThumb
                    project={p}
                    isFeatured={isFeatured}
                    isFirst={idx === 0}
                    interactive={hasMedia}
                  />
                  {hasMedia ? (
                    <button
                      type="button"
                      onClick={() => {
                        setOpenId(p.id);
                        setMediaIndex(0);
                      }}
                      aria-label={`View media for ${p.title}`}
                      data-cursor
                      className="absolute inset-0 z-20"
                    />
                  ) : p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${p.title}`}
                      className="absolute inset-0 z-20"
                    />
                  ) : null}
                  {!hasMedia && p.href ? (
                    <span className="pointer-events-none absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-accent text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight size={20} />
                    </span>
                  ) : null}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-7">
                  <h3
                    className={`font-semibold tracking-tight text-foreground ${
                      isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
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

                  {/* Inline quick-expand: summary + top metrics + stack */}
                  <AnimatePresence initial={false}>
                    {isExpanded && p.caseStudy ? (
                      <motion.div
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 border-t border-line pt-6">
                          <p className="text-sm leading-relaxed text-foreground/90">
                            {p.caseStudy.summary}
                          </p>
                          {topMetrics.length > 0 ? (
                            <div className="mt-5 flex flex-wrap gap-5">
                              {topMetrics.map((m) => (
                                <div key={m.label}>
                                  <div className="font-mono text-2xl font-semibold text-accent">
                                    {m.value}
                                  </div>
                                  <div className="mt-1 text-xs text-muted">
                                    {m.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                          {p.caseStudy.techStack &&
                          p.caseStudy.techStack.length > 0 ? (
                            <div className="mt-5 flex flex-wrap gap-2">
                              {p.caseStudy.techStack.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-md bg-elevated px-2.5 py-1 font-mono text-[11px] text-muted"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                    {p.caseStudy ? (
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
                    ) : null}

                    {p.caseStudy ? (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : p.id)
                        }
                        data-cursor
                        aria-expanded={isExpanded}
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
                      >
                        {isExpanded ? "Less" : "Quick look"}
                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : null}

                    {(p.links ?? []).map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
                      >
                        {l.label}
                        <ArrowUpRight size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Media lightbox */}
      <AnimatePresence>
        {openProject ? (
          <Lightbox
            project={openProject}
            index={mediaIndex}
            onClose={() => setOpenId(null)}
            onIndex={setMediaIndex}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

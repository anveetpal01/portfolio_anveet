"use client";

import Image from "next/image";
import { Maximize2, Play } from "lucide-react";
import type { Project, ProjectCategory } from "@/lib/content";

/** Gradient + glyph shown when a project has no media yet (the honest
 *  early-stage state — looks deliberate, not broken). */
const categoryArt: Record<
  ProjectCategory,
  { gradient: string; glyph: string }
> = {
  Development: { gradient: "from-violet/40 via-background to-cyan/20", glyph: "{ }" },
  Design: { gradient: "from-pink/40 via-background to-violet/20", glyph: "✦" },
  Photography: { gradient: "from-accent/25 via-background to-violet/20", glyph: "◎" },
  Video: { gradient: "from-cyan/30 via-background to-pink/20", glyph: "▶" },
};

interface MediaThumbProps {
  project: Project;
  /** Featured cards span two columns and are taller. */
  isFeatured: boolean;
  /** First card above the fold → eager-load its image. */
  isFirst: boolean;
  /** Shows a hover affordance hinting the media opens in a lightbox. */
  interactive?: boolean;
}

export function MediaThumb({
  project,
  isFeatured,
  isFirst,
  interactive = false,
}: MediaThumbProps) {
  const art = categoryArt[project.category];
  const first = project.media?.[0];
  const thumbSrc =
    first?.type === "image"
      ? first.src
      : first?.type === "video"
        ? first.thumbnail
        : null;
  const aspect = isFeatured ? "aspect-[2/1]" : "aspect-[3/2]";

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${art.gradient} ${aspect}`}>
      {thumbSrc ? (
        <Image
          src={thumbSrc}
          alt={first?.alt || project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={75}
          // v16: use `preload`, not the deprecated `priority`.
          preload={isFirst || isFeatured}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="select-none font-mono text-7xl font-bold text-foreground/10 transition-transform duration-700 group-hover:scale-110 md:text-8xl">
            {art.glyph}
          </span>
        </div>
      )}

      {/* Faint grid overlay keeps it consistent with the rest of the site. */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />

      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur-md">
        {project.category}
      </span>
      <span className="absolute right-4 top-4 font-mono text-xs text-muted">
        {project.year}
      </span>

      {interactive && thumbSrc ? (
        <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-accent text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {first?.type === "video" ? (
            <Play size={18} fill="currentColor" />
          ) : (
            <Maximize2 size={18} />
          )}
        </span>
      ) : null}
    </div>
  );
}

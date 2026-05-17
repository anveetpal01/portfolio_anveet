"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import type { Project } from "@/lib/content";
import { Lightbox } from "@/components/work/Lightbox";

/**
 * The media gallery on a case-study page. Renders every photo/video as a
 * thumbnail; clicking one opens the shared Lightbox at that index. Renders
 * nothing when the project has no media yet.
 */
export function CaseStudyGallery({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const media = project.media ?? [];
  if (media.length === 0) return null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {media.map((m, i) => {
          const src = m.type === "image" ? m.src : m.thumbnail;
          return (
            <button
              key={src + i}
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              data-cursor
              aria-label={`Open ${m.alt || project.title}`}
              className="group relative aspect-[3/2] overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <Image
                src={src}
                alt={m.alt || project.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                quality={75}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {m.type === "video" ? (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-background">
                    <Play size={22} fill="currentColor" />
                  </span>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {open ? (
          <Lightbox
            project={project}
            index={index}
            onClose={() => setOpen(false)}
            onIndex={setIndex}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

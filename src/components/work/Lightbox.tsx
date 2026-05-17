"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/lib/content";
import { getEmbedUrl } from "@/lib/media";

interface LightboxProps {
  project: Project;
  index: number;
  onClose: () => void;
  onIndex: (next: number) => void;
}

/**
 * Accessible fullscreen media viewer. Photos render contained (no crop, works
 * for portrait & landscape); videos embed a privacy-friendly YouTube/Vimeo
 * player. Esc / backdrop close, ←/→ navigate a gallery, focus is trapped and
 * restored. Rendered only on the client inside the parent's AnimatePresence.
 */
export function Lightbox({ project, index, onClose, onIndex }: LightboxProps) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const media = project.media ?? [];
  const item = media[index];
  const count = media.length;
  const hasGallery = count > 1;

  const go = (dir: -1 | 1) => onIndex((index + dir + count) % count);

  // Lock body scroll while open — same approach as Navbar's mobile menu.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard: Esc closes, arrows navigate, Tab is trapped within the dialog.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && hasGallery) {
        go(1);
      } else if (e.key === "ArrowLeft" && hasGallery) {
        go(-1);
      } else if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], iframe, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
    // index/count are captured fresh each render via the closure above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count, hasGallery]);

  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col bg-background/95 backdrop-blur-2xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — media viewer`}
      initial={reduce ? { opacity: 0 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {project.title}
          {hasGallery ? ` · ${index + 1}/${count}` : ""}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          data-cursor
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-foreground transition-colors hover:border-foreground"
        >
          <X size={18} />
        </button>
      </div>

      {/* Stage — stop propagation so clicking the media doesn't close. */}
      <div
        ref={panelRef}
        className="relative flex flex-1 items-center justify-center px-4 pb-10 sm:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        {hasGallery ? (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            data-cursor
            className="absolute left-2 z-10 grid h-12 w-12 place-items-center rounded-full border border-line bg-background/50 text-foreground transition-colors hover:border-foreground sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>
        ) : null}

        <motion.div
          key={index}
          className="flex max-h-full w-full max-w-5xl items-center justify-center"
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {item.type === "image" ? (
            <div className="relative h-[72vh] w-full">
              <Image
                src={item.src}
                alt={item.alt || project.title}
                fill
                sizes="100vw"
                quality={90}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-line bg-black">
              <iframe
                src={getEmbedUrl(item)}
                title={item.alt || project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          )}
        </motion.div>

        {hasGallery ? (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            data-cursor
            className="absolute right-2 z-10 grid h-12 w-12 place-items-center rounded-full border border-line bg-background/50 text-foreground transition-colors hover:border-foreground sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        ) : null}
      </div>

      {item.alt ? (
        <p
          className="px-6 pb-6 text-center text-sm text-muted"
          onClick={(e) => e.stopPropagation()}
        >
          {item.alt}
        </p>
      ) : null}
    </motion.div>
  );
}

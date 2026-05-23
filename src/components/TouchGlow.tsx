"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The touch-device counterpart to the desktop custom cursor: on every tap or
 * swipe it flares a soft smoky "blink" in the logo accent colour
 * (var(--color-accent), #c8ff3d) at the touch point, then fades.
 *
 * Runs only on touch devices and never when the user asks for reduced motion.
 * Sits above every overlay (Lightbox, mobile menu) and is `pointer-events-none`
 * so it never blocks taps. Scroll spawning is intentionally disabled — it
 * caused jank on mid-range phones while adding little to the effect.
 */
interface Blip {
  id: number;
  x: number;
  y: number;
}

const MAX_BLIPS = 16;
const BLIP_MS = 820;

export default function TouchGlow() {
  const [enabled, setEnabled] = useState(false);
  const [blips, setBlips] = useState<Blip[]>([]);

  const idRef = useRef(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const lastMove = useRef(0);

  useEffect(() => {
    // Robust touch detection (works on real phones AND DevTools device mode,
    // where the hover/pointer media queries are unreliable).
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!isTouch || reduce.matches) return;

    setEnabled(true);

    const spawn = (x: number, y: number) => {
      lastPos.current = { x, y };
      const id = ++idRef.current;
      setBlips((prev) => {
        const next = [...prev, { id, x, y }];
        return next.length > MAX_BLIPS ? next.slice(next.length - MAX_BLIPS) : next;
      });
      window.setTimeout(() => {
        setBlips((prev) => prev.filter((b) => b.id !== id));
      }, BLIP_MS);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) spawn(t.clientX, t.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      if (now - lastMove.current < 90) return;
      const t = e.touches[0];
      if (!t) return;
      const p = lastPos.current;
      if (p && Math.hypot(t.clientX - p.x, t.clientY - p.y) < 24) return;
      lastMove.current = now;
      spawn(t.clientX, t.clientY);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2147483646] overflow-hidden"
    >
      <AnimatePresence>
        {blips.map((b) => {
          const size = 92;
          const driftX = (Math.random() - 0.5) * 14;
          const riseY = 22 + Math.random() * 20; // smoke drifts upward
          return (
            <motion.span
              key={b.id}
              className="absolute rounded-full"
              style={{
                left: b.x,
                top: b.y,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                // Accent #c8ff3d = rgb(200,255,61). Gradient does the heavy
                // lifting (soft alpha falloff = smoke edges) so the blur can
                // stay small. Hardcoded rgba for max mobile-browser support.
                background:
                  "radial-gradient(circle, rgba(200,255,61,0.5) 0%, rgba(200,255,61,0.14) 38%, rgba(200,255,61,0) 72%)",
                // Small blur — heavy blur + mix-blend-mode was the main cause
                // of GPU jank on mid-range phones.
                filter: "blur(9px)",
                willChange: "transform, opacity",
              }}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 0.38, x: driftX, y: -riseY }}
              exit={{ scale: 1.45, opacity: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

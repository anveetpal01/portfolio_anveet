"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The touch-device counterpart to the desktop custom cursor: on every tap it
 * flares a soft smoky "blink" in the logo accent colour
 * (var(--color-accent), #c8ff3d) at the touch point, then fades.
 *
 * Spawns on `touchstart` only — never on `touchmove`. Spawning during a drag
 * caused scroll-time chaos on phones (blips appearing erratically while the
 * page was also moving). Tap-only is the industry pattern for cursor-style
 * effects on touch devices.
 *
 * Runs only on touch devices and never when the user asks for reduced motion.
 * Sits above every overlay (Lightbox, mobile menu) and is `pointer-events-none`
 * so it never blocks taps.
 */
interface Blip {
  id: number;
  x: number;
  y: number;
}

const MAX_BLIPS = 6;
const BLIP_MS = 600;

export default function TouchGlow() {
  const [enabled, setEnabled] = useState(false);
  const [blips, setBlips] = useState<Blip[]>([]);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!isTouch || reduce.matches) return;

    setEnabled(true);

    let nextId = 0;
    const spawn = (x: number, y: number) => {
      const id = ++nextId;
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

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
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
          const size = 76;
          const driftX = (Math.random() - 0.5) * 14;
          const riseY = 22 + Math.random() * 20;
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
                // Soft alpha falloff in the radial gradient produces the smoke
                // edge — no `filter: blur()` needed, which keeps the mobile
                // compositor cost near zero. Accent #c8ff3d = rgb(200,255,61).
                background:
                  "radial-gradient(circle, rgba(200,255,61,0.5) 0%, rgba(200,255,61,0.14) 38%, rgba(200,255,61,0) 72%)",
              }}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 0.38, x: driftX, y: -riseY }}
              exit={{ scale: 1.45, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

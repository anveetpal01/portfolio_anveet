"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The touch-device counterpart to the desktop custom cursor: on every tap,
 * swipe or scroll it flares a soft smoky "blink" in the logo accent colour
 * (var(--color-accent), #c8ff3d) at the touch point, then fades.
 *
 * Runs only on coarse-pointer (touch) devices and never when the user asks
 * for reduced motion — desktop already has the cursor and is untouched.
 * It sits above every overlay (Lightbox, mobile menu) so it is consistent
 * everywhere, and is pointer-events-none so it never blocks taps or scroll.
 */
interface Blip {
  id: number;
  x: number;
  y: number;
  /** Scroll-spawned blips are softer (bigger, fainter). */
  soft: boolean;
}

const MAX_BLIPS = 14;
const BLIP_MS = 650;

export default function TouchGlow() {
  const [enabled, setEnabled] = useState(false);
  const [blips, setBlips] = useState<Blip[]>([]);

  const idRef = useRef(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const lastMove = useRef(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    // Robust touch detection (works on real phones AND DevTools device mode,
    // where the hover/pointer media queries are unreliable).
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!isTouch || reduce.matches) return;

    setEnabled(true);

    const spawn = (x: number, y: number, soft: boolean) => {
      lastPos.current = { x, y };
      const id = ++idRef.current;
      setBlips((prev) => {
        const next = [...prev, { id, x, y, soft }];
        return next.length > MAX_BLIPS ? next.slice(next.length - MAX_BLIPS) : next;
      });
      window.setTimeout(() => {
        setBlips((prev) => prev.filter((b) => b.id !== id));
      }, BLIP_MS);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) spawn(t.clientX, t.clientY, false);
    };

    const onTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      if (now - lastMove.current < 90) return;
      const t = e.touches[0];
      if (!t) return;
      const p = lastPos.current;
      if (p && Math.hypot(t.clientX - p.x, t.clientY - p.y) < 24) return;
      lastMove.current = now;
      spawn(t.clientX, t.clientY, false);
    };

    const onScroll = () => {
      const now = performance.now();
      if (now - lastScroll.current < 120) return;
      lastScroll.current = now;
      const p = lastPos.current ?? {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      spawn(p.x, p.y, true);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
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
          const size = b.soft ? 220 : 150;
          const drift = (Math.random() - 0.5) * 26;
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
                // Accent #c8ff3d = rgb(200,255,61). Hardcoded rgba (not
                // color-mix / CSS var) so it renders on every mobile browser.
                background:
                  "radial-gradient(circle, rgba(200,255,61,0.75) 0%, rgba(200,255,61,0.25) 45%, rgba(200,255,61,0) 70%)",
                filter: `blur(${b.soft ? 26 : 18}px)`,
                mixBlendMode: "screen",
                willChange: "transform, opacity",
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: b.soft ? 1.35 : 1.5,
                opacity: b.soft ? 0.32 : 0.55,
                x: drift,
                y: -Math.abs(drift),
              }}
              exit={{ scale: 1.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

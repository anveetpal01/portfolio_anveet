"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A glowing custom cursor: a sharp accent dot plus a soft trailing ring that
 * expands over interactive elements. Renders only on devices with a fine
 * pointer and when the user hasn't requested reduced motion — touch users
 * keep the native cursor.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dot = { stiffness: 1200, damping: 60, mass: 0.3 };
  const ring = { stiffness: 220, damping: 26, mass: 0.6 };

  const dotX = useSpring(x, dot);
  const dotY = useSpring(y, dot);
  const ringX = useSpring(x, ring);
  const ringY = useSpring(y, ring);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("a, button, [data-cursor]")));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.span
          className="block rounded-full border border-accent/60"
          animate={{
            width: active ? 70 : 36,
            height: active ? 70 : 36,
            opacity: active ? 1 : 0.5,
            marginLeft: active ? -35 : -18,
            marginTop: active ? -35 : -18,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70]"
        style={{ x: dotX, y: dotY }}
      >
        <span className="-ml-[3px] -mt-[3px] block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_var(--color-accent)]" />
      </motion.div>
    </>
  );
}

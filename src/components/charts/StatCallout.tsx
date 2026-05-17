"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import type { Metric } from "@/lib/content";

/**
 * A single big-number metric. The leading numeric part counts up when scrolled
 * into view; any prefix/suffix (%, ms, B/day, −, …) is preserved verbatim.
 * Non-numeric values (e.g. "Open") and reduced-motion users render instantly.
 */
export function StatCallout({ metric }: { metric: Metric }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);

  // Split "98.4%" → ["98.4", "%"], "−64%" → ["−64", "%"], "Open" → [null,…].
  const match = metric.value.match(/^([+-−]?[\d.,]+)(.*)$/);
  const target = match ? parseFloat(match[1].replace(/[,−]/g, (c) => (c === "−" ? "-" : ""))) : null;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = match ? match[2] : "";
  const negative = match ? /^[-−]/.test(match[1]) : false;

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    if (reduce || !inView) {
      if (reduce) el.textContent = metric.value;
      return;
    }

    const controls = animate(mv, Math.abs(target), {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${negative ? "−" : ""}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, target, decimals, suffix, negative, metric.value, mv]);

  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <span
        ref={ref}
        className="block font-mono text-4xl font-semibold tracking-tight text-accent md:text-5xl"
      >
        {/* Server / pre-animation render shows the final value (no flash). */}
        {target === null || reduce ? metric.value : `${negative ? "−" : ""}0${suffix}`}
      </span>
      <span className="mt-3 block text-sm font-medium text-foreground">
        {metric.label}
      </span>
      {metric.delta ? (
        <span className="mt-1 block font-mono text-xs text-muted">
          {metric.delta}
        </span>
      ) : null}
    </div>
  );
}

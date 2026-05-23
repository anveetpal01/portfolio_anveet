"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * On-brand "calibration meter" — the proficiency scale.
 * Not a generic 5-star or progress bar: a segmented VU-meter-style readout
 * with brackets, numeric value, and an honest band label. Ticks light up
 * sequentially when scrolled into view (instant under reduced motion).
 */

const BANDS: { max: number; label: string }[] = [
  { max: 0.2, label: "Tinkered" },
  { max: 0.4, label: "Shipped" },
  { max: 0.6, label: "Comfortable" },
  { max: 0.8, label: "Proficient" },
  { max: 1.0, label: "Fluent" },
];

function bandFor(v: number) {
  return BANDS.find((b) => v <= b.max) ?? BANDS[BANDS.length - 1];
}

const TICKS = 20;

export function Calibration({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const v = Math.max(0, Math.min(1, value));
  const litCount = Math.round(v * TICKS);
  const band = bandFor(v);

  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      {/* Top row: numeric readout + band label */}
      <div className="mb-4 flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.2em]">
        <span className="text-muted">Self-assessed proficiency</span>
        <span>
          <span className="text-accent">{v.toFixed(2)}</span>
          <span className="text-faint"> / 1.00</span>
        </span>
      </div>

      {/* Bracketed segmented meter */}
      <div className="flex items-center gap-3 font-mono text-accent">
        <span aria-hidden className="text-lg text-faint">
          [
        </span>
        <div
          className="flex flex-1 items-center gap-[3px]"
          role="meter"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={Number(v.toFixed(2))}
          aria-label={`Proficiency: ${band.label}, ${v.toFixed(2)} out of 1`}
        >
          {Array.from({ length: TICKS }).map((_, i) => {
            const lit = i < litCount;
            const isPeak = i === litCount - 1;
            return (
              <motion.span
                key={i}
                className={`h-7 flex-1 rounded-[2px] ${
                  lit ? "bg-accent" : "bg-line"
                }`}
                style={
                  isPeak
                    ? { boxShadow: "0 0 10px 1px var(--color-accent)" }
                    : undefined
                }
                initial={reduce ? false : { opacity: 0, scaleY: 0.4 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.22,
                  delay: reduce ? 0 : i * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          })}
        </div>
        <span aria-hidden className="text-lg text-faint">
          ]
        </span>
      </div>

      {/* Bottom row: band label + scale legend */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span>
          <span className="text-muted">Status: </span>
          <span className="text-foreground">{band.label}</span>
        </span>
        <span className="text-faint">Tinkered · Shipped · Comfortable · Proficient · Fluent</span>
      </div>
    </div>
  );
}

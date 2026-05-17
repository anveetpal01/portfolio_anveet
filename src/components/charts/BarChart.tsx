"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ChartData } from "@/lib/content";

/**
 * Dependency-free responsive SVG bar chart. Bars grow in when scrolled into
 * view (instant under reduced motion). Accessible via role="img" + a <title>.
 */
export function BarChart({ data }: { data: ChartData }) {
  const reduce = useReducedMotion();
  const series = data.series.filter((s) => Number.isFinite(s.value));
  if (series.length === 0) return null;

  const W = 640;
  const H = 280;
  const padX = 16;
  const padTop = 28;
  const padBottom = 44;
  const max = Math.max(...series.map((s) => s.value), 1);
  const slot = (W - padX * 2) / series.length;
  const barW = Math.min(slot * 0.55, 84);
  const chartH = H - padTop - padBottom;

  return (
    <figure className="rounded-2xl border border-line bg-surface p-6">
      <figcaption className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {data.title}
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Bar chart: ${data.title}. ${series
          .map((s) => `${s.label}: ${s.value}${data.unit ?? ""}`)
          .join(", ")}`}
      >
        <title>{data.title}</title>
        {/* baseline */}
        <line
          x1={padX}
          y1={padTop + chartH}
          x2={W - padX}
          y2={padTop + chartH}
          stroke="var(--color-line)"
          strokeWidth={1}
        />
        {series.map((s, i) => {
          const h = (s.value / max) * chartH;
          const x = padX + i * slot + (slot - barW) / 2;
          const y = padTop + chartH - h;
          return (
            <g key={s.label}>
              <motion.rect
                x={x}
                width={barW}
                rx={6}
                fill="var(--color-accent)"
                initial={reduce ? false : { height: 0, y: padTop + chartH }}
                whileInView={{ height: h, y }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: reduce ? 0 : i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                {...(reduce ? { height: h, y } : {})}
              />
              <text
                x={x + barW / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-foreground font-mono text-[13px]"
              >
                {s.value}
                {data.unit ?? ""}
              </text>
              <text
                x={x + barW / 2}
                y={padTop + chartH + 24}
                textAnchor="middle"
                className="fill-muted font-mono text-[12px]"
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

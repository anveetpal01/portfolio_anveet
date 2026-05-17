"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ChartData } from "@/lib/content";

/**
 * Dependency-free responsive SVG line chart — ideal for training curves
 * (accuracy/loss over epochs), trends, benchmarks. The line draws itself in
 * when scrolled into view (instant under reduced motion).
 */
export function LineChart({ data }: { data: ChartData }) {
  const reduce = useReducedMotion();
  const series = data.series.filter((s) => Number.isFinite(s.value));
  if (series.length < 2) return null;

  const W = 640;
  const H = 280;
  const padX = 40;
  const padTop = 24;
  const padBottom = 40;
  const max = Math.max(...series.map((s) => s.value));
  const min = Math.min(...series.map((s) => s.value));
  const span = max - min || 1;
  const chartH = H - padTop - padBottom;
  const stepX = (W - padX * 2) / (series.length - 1);

  const pts = series.map((s, i) => {
    const x = padX + i * stepX;
    const y = padTop + chartH - ((s.value - min) / span) * chartH;
    return { x, y, ...s };
  });

  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${path} L ${pts[pts.length - 1].x} ${padTop + chartH} L ${pts[0].x} ${padTop + chartH} Z`;

  return (
    <figure className="rounded-2xl border border-line bg-surface p-6">
      <figcaption className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {data.title}
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Line chart: ${data.title}. ${series
          .map((s) => `${s.label}: ${s.value}${data.unit ?? ""}`)
          .join(", ")}`}
      >
        <title>{data.title}</title>
        {/* y bounds */}
        <text x={4} y={padTop + 4} className="fill-faint font-mono text-[11px]">
          {max}
          {data.unit ?? ""}
        </text>
        <text
          x={4}
          y={padTop + chartH}
          className="fill-faint font-mono text-[11px]"
        >
          {min}
          {data.unit ?? ""}
        </text>
        <line
          x1={padX}
          y1={padTop + chartH}
          x2={W - padX}
          y2={padTop + chartH}
          stroke="var(--color-line)"
          strokeWidth={1}
        />
        <path d={area} fill="var(--color-accent)" fillOpacity={0.08} />
        <motion.path
          d={path}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {pts.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r={3.5} fill="var(--color-accent)" />
            <text
              x={p.x}
              y={padTop + chartH + 24}
              textAnchor="middle"
              className="fill-muted font-mono text-[12px]"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

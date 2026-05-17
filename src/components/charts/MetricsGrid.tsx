import type { ChartData, Metric } from "@/lib/content";
import { StatCallout } from "./StatCallout";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";

/**
 * Lays out a project's numbers: metric callouts in a responsive grid, then
 * each chart. Renders nothing at all when there's no data — so an early-stage
 * project simply doesn't show an empty "Results" block.
 */
export function MetricsGrid({
  metrics,
  charts,
}: {
  metrics?: Metric[];
  charts?: ChartData[];
}) {
  const hasMetrics = (metrics?.length ?? 0) > 0;
  const hasCharts = (charts?.length ?? 0) > 0;
  if (!hasMetrics && !hasCharts) return null;

  return (
    <div className="space-y-8">
      {hasMetrics ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics!.map((m) => (
            <StatCallout key={m.label} metric={m} />
          ))}
        </div>
      ) : null}

      {hasCharts ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {charts!.map((c) =>
            c.kind === "line" ? (
              <LineChart key={c.title} data={c} />
            ) : (
              <BarChart key={c.title} data={c} />
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}

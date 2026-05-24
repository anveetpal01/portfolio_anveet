import type { ReactNode } from "react";

/**
 * Themed table block — header in bg-surface + mono kicker; body cells in
 * muted prose. Wrapped in overflow-x-auto so wide tables scroll inside the
 * card on mobile instead of breaking page layout.
 */
export function PrepTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-surface font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border-b border-line px-4 py-3 font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border-b border-line px-4 py-3 align-top text-muted last:border-b-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

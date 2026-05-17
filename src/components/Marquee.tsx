import { marqueeSkills } from "@/lib/content";

/**
 * Full-bleed infinite scrolling band. Pure CSS animation (no JS) — the list is
 * duplicated and translated -50% so the loop is seamless. Honors
 * prefers-reduced-motion via the global stylesheet.
 */
export default function Marquee() {
  const row = [...marqueeSkills, ...marqueeSkills];

  return (
    <div className="mask-fade-x relative flex flex-col gap-3 overflow-hidden border-y border-line bg-surface py-10">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap pr-8">
        {row.map((skill, i) => (
          <span key={`a-${i}`} className="flex items-center gap-8">
            <span className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {skill}
            </span>
            <span className="text-2xl text-accent sm:text-3xl md:text-4xl">✦</span>
          </span>
        ))}
      </div>

      <div className="flex w-max animate-marquee-rev gap-8 whitespace-nowrap pr-8">
        {row.map((skill, i) => (
          <span key={`b-${i}`} className="flex items-center gap-8">
            <span className="text-4xl font-semibold tracking-tight text-stroke sm:text-5xl md:text-6xl">
              {skill}
            </span>
            <span className="text-2xl text-muted sm:text-3xl md:text-4xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

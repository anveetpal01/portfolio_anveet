import { ArrowUp } from "lucide-react";
import { navLinks, personal, socials } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#top"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              {personal.firstName}
              <span className="text-accent">.</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {personal.tagline}
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="mt-5 inline-block font-mono text-sm text-foreground transition-colors hover:text-accent"
            >
              {personal.email}
            </a>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
                Navigate
              </div>
              <ul className="mt-5 space-y-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
                Elsewhere
              </div>
              <ul className="mt-5 space-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-line pt-8">
          <p className="font-mono text-xs text-faint">
            © {year} {personal.firstName} {personal.lastName}. All rights
            reserved.
          </p>
          <a
            href="#top"
            data-cursor
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent">
              <ArrowUp size={14} />
            </span>
          </a>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        aria-hidden
        className="select-none px-6 pb-6 lg:px-10"
      >
        <div className="text-stroke text-[clamp(3rem,17vw,15rem)] font-bold leading-[0.8] tracking-tighter">
          {personal.lastName.toUpperCase()}
        </div>
      </div>
    </footer>
  );
}

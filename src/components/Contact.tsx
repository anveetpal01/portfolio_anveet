"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { personal, socials } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio enquiry from ${form.name || "someone"}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const fieldClass =
    "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-foreground placeholder:text-faint outline-none transition-colors duration-200 focus:border-accent";

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 md:py-36 lg:px-10"
    >
      <SectionHeading
        index="05"
        kicker="Contact"
        title="Let's make something worth remembering."
        description="Have a project, a role, or a wild idea? I'm always up for a good conversation."
      />

      <div className="grid gap-14 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={update("name")}
                  className={fieldClass}
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={update("email")}
                  className={fieldClass}
                />
              </div>
              <textarea
                required
                rows={5}
                placeholder="Tell me about it…"
                value={form.message}
                onChange={update("message")}
                className={`${fieldClass} resize-none`}
              />
              <button
                type="submit"
                data-cursor
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 font-semibold text-background transition-transform duration-200 hover:scale-[1.01] sm:w-auto sm:px-10"
              >
                {sent ? "Opening your mail app…" : "Send message"}
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
              {sent && (
                <p className="font-mono text-xs text-muted">
                  If nothing opened, email me directly at{" "}
                  <span className="text-accent">{personal.email}</span>
                </p>
              )}
            </form>
          </Reveal>
        </div>

        {/* Details */}
        <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-14">
          <Reveal delay={0.12}>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-faint">
              Email
            </div>
            <a
              href={`mailto:${personal.email}`}
              className="group mt-3 block break-all text-xl font-medium text-foreground transition-colors hover:text-accent md:text-2xl"
            >
              {personal.email}
            </a>

            <div className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-faint">
              Based in
            </div>
            <div className="mt-3 text-xl text-foreground">
              {personal.location}
            </div>

            <div className="mt-10 font-mono text-xs uppercase tracking-[0.25em] text-faint">
              Elsewhere
            </div>
            <ul className="mt-4 flex flex-col">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-line py-4 text-lg text-foreground transition-colors hover:text-accent"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={18}
                      className="text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

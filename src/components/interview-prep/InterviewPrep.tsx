import { Quote } from "lucide-react";
import type { InterviewPrep as Data } from "@/lib/content";
import { PrepHeading } from "./PrepHeading";
import { PrepCode } from "./PrepCode";
import { PrepTable } from "./PrepTable";
import { PrepAccordion } from "./PrepAccordion";

/**
 * The orchestrator. Takes structured InterviewPrep data and renders each
 * subsection conditionally with on-brand themed components. Server-rendered;
 * accordions use native <details> so the page is fully usable without JS.
 */
export function InterviewPrep({ data }: { data: Data }) {
  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  return (
    <div className="space-y-14">
      {data.headline ? (
        <section>
          <PrepHeading index={next()} kicker="The one-line headline" title="If you only remember one line" />
          <blockquote className="rounded-2xl border border-line bg-surface px-6 py-6 text-lg leading-relaxed text-foreground md:text-xl">
            <Quote
              size={20}
              className="mb-3 inline-block text-accent"
              aria-hidden
            />
            <div>{data.headline}</div>
          </blockquote>
        </section>
      ) : null}

      {data.pitches && data.pitches.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Elevator pitches" title="Three durations, one story" />
          <div className="space-y-4">
            {data.pitches.map((p) => (
              <div
                key={p.duration}
                className="relative rounded-2xl border border-line bg-surface p-6"
              >
                <span className="absolute right-5 top-5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {p.duration}
                </span>
                <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted md:text-[17px]">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.motivation && data.motivation.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Problem & motivation" title="Why this project" />
          <div className="grid gap-4 sm:grid-cols-2">
            {data.motivation.map((m) => (
              <div
                key={m.q}
                className="rounded-xl border border-line bg-surface p-5"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {m.q}
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {m.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.whatItDoes && data.whatItDoes.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="What the app does" title="The user flow, end-to-end" />
          <ol className="space-y-3 rounded-2xl border border-line bg-surface p-6">
            {data.whatItDoes.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-base leading-relaxed text-muted md:text-[17px]"
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 font-mono text-xs text-accent">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {data.architecture ? (
        <section>
          <PrepHeading index={next()} kicker="Architecture" title="The headline" />
          {data.architecture.ascii ? (
            <PrepCode code={data.architecture.ascii} lang="ascii" />
          ) : null}
          {data.architecture.body ? (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-[17px]">
              {data.architecture.body}
            </p>
          ) : null}
        </section>
      ) : null}

      {data.techStack && data.techStack.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Tech stack" title="What it's built with — and why" />
          <PrepTable
            headers={["Layer", "Tech", "Why"]}
            rows={data.techStack.map((r) => [
              <span key="l" className="font-mono text-foreground">
                {r.layer}
              </span>,
              <span key="t" className="font-mono text-accent">
                {r.tech}
              </span>,
              r.why,
            ])}
          />
        </section>
      ) : null}

      {data.patterns && data.patterns.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Design patterns" title="What to name-drop" />
          <div className="grid gap-4 sm:grid-cols-2">
            {data.patterns.map((p) => (
              <div
                key={p.name}
                className="rounded-xl border border-line bg-surface p-5"
              >
                <div className="font-mono text-sm font-semibold text-accent">
                  {p.name}
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.deepDives && data.deepDives.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Implementation deep-dives" title="What they'll grill you on" />
          <div className="space-y-3">
            {data.deepDives.map((d, i) => (
              <PrepAccordion
                key={i}
                summary={d.heading}
                open={d.open}
              >
                <p>{d.body}</p>
                {d.code ? <PrepCode code={d.code} lang={d.codeLang} /> : null}
              </PrepAccordion>
            ))}
          </div>
        </section>
      ) : null}

      {data.numbers && data.numbers.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Numbers worth remembering" title="The metrics they ask about" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.numbers.map((m) => (
              <div
                key={m.metric}
                className="rounded-xl border border-line bg-surface p-5"
              >
                <div className="font-mono text-2xl font-semibold text-accent md:text-3xl">
                  {m.value}
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {m.metric}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.tradeoffs && data.tradeoffs.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Trade-offs" title="What every senior interviewer probes" />
          <PrepTable
            headers={["Decision", "Why I chose it", "Alternative & why not"]}
            rows={data.tradeoffs.map((t) => [
              <span key="d" className="font-semibold text-foreground">
                {t.decision}
              </span>,
              t.chosen,
              t.alternative,
            ])}
          />
        </section>
      ) : null}

      {data.questions && data.questions.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Likely questions" title="Q&A — collapsed by default" />
          <div className="space-y-3">
            {data.questions.map((q, i) => (
              <PrepAccordion key={i} summary={q.q}>
                <p>{q.a}</p>
              </PrepAccordion>
            ))}
          </div>
        </section>
      ) : null}

      {data.stories && data.stories.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Stories ready to tell" title="Interviewers love these" />
          <div className="space-y-4">
            {data.stories.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-surface p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 font-mono text-xs text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      {s.title}
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {data.glossary && data.glossary.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Glossary" title="Terms to drop confidently" />
          <dl className="grid gap-x-6 gap-y-3 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-[max-content_1fr]">
            {data.glossary.map((g) => (
              <div key={g.term} className="contents">
                <dt className="font-mono text-sm text-foreground">{g.term}</dt>
                <dd className="text-sm leading-relaxed text-muted">
                  {g.meaning}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {data.files && data.files.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="Files cheatsheet" title="What lives where" />
          <PrepTable
            headers={["File", "LOC", "Role"]}
            rows={data.files.map((f) => [
              <span key="f" className="font-mono text-foreground">
                {f.file}
              </span>,
              <span key="l" className="font-mono text-accent">
                {f.loc}
              </span>,
              f.role,
            ])}
          />
        </section>
      ) : null}

      {data.whiteboard ? (
        <section>
          <PrepHeading index={next()} kicker="Whiteboard map" title="If you had to draw it" />
          <PrepCode code={data.whiteboard} lang="ascii" />
        </section>
      ) : null}

      {data.oneLiners && data.oneLiners.length > 0 ? (
        <section>
          <PrepHeading index={next()} kicker="One-liners" title="Drop these in interviews" />
          <ul className="space-y-3">
            {data.oneLiners.map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4"
              >
                <Quote
                  size={16}
                  aria-hidden
                  className="mt-1 shrink-0 text-accent"
                />
                <span className="text-base italic leading-relaxed text-foreground/90 md:text-[17px]">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {data.sources && data.sources.length > 0 ? (
        <section className="border-t border-line pt-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
            Sources
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {data.sources.map((src) => {
              let host = src;
              try {
                host = new URL(src).hostname.replace(/^www\./, "");
              } catch {
                /* not a URL */
              }
              return (
                <li key={src}>
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="font-mono text-xs text-muted transition-colors hover:text-accent"
                  >
                    {host}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

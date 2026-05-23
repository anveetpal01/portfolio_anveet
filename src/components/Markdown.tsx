import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Dark-theme styled Markdown renderer for case-study deep-dives.
 * Server-component friendly (pure React, no browser APIs). GFM enables tables,
 * strikethrough and task lists. Tables and code blocks scroll horizontally
 * inside their own container so they never break mobile layout.
 *
 * Styling matches the site tokens (accent, line, surface, elevated, font-mono)
 * defined in globals.css — no @tailwindcss/typography dependency.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="mt-14 mb-5 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-10 mb-4 text-lg font-semibold tracking-tight text-foreground md:text-xl">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="my-4 text-base leading-relaxed text-muted md:text-[17px]">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="my-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted marker:text-accent md:text-[17px]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted marker:text-accent md:text-[17px]">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="pl-1">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => <em className="text-foreground/90">{children}</em>,
        hr: () => <hr className="my-12 border-line" />,
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-2 border-accent bg-surface/50 px-5 py-3 text-muted">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          // Block code (inside <pre>) gets a className like "language-python";
          // inline code has no className. Style them differently.
          const isBlock = (className ?? "").startsWith("language-");
          if (isBlock) {
            return (
              <code className={`${className} font-mono text-sm text-foreground`}>
                {children}
              </code>
            );
          }
          return (
            <code className="rounded bg-elevated px-1.5 py-0.5 font-mono text-[0.9em] text-accent">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="my-6 overflow-x-auto rounded-xl border border-line bg-elevated p-5 text-sm leading-relaxed">
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto rounded-xl border border-line">
            <table className="w-full border-collapse text-left text-sm">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-surface font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th className="border-b border-line px-4 py-3 font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-line px-4 py-3 align-top text-muted last:border-b-0">
            {children}
          </td>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

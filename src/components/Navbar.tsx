"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a
            href="/"
            className="group flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md bg-accent font-mono text-base font-bold text-background transition-transform duration-300 group-hover:rotate-[-8deg]">
              {personal.firstName[0]}
            </span>
            <span className="text-foreground">
              {personal.firstName}
              <span className="text-accent">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/#contact"
            className="hidden rounded-full border border-line px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent md:inline-block"
          >
            Let&apos;s talk
          </a>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="text-foreground md:hidden"
          >
            <Menu size={26} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                Menu
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-foreground"
              >
                <X size={26} />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-4 px-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-5xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="border-t border-line px-8 py-8">
              <a
                href={`mailto:${personal.email}`}
                className="font-mono text-sm text-muted"
              >
                {personal.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

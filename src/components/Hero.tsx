"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { personal, stats } from "@/lib/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

function Blob({ className }: { className: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[60px] md:blur-[110px] ${className}`}
    />
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % personal.roles.length),
      2400,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <Blob className="left-[-10%] top-[-10%] h-[42rem] w-[42rem] bg-violet/25 animate-float" />
      <Blob className="right-[-12%] top-[12%] h-[34rem] w-[34rem] bg-accent/15 animate-pulse-slow" />
      <Blob className="bottom-[-18%] left-[28%] h-[36rem] w-[36rem] bg-pink/15 animate-float [animation-delay:-4s]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 lg:px-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.25em] text-muted"
          >
            {personal.available && (
              <span className="flex items-center gap-2 text-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for work
              </span>
            )}
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span>{personal.location}</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-8 text-[clamp(3.25rem,13vw,11.5rem)] font-semibold leading-[0.86] tracking-[-0.04em]"
          >
            <span className="block text-foreground">
              {personal.firstName}
            </span>
            <span className="block text-stroke">{personal.lastName}.</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-8 flex h-9 items-center gap-3 text-2xl font-medium sm:text-3xl"
          >
            <span className="text-accent">{"//"}</span>
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={reduce ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? undefined : { y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block text-foreground"
                >
                  {personal.roles[roleIndex].title}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.div
            variants={item}
            className="relative mt-8 min-h-[3.5rem] max-w-xl md:min-h-[4rem]"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={reduce ? false : { opacity: 0, filter: "blur(12px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={reduce ? undefined : { opacity: 0, filter: "blur(12px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "filter" }}
                className="text-base leading-relaxed text-muted md:text-lg"
              >
                {personal.roles[roleIndex].brief}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#work"
              className="group flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background"
            >
              View selected work
              <ArrowDownRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </MagneticButton>

            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent"
            >
              Get in touch
              <ArrowUpRight
                size={18}
                className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 border-t border-line bg-background/40 backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line px-6 sm:grid-cols-4 lg:px-10">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-6 first:pl-0">
              <div className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-28 right-6 z-10 hidden items-center gap-3 lg:flex lg:right-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-10 w-px bg-gradient-to-b from-accent to-transparent"
        />
      </div>
    </section>
  );
}

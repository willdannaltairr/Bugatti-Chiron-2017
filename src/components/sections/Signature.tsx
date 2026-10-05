"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { C_LINE, QUOTE } from "@/lib/data/car";

export default function Signature() {
  const host = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start end", "end start"],
  });

  // The C draws itself as the section passes through the viewport.
  const draw = useTransform(scrollYProgress, [0.18, 0.68], [1, 0]);

  return (
    <section
      id="signature"
      ref={host}
      className="relative overflow-hidden border-t border-ink-line bg-ink py-28 sm:py-36"
    >
      <div className="shell grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="kicker">{C_LINE.kicker}</p>
            <h2 className="mt-6 font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] text-bone">
              {C_LINE.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="prose-measure mt-10 space-y-6 text-base leading-relaxed text-mute">
              {C_LINE.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <figure className="mt-14 border-l-2 border-champagne/50 pl-6">
              <blockquote className="font-display text-2xl italic leading-snug text-bone/95 sm:text-3xl">
                “{QUOTE.text}”
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-mute">
                {QUOTE.attribution}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* The signature itself, drawn on scroll. */}
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 600 600"
            className="w-full max-w-[520px]"
            role="img"
            aria-label="The C-line, the signature stroke of the Bugatti Chiron"
          >
            <defs>
              <linearGradient id="c-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c8a86b" />
                <stop offset="55%" stopColor="#1b4fd8" />
                <stop offset="100%" stopColor="#c8a86b" />
              </linearGradient>
            </defs>

            {/* Construction arcs — the drawing-board grid behind the final line. */}
            <circle
              cx="300"
              cy="300"
              r="230"
              fill="none"
              stroke="#171d2b"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            <circle cx="300" cy="300" r="150" fill="none" stroke="#171d2b" strokeWidth="1" />
            <line x1="70" y1="300" x2="530" y2="300" stroke="#171d2b" strokeWidth="1" />
            <line x1="300" y1="70" x2="300" y2="530" stroke="#171d2b" strokeWidth="1" />

            <motion.path
              d="M 470 150 A 210 210 0 1 0 470 450"
              fill="none"
              stroke="url(#c-line)"
              strokeWidth="14"
              strokeLinecap="round"
              // Motion derives strokeDasharray/offset from pathLength itself, so
              // those must not also be set as attributes here.
              style={reduced ? { pathLength: 1 } : { pathLength: draw }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
            />
          </svg>

          <span className="absolute bottom-2 right-2 text-[0.62rem] uppercase tracking-[0.3em] text-mute/70">
            Signature C
          </span>
        </div>
      </div>
    </section>
  );
}
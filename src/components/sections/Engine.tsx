"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { ENGINE } from "@/lib/data/car";

export default function Engine() {
  const host = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start end", "end start"],
  });

  // The giant numeral drifts and counter-rotates behind the fact table.
  const ghostX = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const ghostRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section
      id="engine"
      ref={host}
      className="relative overflow-hidden border-t border-ink-line bg-ink py-28 sm:py-36"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-1/2 select-none font-display text-[26vw] leading-none text-bone/[0.035]"
        style={reduced ? undefined : { x: ghostX, rotate: ghostRotate }}
      >
        W16
      </motion.span>

      <div className="shell relative grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="kicker">{ENGINE.title}</p>
            <h2 className="mt-6 font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] text-bone">
              Sixteen cylinders, and nowhere to hide them
            </h2>
            <p className="prose-measure mt-8 text-base leading-relaxed text-mute">
              {ENGINE.lede}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8">
              {ENGINE.facts.map((fact) => (
                <div key={fact.k} className="border-t border-ink-line pt-4">
                  <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-mute">
                    {fact.k}
                  </dt>
                  <dd className="mt-2 text-sm leading-snug text-bone">{fact.v}</dd>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Section marker: the sixteen cylinders, as a bank of four banks of four. */}
        <Reveal delay={0.2} className="flex items-center justify-center">
          <div className="grid w-full max-w-md grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 16 }).map((_, index) => (
              <motion.div
                key={index}
                className="aspect-[3/4] rounded-[3px] border border-ink-line bg-gradient-to-b from-ink-raised to-ink"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: 0.05 * (index % 4) + 0.04 * Math.floor(index / 4),
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <span className="block h-1.5 w-1.5 rounded-full bg-champagne/50 m-2" />
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
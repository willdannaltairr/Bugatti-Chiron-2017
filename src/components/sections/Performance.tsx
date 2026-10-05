"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { PERFORMANCE } from "@/lib/data/car";

export default function Performance() {
  const host = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="performance"
      ref={host}
      className="relative border-t border-ink-line bg-ink-raised py-28 sm:py-36"
    >
      {/* Parallax plate: parallax is the depth cue, the photo is not the subject. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 -top-[10%] h-[120%]"
          style={reduced ? undefined : { y: imageY }}
        >
          <Image
            src="/images/chiron-01.jpg"
            alt="A Bugatti Chiron photographed outdoors, its bodywork reflecting the surroundings"
            fill
            sizes="100vw"
            className="object-cover opacity-[0.16] grayscale"
            priority={false}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-raised via-ink-raised/85 to-ink-raised" />
      </div>

      <div className="shell relative">
        <Reveal>
          <p className="kicker">Chapter Two</p>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] text-bone">
            Numbers that only exist because the engineering allowed it
          </h2>
        </Reveal>

        <dl className="mt-20 grid gap-x-10 gap-y-14 border-t border-ink-line pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {PERFORMANCE.map((spec, index) => (
            <Reveal key={spec.label} delay={index * 0.06}>
              <div className="group">
                <dt className="text-[0.68rem] uppercase tracking-[0.24em] text-champagne">
                  {spec.label}
                </dt>
                <dd className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-[clamp(3.25rem,7vw,5.5rem)] leading-none text-bone">
                    <Counter value={spec.value} decimals={spec.decimals} />
                  </span>
                  <span className="text-sm uppercase tracking-[0.18em] text-mute">{spec.unit}</span>
                </dd>
                <p className="mt-3 border-t border-ink-line pt-3 text-xs leading-relaxed text-mute">
                  {spec.note}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
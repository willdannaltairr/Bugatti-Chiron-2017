"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CarStage from "@/components/three/CarStage";
import { HERO } from "@/lib/data/car";

export default function Hero() {
  const host = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start start", "end start"],
  });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.92], [1, 0.25]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section id="top" ref={host} className="relative h-[100svh] min-h-[620px] w-full">
      <motion.div className="absolute inset-0" style={reduced ? undefined : { opacity: stageOpacity }}>
        <CarStage
          autoRotate
          notice="pill"
          scrollProgress={scrollYProgress}
          className="h-full w-full"
        />
      </motion.div>

      {/* Legibility scrim: the car is the subject, the type sits on top of it. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        className="shell relative z-10 flex h-full flex-col justify-center pt-[var(--header-h)]"
        style={reduced ? undefined : { opacity: copyOpacity, y: copyY }}
      >
        <motion.p
          className="kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          Molsheim · {HERO.year}
        </motion.p>

        <h1 className="mt-5 font-display text-[clamp(4rem,15vw,13rem)] leading-[0.82] tracking-[-0.03em] text-bone">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            {HERO.marque}
          </motion.span>
          <motion.span
            className="block text-champagne"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {HERO.model}
          </motion.span>
        </h1>

        <motion.div
          className="mt-10 flex flex-col gap-6 border-l border-ink-line pl-6 sm:flex-row sm:items-end sm:gap-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-display text-2xl italic text-bone/90 sm:text-3xl">
            {HERO.tagline}
          </p>
          <p className="prose-measure text-sm leading-relaxed text-mute sm:text-base">
            {HERO.subtitle}
          </p>
        </motion.div>
      </motion.div>

      <motion.a
        href="#signature"
        className="pointer-events-auto absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-mute transition-colors duration-200 hover:text-bone sm:flex"
        style={reduced ? undefined : { opacity: cueOpacity }}
      >
        <span className="text-[0.62rem] uppercase tracking-[0.32em]">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-ink-line">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-champagne"
            animate={reduced ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { CREDITS } from "@/lib/data/car";

export default function Gallery() {
  const host = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ["start end", "end start"],
  });
  // Counter-parallax: the plate on the left moves up as the caption moves down.
  const leftY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const [hero, second, third, detail] = CREDITS;

  return (
    <section
      id="gallery"
      ref={host}
      className="border-t border-ink-line bg-ink-raised py-28 sm:py-36"
    >
      <div className="shell">
        <Reveal>
          <p className="kicker">Chapter Four</p>
          <h2 className="mt-6 font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] text-bone">
            Seen from every angle
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <figure className="relative overflow-hidden rounded-[3px] border border-ink-line">
              <motion.div
                className="relative aspect-[4/3] w-full"
                style={reduced ? undefined : { y: leftY, scale: 1.08 }}
              >
                <Image
                  src={hero.file}
                  alt="A Bugatti Chiron in dark blue, photographed from the front three-quarter angle"
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <figcaption className="border-t border-ink-line bg-ink px-4 py-3 text-[0.68rem] leading-relaxed text-mute">
                {hero.credit}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-5 md:mt-20">
            <figure className="relative overflow-hidden rounded-[3px] border border-ink-line">
              <motion.div
                className="relative aspect-[4/3] w-full"
                style={reduced ? undefined : { y: rightY, scale: 1.08 }}
              >
                <Image
                  src={second.file}
                  alt="A computer rendering of a Bugatti Chiron seen from a low side angle"
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <figcaption className="border-t border-ink-line bg-ink px-4 py-3 text-[0.68rem] leading-relaxed text-mute">
                {second.credit}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-5">
            <figure className="relative overflow-hidden rounded-[3px] border border-ink-line">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={third.file}
                  alt="A computer rendering of a Bugatti Chiron showing the front quarter and headlights"
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-ink-line bg-ink px-4 py-3 text-[0.68rem] leading-relaxed text-mute">
                {third.credit}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.14} className="md:col-span-7">
            <figure className="relative overflow-hidden rounded-[3px] border border-ink-line">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={detail.file}
                  alt="Close-up of a Bugatti wheel rim and brake caliper"
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-ink-line bg-ink px-4 py-3 text-[0.68rem] leading-relaxed text-mute">
                {detail.credit}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
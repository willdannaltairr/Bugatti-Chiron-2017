"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/data/car";

/**
 * Hides the wordmark while the hero is still in view and reveals it once the
 * page has scrolled, so the opening frame carries only the car.
 */
export default function Nav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setCondensed(y > 90);
  });

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: condensed ? "rgba(5,7,12,0.82)" : "rgba(5,7,12,0)",
        borderBottomColor: condensed ? "rgba(23,29,43,1)" : "rgba(23,29,43,0)",
      }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <nav className="shell flex h-[76px] items-center justify-between gap-6">
        <a
          href="#top"
          className="flex items-baseline gap-2 text-bone transition-opacity duration-200 hover:opacity-70"
        >
          <span className="font-display text-2xl leading-none tracking-wide">Bugatti</span>
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne">
            Chiron
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.7rem] uppercase tracking-[0.22em] text-mute transition-colors duration-200 hover:text-bone"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#explore"
          className="hidden rounded-full border border-champagne/40 px-5 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-champagne transition-colors duration-200 hover:border-champagne hover:bg-champagne hover:text-ink lg:inline-block"
        >
          Explore 3D
        </a>
      </nav>
    </motion.header>
  );
}
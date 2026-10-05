"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Once true, the element stays put — used for things above the fold. */
  start?: boolean;
};

/**
 * Entrance only. The gate says: this is a first-visit, once-per-page moment, so
 * it gets a real animation. Nothing here runs on repeat interaction.
 */
export default function Reveal({ children, delay = 0, className = "", start = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      {...(start ? {} : {})}
    >
      {children}
    </motion.div>
  );
}

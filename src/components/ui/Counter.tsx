"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

type CounterProps = {
  value: number;
  decimals?: number;
  duration?: number;
};

/**
 * Counts up once, when the number scrolls into view. The running value lives in
 * a motion value rather than React state, so a fast scroll never queues a render
 * per frame — only the displayed string subscribes to it.
 */
export default function Counter({ value, decimals = 0, duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const progress = useMotionValue(0);

  const display = useTransform(progress, (p) =>
    (value * p).toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(progress, 1, { duration, ease: [0.23, 1, 0.32, 1] });
    return () => controls.stop();
  }, [inView, progress, duration]);

  return (
    <motion.span ref={ref} className="tnum">
      {display}
    </motion.span>
  );
}
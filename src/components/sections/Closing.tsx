import Reveal from "@/components/ui/Reveal";
import { PRODUCTION } from "@/lib/data/car";

export default function Closing() {
  return (
    <section className="border-t border-ink-line bg-ink py-28 sm:py-36">
      <div className="shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <Reveal>
          <p className="kicker">{PRODUCTION.kicker}</p>
          <h2 className="mt-6 font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] text-bone">
            {PRODUCTION.title}
          </h2>
          <p className="prose-measure mt-8 text-base leading-relaxed text-mute">
            {PRODUCTION.body}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col justify-end">
          <dl className="space-y-6">
            {PRODUCTION.stats.map((stat) => (
              <div
                key={stat.k}
                className="flex items-baseline justify-between gap-6 border-b border-ink-line pb-5"
              >
                <dt className="text-[0.66rem] uppercase tracking-[0.24em] text-mute">
                  {stat.k}
                </dt>
                <dd className="font-display text-2xl text-bone sm:text-3xl">{stat.v}</dd>
              </div>
            ))}
          </dl>

          <a
            href="#top"
            className="mt-10 inline-flex h-12 w-fit items-center gap-3 rounded-[3px] border border-champagne px-7 text-[0.7rem] uppercase tracking-[0.22em] text-champagne transition-colors duration-200 hover:bg-champagne hover:text-ink"
          >
            Back to the top
            <span aria-hidden>↑</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
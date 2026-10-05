import { CREDITS, NAV_LINKS } from "@/lib/data/car";

export default function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink pb-12 pt-20">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl leading-none text-bone">Bugatti Chiron</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
              An independent, non-commercial tribute. Not affiliated with, endorsed by,
              or connected to Bugatti Automobiles S.A.S.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <h2 className="text-[0.62rem] uppercase tracking-[0.24em] text-mute">Sections</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-mute transition-colors duration-200 hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Every image on this site carries a licence that requires this credit. */}
          <div className="md:col-span-4">
            <h2 className="text-[0.62rem] uppercase tracking-[0.24em] text-mute">Image credits</h2>
            <ul className="mt-4 space-y-2.5">
              {CREDITS.map((credit) => (
                <li key={credit.file} className="text-xs leading-relaxed text-mute/80">
                  {credit.credit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-line pt-6 text-xs text-mute/70 sm:flex-row sm:items-center sm:justify-between">
          <p>3D model provided by the project owner · rendered with Three.js</p>
          <p>Specifications for the 2017 Chiron</p>
        </div>
      </div>
    </footer>
  );
}
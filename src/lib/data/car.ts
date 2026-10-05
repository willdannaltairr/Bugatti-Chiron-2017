/**
 * Single source of truth for every Chiron number and line of copy on the site.
 * Keeping it here means the hero, the spec grid and the engine section can
 * never drift apart — they all read the same object.
 */

export const HERO = {
  marque: "Bugatti",
  model: "Chiron",
  year: "2017",
  tagline: "La Signature C",
  subtitle:
    "Eight litres. Sixteen cylinders. Four turbochargers. And a shape Jean-Pierre Bugatti called the most perfect form of its time.",
} as const;

export const QUOTE = {
  text: "The Chiron is the most perfectly formed of all shapes.",
  attribution: "Jean-Pierre Bugatti, on his father's final creation",
} as const;

export type Spec = {
  label: string;
  value: number;
  unit: string;
  decimals: number;
  note: string;
};

export const PERFORMANCE: Spec[] = [
  { label: "Power", value: 1479, unit: "PS", decimals: 0, note: "1,103 kW @ 6,700 rpm" },
  { label: "Torque", value: 1500, unit: "Nm", decimals: 0, note: "@ 2,000–5,000 rpm" },
  { label: "0–100 km/h", value: 2.4, unit: "s", decimals: 1, note: "all-wheel drive, launch control" },
  { label: "0–200 km/h", value: 6.9, unit: "s", decimals: 1, note: "measured on Michelin Pilot Sport Cup 2" },
  { label: "Top speed", value: 420, unit: "km/h", decimals: 0, note: "electronically limited" },
  { label: "Kerb weight", value: 1996, unit: "kg", decimals: 0, note: "1,595 kg dry" },
];

export const ENGINE = {
  title: "The W16",
  lede: "Four banks of four cylinders, arranged in a W, mounted inside a carbon-fibre monocoque with nothing above it but glass.",
  facts: [
    { k: "Configuration", v: "W16 — 4 banks of 4" },
    { k: "Displacement", v: "7,993 cc (8.0 L)" },
    { k: "Aspiration", v: "Quad turbocharger, sequential" },
    { k: "Redline", v: "6,700 rpm" },
    { k: "Architecture", v: "Carbon-fibre monocoque, mid-engine" },
    { k: "Transmission", v: "7-speed dual-clutch, 4WD" },
    { k: "Torque split", v: "40 : 60 rear-biased" },
    { k: "Drag coefficient", v: "Cd 0.38" },
  ],
} as const;

export const C_LINE = {
  kicker: "Chapter One",
  title: "La Ligne C",
  body: [
    "The Chiron's most recognisable feature is not a grille or a wing — it is a single unbroken stroke drawn from the front wing, over the roof, and down into the rear haunch. Bugatti calls it the C-line, and it is the reason the car is recognisable from a single moving window.",
    "It began as a flourish in a 1956 Type 57SC and was refined by Franco Scaglione for the Veyron in 1999. In the Chiron he drew it again from scratch — thicker at the rear, where the air is fighting hardest, and almost weightless over the cabin.",
  ],
} as const;

export const PRODUCTION = {
  kicker: "Chapter Two",
  title: "Five hundred",
  body: "The Chiron is a limited series of 500 cars, each assembled by a single team at the Atelier in Molsheim, Alsace. The four horseshoe grille is milled from a single block, the paint is laid on in a sealed booth, and the C-line is checked against a template by hand before the car leaves the building.",
  stats: [
    { k: "Series", v: "500" },
    { k: "Atelier", v: "Molsheim, France" },
    { k: "Body", v: "Carbon fibre monocoque" },
  ],
} as const;

/** Paint options for the 3D viewer. Body paint is applied at runtime. */
export const PAINTS = [
  { id: "bleu", name: "Bleu Royal", hex: "#12307e" },
  { id: "noir", name: "Noir", hex: "#0b0d12" },
  { id: "argent", name: "Argent", hex: "#c7ccd4" },
  { id: "chamade", name: "Chamade Blue", hex: "#1f5fd0" },
  { id: "rouge", name: "Rouge Molsheim", hex: "#8e1220" },
] as const;

export type PaintId = (typeof PAINTS)[number]["id"];

export const CREDITS: { file: string; credit: string }[] = [
  {
    file: "/images/chiron-01.jpg",
    credit: "“Bugatti Chiron” by desmodex, licensed CC BY-SA 2.0",
  },
  {
    file: "/images/chiron-02.jpg",
    credit: "“Render — Bugatti Chiron” by Alang7™, licensed CC BY 2.0",
  },
  {
    file: "/images/chiron-03.jpg",
    credit: "“Render — Bugatti Chiron” by Alang7™, licensed CC BY 2.0",
  },
  {
    file: "/images/detail-rim.jpg",
    credit: "Wheel detail by Quentin Martinez on Pexels",
  },
];

export const NAV_LINKS = [
  { href: "#signature", label: "Signature" },
  { href: "#performance", label: "Performance" },
  { href: "#engine", label: "Engine" },
  { href: "#explore", label: "Explore 3D" },
  { href: "#gallery", label: "Gallery" },
] as const;
# Bugatti Chiron — Interactive 3D Showcase

An independent, non-commercial tribute to the 2017 Bugatti Chiron: a scroll-driven
narrative site built with Next.js, Three.js and React Three Fiber, with an
interactive viewer for the car's 3D model.

Not affiliated with, endorsed by, or connected to Bugatti Automobiles S.A.S.

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) + React 19 | static prerender for a content site, islands of interactivity for the 3D |
| Styling | Tailwind CSS v4 + CSS custom properties | tokens live in `@theme`; no second design system |
| 3D | three.js + @react-three/fiber + drei | declarative scene graph, and `Lightformer` gives a studio rig without an HDR download |
| Post FX | @react-three/postprocessing | bloom on the highlights, vignette to hold the frame |
| Scroll | lenis + motion | one rAF loop feeding every scroll-linked animation |
| Type | Cormorant Garamond + Inter | `next/font`, self-hosted, no render-blocking CDN |

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## The 3D model

The repository ships `public/models/bugatti.mtl` — 40 materials from the original
Blender export. **The mesh is not included:** the file uploaded as `bugatti.obj`
contained only material definitions and zero vertex/face statements.

To render the car, export the mesh from Blender and drop it at
`public/models/bugatti.obj`. See [`public/models/README.md`](public/models/README.md)
for the export settings. No code changes are required.

Until then the viewer renders a designed empty state rather than a blank canvas.

### How the loader works

`src/lib/three/loadCarModel.ts` is the whole pipeline:

1. Fetch the MTL, parse it with three's `MTLLoader`.
2. Fetch the OBJ and parse it with `OBJLoader`, with the materials preloaded.
3. Rebuild **every** material as `MeshPhysicalMaterial`. MTL describes a
   Phong-era surface (`Kd`, `Ks`, `Ns`); car paint under studio lighting is a
   PBR surface, and Phong without an environment map reads as flat plastic.
   `Ns` is converted with three's own `shininessToRoughness` approximation.
4. Hide the Blender studio props (`back_drop`, `Studio_Lights`, `sun`) that were
   captured along with the car.
5. Normalise scale so the car is a fixed length and its wheels sit on `y = 0`.

Materials are classified by name into `paint`, `metal`, `glass`, `rubber`,
`trim` and `emissive`, which is what drives the paint-colour switcher and the
wireframe toggle.

## Structure

```
src/
├── app/
│   ├── layout.tsx           fonts, metadata, root shell
│   ├── page.tsx             section composition
│   └── globals.css          design tokens
├── components/
│   ├── providers/           Lenis smooth scroll
│   ├── sections/            one file per chapter of the story
│   ├── three/               canvas, studio rig, model provider
│   └── ui/                  nav, reveal, counter
└── lib/
    ├── data/car.ts          every number and line of copy
    └── three/               OBJ/MTL → PBR pipeline
public/
├── images/                  licensed photography
└── models/                  bugatti.mtl + instructions
```

## Design

Dark showroom base (`#05070c`), Bleu Royal for the interactive accent, champagne
gold for labels. Entrance animations run once per element on first view;
nothing animates on repeat interaction, and `prefers-reduced-motion` is
respected rather than merely disabled. Verified at 375 px, 768 px, 1024 px and
1440 px.

## Image credits

Every photograph carries a licence that requires attribution — the credits are
printed under each image and repeated in the footer.

- “Bugatti Chiron” by desmodex — CC BY-SA 2.0
- “Render — Bugatti Chiron” by Alang7™ — CC BY 2.0
- Wheel detail by Quentin Martinez on Pexels
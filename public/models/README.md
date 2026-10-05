# 3D assets

| File | Status | What it is |
| --- | --- | --- |
| `bugatti.mtl` | committed | 40 materials from the original Blender export of `bugatti.blend` |
| `bugatti.obj` | **not present** | the mesh itself |

## Why the mesh is missing

The file originally uploaded as `bugatti.obj` contained only MTL material
definitions — 400 lines of `newmtl` / `Kd` / `Ks` / `Ns` and not a single `v`
(vertex) or `f` (face) statement. It was the material library saved under an
`.obj` name, so there is no geometry to render.

Until the real mesh is added, the viewer shows a designed empty state instead
of a blank canvas.

## Adding the mesh

Export from Blender:

**File ▸ Export ▸ Wavefront (.obj)**

- ☑ **Export Normals**
- ☑ **Export Materials** (point it at `bugatti.mtl`)
- ☑ Forward axis `-Z`, Up axis `Y`
- Leave *Apply Modifiers* on so the shape is final

Save the result as `public/models/bugatti.obj` and reload the page. Nothing else
needs to change: `src/lib/three/loadCarModel.ts` reads the file, maps all 40
materials onto `MeshPhysicalMaterial`, hides the Blender studio props
(`back_drop`, `Studio_Lights`, `sun`), and normalises the scale so the car sits
on the ground at a fixed length.

The file is **not** committed — a mesh in this class runs to tens of megabytes.
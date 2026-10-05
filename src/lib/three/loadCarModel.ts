import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export const OBJ_URL = "/models/bugatti.obj";
export const MTL_URL = "/models/bugatti.mtl";

/** Target length in three.js units, so camera framing stays model-agnostic. */
const TARGET_LENGTH = 4.6;

export type MaterialRole = "paint" | "metal" | "glass" | "rubber" | "trim" | "emissive";

export type PaintableMaterial = THREE.MeshPhysicalMaterial & {
  userData: { role: MaterialRole };
};

export type CarState =
  | { status: "loading" }
  | { status: "missing"; reason: string }
  | {
      status: "ready";
      object: THREE.Group;
      all: PaintableMaterial[];
      paint: PaintableMaterial[];
      length: number;
    };

/**
 * MTL carries a Phong-era description (Kd, Ks, Ns). Metallic car paint under
 * studio lighting is a PBR surface, so every material is rebuilt as
 * MeshPhysicalMaterial rather than rendered with MTLLoader's Phong output —
 * without an env map, Phong reads as flat plastic.
 */
function roleFor(name: string, color: THREE.Color): MaterialRole {
  if (/glass|window|windshield|windscreen/i.test(name)) return "glass";
  if (/tyre|tire/i.test(name)) return "rubber";
  if (/engine|brake|break|disc|caliper|light|sun|lamp/i.test(name)) return "emissive";
  if (
    /alumin|steel|chrome|silver|polish|mirror|rim|exhaust|grill|nut|trim|vent|joint|reflect|holder/i.test(
      name,
    )
  )
    return "metal";
  if (/blue|navy|red|white|glossy|door_strip|curb|^none$/i.test(name)) return "paint";
  // Dark unlabelled surfaces are trim and plastic, not paint.
  return color.getHSL({ h: 0, s: 0, l: 0 }).l < 0.18 ? "trim" : "paint";
}

function shininessToRoughness(shininess: number): number {
  // three.js' own Phong→PBR approximation; Ns 96 lands near 0.14 (glossy paint).
  return THREE.MathUtils.clamp(Math.sqrt(2 / (shininess + 2)), 0.04, 1);
}

function toPhysical(name: string, source: THREE.MeshPhongMaterial): PaintableMaterial {
  const role = roleFor(name, source.color);
  const roughness = shininessToRoughness(source.shininess ?? 30);

  const material = new THREE.MeshPhysicalMaterial({
    name: source.name || name,
    color: source.color.clone(),
    // MTL has no metalness. Glossy greys are chrome; saturated colours are flake paint.
    metalness: role === "metal" ? 1 : role === "paint" ? 0.55 : 0.1,
    roughness:
      role === "rubber"
        ? 0.92
        : role === "glass"
          ? 0.05
          : role === "paint"
            ? Math.min(roughness, 0.32)
            : roughness,
    clearcoat: role === "paint" ? 1 : 0,
    clearcoatRoughness: 0.04,
    side: THREE.FrontSide,
    envMapIntensity: role === "glass" ? 1.6 : 1.15,
  }) as PaintableMaterial;

  if (role === "glass") {
    material.transparent = true;
    material.opacity = source.opacity < 1 ? source.opacity : 0.32;
    material.ior = 1.52;
    material.metalness = 0;
  }

  if (source.emissive && source.emissive.getHex() !== 0x000000) {
    material.emissive = source.emissive.clone();
    material.emissiveIntensity = 0.6;
  }

  material.userData.role = role;
  return material;
}

/**
 * Objects belonging to the Blender studio rather than the car. The MTL carries
 * `back_drop`, `Studio_Lights` and `sun` from the capture scene, which would
 * otherwise appear floating around the model.
 */
const STUDIO_PROP = /back_drop|studio_light|^sun$|^world$/i;

function isStudioProp(object: THREE.Object3D): boolean {
  const mesh = object as THREE.Mesh;
  const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
  const first = Array.isArray(material) ? material[0] : material;
  return !!first && STUDIO_PROP.test(first.name ?? "");
}

async function fetchWithOk(url: string): Promise<Response> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

/**
 * Loads bugatti.obj together with bugatti.mtl, converts every MTL material to
 * PBR, then normalises scale so the object sits centred on the origin with its
 * wheels on y = 0.
 *
 * Returns `missing` instead of throwing when the mesh cannot be read, so the
 * page degrades to a designed empty state rather than a blank canvas.
 */
export async function loadCarModel(): Promise<CarState> {
  let mtlText: string;
  try {
    mtlText = await (await fetchWithOk(MTL_URL)).text();
  } catch (error) {
    return {
      status: "missing",
      reason: `Material library could not be read — ${(error as Error).message}`,
    };
  }

  const mtlLoader = new MTLLoader();
  let object: THREE.Group;

  try {
    const materials = mtlLoader.parse(mtlText, "");
    materials.preload();

    let objText: string;
    try {
      objText = await (await fetchWithOk(OBJ_URL)).text();
    } catch (error) {
      return {
        status: "missing",
        reason: `Mesh not found at ${OBJ_URL} — ${(error as Error).message}`,
      };
    }

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    object = objLoader.parse(objText);
  } catch (error) {
    return {
      status: "missing",
      reason: `Could not parse the model — ${(error as Error).message}`,
    };
  }

  const converted: PaintableMaterial[] = [];
  const paint: PaintableMaterial[] = [];

  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;

    if (isStudioProp(mesh)) {
      mesh.visible = false;
      return;
    }

    const source = mesh.material as THREE.MeshPhongMaterial;
    const physical = toPhysical(source.name || mesh.name || "material", source);
    mesh.material = physical;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    converted.push(physical);
    if (physical.userData.role === "paint") paint.push(physical);
  });

  if (converted.length === 0) {
    return {
      status: "missing",
      reason:
        "bugatti.obj parsed but contains no faces. The uploaded file was the material library only — re-export the mesh from Blender with File ▸ Export ▸ Wavefront, checking “Export Normals” and “Export Materials”.",
    };
  }

  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size);
  const scale = TARGET_LENGTH / (Math.max(size.x, size.y, size.z) || 1);

  // Scale first, then re-measure, so the ground offset is in final units.
  object.scale.setScalar(scale);
  object.updateMatrixWorld(true);

  const scaledBox = new THREE.Box3().setFromObject(object);
  const centre = scaledBox.getCenter(new THREE.Vector3());

  const wrapper = new THREE.Group();
  wrapper.add(object);
  wrapper.position.set(-centre.x, -scaledBox.min.y, -centre.z);

  return { status: "ready", object: wrapper, all: converted, paint, length: TARGET_LENGTH };
}

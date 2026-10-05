"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * A photographic softbox rig, built in-engine instead of loaded from an HDR.
 * That keeps the page free of a runtime CDN fetch, and lets the reflection in
 * the clearcoat read as long rectangular highlights — the shape that makes car
 * paint look like car paint rather than plastic.
 */
export default function StudioEnvironment() {
  return (
    <Environment resolution={256} frames={1}>
      {/* Key light: the long ceiling strip that draws the roof line. */}
      <Lightformer
        form="rect"
        intensity={4}
        position={[0, 5, -2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[16, 3, 1]}
        color="#ffffff"
      />
      {/* Two side strips — the pair that reveals curvature along the flanks. */}
      <Lightformer
        form="rect"
        intensity={2.4}
        position={[-6, 1.6, 1]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[9, 2, 1]}
        color="#cfe0ff"
      />
      <Lightformer
        form="rect"
        intensity={2.4}
        position={[6, 1.6, 1]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[9, 2, 1]}
        color="#cfe0ff"
      />
      {/* Low warm bounce, so the shadow side never goes dead flat. */}
      <Lightformer
        form="rect"
        intensity={1.1}
        position={[0, -1.5, 5]}
        rotation={[-Math.PI / 4, 0, 0]}
        scale={[10, 2, 1]}
        color="#c8a86b"
      />
      {/* Rim light behind the car, for the edge separation against black. */}
      <Lightformer
        form="ring"
        intensity={3}
        position={[0, 2, -7]}
        scale={[3, 3, 1]}
        color="#8fb4ff"
      />
    </Environment>
  );
}
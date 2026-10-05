"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import type { MotionValue } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useCarModel } from "./CarModelProvider";
import StudioEnvironment from "./StudioEnvironment";

type CarSceneProps = {
  autoRotate?: boolean;
  interactive?: boolean;
  paint?: string;
  scrollProgress?: MotionValue<number>;
  /** "never" parks the GPU while the stage is off screen. */
  frameloop?: "always" | "demand" | "never";
};

/**
 * The loaded Object3D cannot be parented to two canvases at once, so each scene
 * gets a shallow clone. Geometries and materials are still shared by reference,
 * which is why changing the paint colour updates both scenes at once.
 */
function CarBody({
  autoRotate = false,
  interactive = false,
  paint,
  scrollProgress,
}: CarSceneProps) {
  const state = useCarModel();
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const model = useMemo(
    () => (state.status === "ready" ? state.object.clone(true) : null),
    [state],
  );

  useEffect(() => {
    if (state.status !== "ready" || !paint) return;
    const colour = new THREE.Color(paint);
    for (const material of state.paint) {
      material.color.copy(colour);
      material.needsUpdate = true;
    }
  }, [state, paint]);

  useFrame((_, delta) => {
    if (group.current && autoRotate) {
      group.current.rotation.y += delta * 0.16;
    }
    // OrbitControls owns the camera while the user is driving it.
    if (!interactive && scrollProgress) {
      const p = scrollProgress.get();
      camera.position.set(0, 1.15 + p * 0.85, 7.4 - p * 1.7);
      camera.lookAt(0, 0.62, 0);
    }
  });

  if (!model) return null;

  return (
    <group ref={group} position={[0, 0, 0]}>
      <primitive object={model} />
    </group>
  );
}

export default function CarScene(props: CarSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      frameloop={props.frameloop ?? "always"}
      camera={{ position: [0, 1.15, 7.4], fov: 32 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      className="h-full w-full"
    >
      <color attach="background" args={["#05070c"]} />
      <fog attach="fog" args={["#05070c", 11, 22]} />

      <StudioEnvironment />

      {/* Keeps the car readable when the mesh is absent, and grounds it when present. */}
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <CarBody {...props} />

      <ContactShadows
        position={[0, 0.002, 0]}
        opacity={0.62}
        scale={16}
        blur={2.6}
        far={5}
        resolution={512}
        color="#000000"
      />

      <EffectComposer enableNormalPass={false}>
        <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0.72} luminanceSmoothing={0.28} />
        <Vignette eskil={false} offset={0.28} darkness={0.72} />
      </EffectComposer>

      {props.interactive && (
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minDistance={4.2}
          maxDistance={11}
          minPolarAngle={Math.PI * 0.22}
          maxPolarAngle={Math.PI * 0.52}
          autoRotate={props.autoRotate}
          autoRotateSpeed={0.55}
        />
      )}
    </Canvas>
  );
}
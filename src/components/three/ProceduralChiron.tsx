"use client";

import { RoundedBox } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

type ProceduralChironProps = {
  paint?: string;
};

/**
 * A stylised, clearly-labeled stand-in for the Chiron, used only while the real
 * mesh is absent. It is built from primitives rather than a real model so the
 * site can never pretend it is showing the upload it was not given — but it runs
 * the exact same studio rig, clearcoat and paint plumbing as the true mesh, so
 * the moment bugatti.obj arrives the scene stays coherent.
 *
 * The two glowing arcs along the flanks are the car's actual signature — La
 * Ligne C — which is what makes the silhouette read as a Bugatti.
 */
export default function ProceduralChiron({ paint = "#12307e" }: ProceduralChironProps) {
  const paintMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(paint),
        metalness: 0.6,
        roughness: 0.28,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.2,
      }),
    [paint],
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#0a0f1a"),
        metalness: 0,
        roughness: 0.05,
        transparent: true,
        opacity: 0.9,
        envMapIntensity: 1.6,
      }),
    [],
  );

  const trimMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#0b0d12"),
        metalness: 0.2,
        roughness: 0.55,
      }),
    [],
  );

  const rimMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#c7ccd4"),
        metalness: 1,
        roughness: 0.28,
        envMapIntensity: 1.5,
      }),
    [],
  );

  const tyreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0a0a"),
        roughness: 0.9,
      }),
    [],
  );

  const cLineMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c8a86b"),
        emissive: new THREE.Color("#c8a86b"),
        emissiveIntensity: 1.6,
        roughness: 0.4,
      }),
    [],
  );

  const headlightMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#eaffff"),
        emissive: new THREE.Color("#bfe9ff"),
        emissiveIntensity: 2.2,
      }),
    [],
  );

  const taillightMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3a0a0a"),
        emissive: new THREE.Color("#ff2a2a"),
        emissiveIntensity: 1.8,
      }),
    [],
  );

  // One C per side, mirroring in Z. Each arc sweeps from the front fender, up
  // over the roof, and into the rear haunch — and its Z track is derived from
  // the body's actual half-width at that X, so the line hugs the flank instead
  // of floating in the air.
  const cCurves = useMemo(
    () =>
      [1, -1].map((sign) => {
        const track: [number, number][] = [
          [1.7, 0.82],
          [1.1, 0.95],
          [0.4, 0.78],
          [-0.1, 0.78],
          [-0.7, 0.88],
          [-1.4, 0.86],
          [-1.95, 0.8],
        ];
        return new THREE.CatmullRomCurve3(
          track.map(([x, z]) => new THREE.Vector3(x, 1.02, sign * z)),
        );
      }),
    [],
  );

  const wheelPositions: [number, number, number][] = [
    [1.5, 0.42, 0.92],
    [1.5, 0.42, -0.92],
    [-1.5, 0.42, 0.92],
    [-1.5, 0.42, -0.92],
  ];

  return (
    <group>
      {/* Lower monocoque deck */}
      <RoundedBox args={[4.2, 0.62, 1.82]} radius={0.2} smoothness={6} position={[0, 0.55, 0]}>
        <primitive object={paintMat} attach="material" />
      </RoundedBox>

      {/* Forward hood taper */}
      <RoundedBox args={[1.25, 0.34, 1.72]} radius={0.16} smoothness={5} position={[1.35, 0.5, 0]}>
        <primitive object={paintMat} attach="material" />
      </RoundedBox>

      {/* Rear deck */}
      <RoundedBox args={[1.05, 0.42, 1.72]} radius={0.16} smoothness={5} position={[-1.5, 0.56, 0]}>
        <primitive object={paintMat} attach="material" />
      </RoundedBox>

      {/* Canopy / cabin glass, set back of centre as on the real car */}
      <RoundedBox args={[2.15, 0.5, 1.45]} radius={0.24} smoothness={6} position={[-0.15, 0.96, 0]}>
        <primitive object={glassMat} attach="material" />
      </RoundedBox>

      {/* Front splitter and rear diffuser */}
      <mesh position={[2.05, 0.26, 0]} material={trimMat}>
        <boxGeometry args={[0.4, 0.12, 1.7]} />
      </mesh>
      <mesh position={[-2.05, 0.28, 0]} material={trimMat}>
        <boxGeometry args={[0.42, 0.16, 1.7]} />
      </mesh>

      {/* Grille hint on the nose */}
      <mesh position={[2.14, 0.55, 0]} rotation={[0, 0, -0.18]} material={trimMat}>
        <boxGeometry args={[0.12, 0.34, 0.9]} />
      </mesh>

      {/* Headlights and taillights */}
      <mesh position={[2.05, 0.6, 0.55]} material={headlightMat}>
        <boxGeometry args={[0.14, 0.1, 0.4]} />
      </mesh>
      <mesh position={[2.05, 0.6, -0.55]} material={headlightMat}>
        <boxGeometry args={[0.14, 0.1, 0.4]} />
      </mesh>
      <mesh position={[-2.02, 0.66, 0.58]} material={taillightMat}>
        <boxGeometry args={[0.08, 0.06, 0.34]} />
      </mesh>
      <mesh position={[-2.02, 0.66, -0.58]} material={taillightMat}>
        <boxGeometry args={[0.08, 0.06, 0.34]} />
      </mesh>

      {/* The signature C-lines */}
      {cCurves.map((curve, index) => (
        <mesh key={index} material={cLineMat}>
          <tubeGeometry args={[curve, 48, 0.045, 10, false]} />
        </mesh>
      ))}

      {/* Wheels */}
      {wheelPositions.map((position, index) => (
        <group key={index} position={position}>
          <mesh material={tyreMat}>
            <torusGeometry args={[0.42, 0.14, 16, 32]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={rimMat}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 24]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={trimMat}>
            <cylinderGeometry args={[0.12, 0.12, 0.22, 16]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

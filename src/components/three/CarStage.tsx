"use client";

import { useInView, type MotionValue } from "motion/react";
import { useRef } from "react";
import CarScene from "./CarScene";
import { useCarModel } from "./CarModelProvider";

type CarStageProps = {
  paint?: string;
  interactive?: boolean;
  autoRotate?: boolean;
  scrollProgress?: MotionValue<number>;
  className?: string;
  /**
   * "pill" is for stages that sit behind headline type — a full-bleed panel
   * would collide with the copy. "panel" is for the standalone viewer.
   */
  notice?: "pill" | "panel";
};

/**
 * Wraps the canvas with the states a 3D viewer has to design for anyway:
 * loading, ready, and the mesh being unavailable. The render loop is switched
 * off while the stage is off screen — that pauses the GPU work without
 * unmounting the WebGL context or discarding the parsed model.
 */
export default function CarStage({
  paint,
  interactive = false,
  autoRotate = true,
  scrollProgress,
  className = "",
  notice = "panel",
}: CarStageProps) {
  const state = useCarModel();
  const host = useRef<HTMLDivElement>(null);
  const inView = useInView(host, { amount: 0.15, margin: "200px 0px 200px 0px" });

  return (
    <div
      ref={host}
      className={`relative overflow-hidden bg-ink ${className}`}
      // Stops Lenis from stealing wheel gestures while the user drags the car.
      data-lenis-prevent={interactive ? "" : undefined}
    >
      <CarScene
        paint={paint}
        interactive={interactive}
        autoRotate={autoRotate}
        scrollProgress={scrollProgress}
        frameloop={inView ? "always" : "never"}
      />

      {state.status === "loading" && <LoadingPlate />}
      {state.status === "missing" && notice === "pill" && <MissingPill />}
      {state.status === "missing" && notice === "panel" && <MissingMesh reason={state.reason} />}
    </div>
  );
}

function LoadingPlate() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-mute">
        <span className="h-px w-10 animate-pulse bg-champagne/60" />
        Loading model
      </div>
    </div>
  );
}

/**
 * Compact form for the hero, where a full panel would fight the headline.
 */
function MissingPill() {
  return (
    <div className="pointer-events-none absolute bottom-6 right-6 max-w-[15rem] rounded-[3px] border border-ink-line bg-ink/85 px-4 py-3 backdrop-blur-sm">
      <p className="text-[0.6rem] uppercase tracking-[0.24em] text-champagne">Mesh not loaded</p>
      <p className="mt-1.5 text-xs leading-relaxed text-mute">
        Add{" "}
        <code className="text-bone">public/models/bugatti.obj</code> to render the car here.
      </p>
    </div>
  );
}

function MissingMesh({ reason }: { reason: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-ink/92 px-6">
      <div className="max-w-md text-center">
        <p className="kicker mb-4">Model unavailable</p>
        <p className="font-display text-3xl leading-tight text-bone sm:text-4xl">
          The mesh has not been added yet
        </p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-mute">{reason}</p>
        <p className="mx-auto mt-5 max-w-sm text-xs leading-relaxed text-mute/80">
          Drop the exported file at{" "}
          <code className="rounded-sm bg-ink-raised px-1.5 py-0.5 text-bone">
            public/models/bugatti.obj
          </code>{" "}
          and reload. The 40 materials in{" "}
          <code className="rounded-sm bg-ink-raised px-1.5 py-0.5 text-bone">
            public/models/bugatti.mtl
          </code>{" "}
          are already wired up.
        </p>
      </div>
    </div>
  );
}
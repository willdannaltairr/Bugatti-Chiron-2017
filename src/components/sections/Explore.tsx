"use client";

import { useEffect, useState } from "react";
import CarStage from "@/components/three/CarStage";
import { useCarModel } from "@/components/three/CarModelProvider";
import Reveal from "@/components/ui/Reveal";
import { PAINTS, type PaintId } from "@/lib/data/car";

export default function Explore() {
  const [paint, setPaint] = useState<PaintId>("bleu");
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const state = useCarModel();

  const hex = PAINTS.find((option) => option.id === paint)?.hex ?? PAINTS[0].hex;
  const ready = state.status === "ready";

  useEffect(() => {
    if (state.status !== "ready") return;
    for (const material of state.all) {
      material.wireframe = wireframe;
      material.needsUpdate = true;
    }
  }, [state, wireframe]);

  return (
    <section id="explore" className="border-t border-ink-line bg-ink py-24 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="kicker">Chapter Three</p>
              <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] text-bone">
                Turn it over yourself
              </h2>
            </div>
            <p className="prose-measure text-sm leading-relaxed text-mute">
              Drag to orbit, scroll to zoom. Every surface below is converted from
              the 40 materials in the original Blender export.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[3px] border border-ink-line">
            <CarStage
              paint={hex}
              interactive
              autoRotate={autoRotate}
              className="h-full w-full"
            />
            <p className="pointer-events-none absolute left-4 top-4 text-[0.6rem] uppercase tracking-[0.24em] text-mute/70">
              {ready ? "Interactive · drag to orbit" : "Preview"}
            </p>
          </div>

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <fieldset disabled={!ready}>
              <legend className="text-[0.62rem] uppercase tracking-[0.24em] text-mute">
                Paint
              </legend>
              <div role="radiogroup" className="mt-4 flex flex-wrap gap-3">
                {PAINTS.map((option) => {
                  const selected = option.id === paint;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setPaint(option.id)}
                      title={option.name}
                      className={`flex h-11 items-center gap-3 rounded-[3px] border px-3 text-xs tracking-wide transition-colors duration-200 ${
                        selected
                          ? "border-champagne text-bone"
                          : "border-ink-line text-mute hover:border-mute hover:text-bone"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="h-4 w-4 rounded-full border border-white/20"
                        style={{ backgroundColor: option.hex }}
                      />
                      {option.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex flex-wrap gap-3">
              <Toggle
                pressed={autoRotate}
                onChange={setAutoRotate}
                label="Auto-rotate"
                disabled={!ready}
              />
              <Toggle
                pressed={wireframe}
                onChange={setWireframe}
                label="Wireframe"
                disabled={!ready}
              />
            </div>

            <div className="mt-auto border-t border-ink-line pt-6">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-mute">Source</p>
              <ul className="mt-3 space-y-1.5 text-xs text-mute/80">
                <li>
                  <span className="text-bone">bugatti.obj</span> — mesh
                </li>
                <li>
                  <span className="text-bone">bugatti.mtl</span> — 40 materials
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Toggle({
  pressed,
  onChange,
  label,
  disabled,
}: {
  pressed: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={() => onChange(!pressed)}
      title={disabled ? "Available once the mesh is loaded" : undefined}
      className={`inline-flex h-11 items-center gap-3 rounded-[3px] border px-4 text-xs uppercase tracking-[0.16em] transition-colors duration-200 ${
        pressed
          ? "border-champagne bg-champagne/10 text-bone"
          : "border-ink-line text-mute hover:border-mute hover:text-bone"
      } disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink-line disabled:hover:text-mute`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${pressed ? "bg-champagne" : "bg-ink-line"}`}
      />
      {label}
    </button>
  );
}
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { loadCarModel, type CarState } from "@/lib/three/loadCarModel";

const CarContext = createContext<CarState>({ status: "loading" });

/**
 * Parses a 20 MB OBJ once for the whole page. Two canvases ask for the model,
 * so the loader must not run twice.
 */
export function CarModelProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CarState>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    loadCarModel()
      .then((result) => {
        if (alive) setState(result);
      })
      .catch((error: unknown) => {
        if (alive)
          setState({ status: "missing", reason: (error as Error).message ?? "Unknown error" });
      });
    return () => {
      alive = false;
    };
  }, []);

  return <CarContext.Provider value={state}>{children}</CarContext.Provider>;
}

export function useCarModel(): CarState {
  return useContext(CarContext);
}
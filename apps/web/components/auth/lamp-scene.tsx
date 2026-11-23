"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import { Lamp3DModel } from "./lamp-3d-model";

interface LampSceneProps {
  isOn: boolean;
  lampColor: string;
  lampRgb: [number, number, number];
  onToggle?: () => void;
  resetTrigger?: number;
}

export function LampScene({
  isOn,
  lampColor,
  lampRgb,
  onToggle,
  resetTrigger = 0,
}: LampSceneProps) {
  return (
    <div className="w-full h-full select-none relative">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [2.1, 0.35, 5.2],
          fov: 38,
          near: 0.1,
          far: 50,
        }}
        gl={{
          antialias: true,
          toneMapping: 3, // ACESFilmic
          toneMappingExposure: 1.05,
        }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* ── Studio Key Light (Neutral warm overhead fill) ── */}
        <directionalLight
          position={[4.5, 6.5, 3.8]}
          intensity={0.42}
          color="#FFF4E6"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0004}
        />

        {/* ── Studio Rim Light (Subtle metallic edge separation) ── */}
        <directionalLight
          position={[-5, 3.5, -3.5]}
          intensity={0.28}
          color="#94A3B8"
        />

        {/* ── Ambient Studio Light ── */}
        <ambientLight intensity={0.18} color="#1E2330" />

        {/* ── Studio Environment Reflections ── */}
        <Environment preset="studio" environmentIntensity={0.14} />

        {/* ── Soft Ground Contact Shadow (Directly anchored under lamp base) ── */}
        <ContactShadows
          position={[-0.55, -1.49, 0]}
          opacity={0.65}
          scale={8}
          blur={2.2}
          far={3.5}
          resolution={512}
          color="#000000"
        />

        {/* ── 3D Architect Desk Lamp ── */}
        <Suspense fallback={null}>
          <Lamp3DModel
            isOn={isOn}
            lampColor={lampColor}
            lampRgb={lampRgb}
            onToggle={onToggle}
            resetTrigger={resetTrigger}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import { CinematicLampModel } from "./cinematic-lamp-model";

interface CinematicLampSceneProps {
  isOn: boolean;
  lampColor: string;
  lampRgb: [number, number, number];
  onToggle?: () => void;
  resetTrigger?: number;
}

export function CinematicLampScene({
  isOn,
  lampColor,
  lampRgb,
  onToggle,
  resetTrigger = 0,
}: CinematicLampSceneProps) {
  return (
    <div className="w-full h-full select-none relative">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [2.6, 0.45, 5.8],
          fov: 42,
          near: 0.1,
          far: 50,
        }}
        gl={{
          antialias: true,
          toneMapping: 3, // ACESFilmic tone mapping
          toneMappingExposure: 1.05,
        }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* ── Studio Key Light (Neutral warm overhead fill) ── */}
        <directionalLight
          position={[5, 7, 4]}
          intensity={0.45}
          color="#FFF5E8"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0004}
        />

        {/* ── Studio Rim Light (Metallic edge separation) ── */}
        <directionalLight
          position={[-6, 4, -4]}
          intensity={0.32}
          color="#94A3B8"
        />

        {/* ── Ambient Studio Light ── */}
        <ambientLight intensity={0.2} color="#1E222D" />

        {/* ── Studio Environment Sheen ── */}
        <Environment preset="studio" environmentIntensity={0.14} />

        {/* ── Soft Ground Contact Shadow (Under the lamp base) ── */}
        <ContactShadows
          position={[-0.45, -1.79, 0]}
          opacity={0.7}
          scale={9}
          blur={2.4}
          far={4}
          resolution={512}
          color="#000000"
        />

        {/* ── Realistic 3D Desk Lamp with Coiled Springs & True SpotLight ── */}
        <Suspense fallback={null}>
          <CinematicLampModel
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

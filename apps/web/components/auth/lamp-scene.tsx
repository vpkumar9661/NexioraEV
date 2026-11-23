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
          position: [2.9, 1.7, 6.6],
          fov: 35, // 50mm equivalent portrait lens – zero wide-angle distortion
          near: 0.1,
          far: 100,
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
          position={[5, 8, 4]}
          intensity={0.4}
          color="#FFF2E0"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0005}
        />

        {/* ── Studio Rim Light (Cool subtle edge highlight on dark graphite) ── */}
        <directionalLight
          position={[-6, 4, -4]}
          intensity={0.3}
          color="#94A3B8"
        />

        {/* ── Ambient Studio Environment Light ── */}
        <ambientLight intensity={0.16} color="#1E2330" />

        {/* ── Environment Reflections (Controlled studio sheen) ── */}
        <Environment preset="studio" environmentIntensity={0.15} />

        {/* ── Soft Ground Contact Shadow ── */}
        <ContactShadows
          position={[-0.45, -2.64, 0]}
          opacity={0.75}
          scale={15}
          blur={2.6}
          far={5}
          resolution={512}
          color="#000000"
        />

        {/* ── Realistic 3D Desk Lamp with Physical Springs & Materials ── */}
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

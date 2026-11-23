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
}

export function LampScene({
  isOn,
  lampColor,
  lampRgb,
  onToggle,
}: LampSceneProps) {
  return (
    <div className="w-full h-full select-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [3.2, 2.2, 6.8],
          fov: 38,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          toneMapping: 3, // ACESFilmic
          toneMappingExposure: 0.95,
        }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Minimal ambient light – keeps scene dark, rich, and moody */}
        <ambientLight intensity={0.06} color="#161824" />

        {/* Subtle high key light */}
        <directionalLight
          position={[6, 9, 4]}
          intensity={0.14}
          color="#222838"
        />

        {/* Soft fill light from behind lamp */}
        <directionalLight
          position={[-6, 4, -3]}
          intensity={0.08}
          color="#182030"
        />

        {/* Environment map for realistic metallic reflections */}
        <Environment preset="night" environmentIntensity={0.09} />

        {/* Contact shadow pool under the lamp base */}
        <ContactShadows
          position={[-0.4, -2.74, 0]}
          opacity={0.7}
          scale={14}
          blur={2.4}
          far={6}
          resolution={512}
          color="#000000"
        />

        {/* 3D Articulated Desk Lamp */}
        <Suspense fallback={null}>
          <Lamp3DModel
            isOn={isOn}
            lampColor={lampColor}
            lampRgb={lampRgb}
            onToggle={onToggle}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

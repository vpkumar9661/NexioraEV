"use client";

import React, { Suspense, useMemo, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import * as THREE from "three";
import { CinematicLampModel } from "./cinematic-lamp-model";

interface CinematicLampSceneProps {
  isOn: boolean;
  lampColor: string;
  onToggle?: () => void;
  resetTrigger?: number;
  reducedMotion?: boolean;
}

/**
 * Seamless Studio Desk Surface
 * Receives real-time SpotLight illumination and shadows from the lamp while
 * smoothly fading to 0 alpha at its perimeter so there are never hard plane edges.
 */
function StudioDeskSurface() {
  const alphaMap = useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.08,
      size / 2,
      size / 2,
      size * 0.5
    );
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.55, "rgba(200, 200, 200, 0.7)");
    grad.addColorStop(0.85, "rgba(60, 60, 60, 0.15)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useEffect(() => {
    return () => {
      alphaMap?.dispose();
    };
  }, [alphaMap]);

  return (
    <mesh
      position={[0.25, -1.806, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <circleGeometry args={[6.2, 64]} />
      <meshStandardMaterial
        color="#0B0E15"
        roughness={0.42}
        metalness={0.35}
        transparent
        alphaMap={alphaMap}
      />
    </mesh>
  );
}

export function CinematicLampScene({
  isOn,
  lampColor,
  onToggle,
  resetTrigger = 0,
  reducedMotion = false,
}: CinematicLampSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-full select-none relative">
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{
          position: isMobile ? [1.6, 0.55, 6.4] : [2.2, 0.4, 5.9],
          fov: isMobile ? 46 : 42,
          near: 0.1,
          far: 50,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isOn ? 1.12 : 0.92,
        }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* ── Studio Key Light (Subtle overhead fill to preserve silhouette when OFF) ── */}
        <directionalLight
          position={[5, 7, 4]}
          intensity={isOn ? 0.55 : 0.34}
          color="#F8FAFC"
          castShadow
          shadow-mapSize-width={isMobile ? 512 : 1024}
          shadow-mapSize-height={isMobile ? 512 : 1024}
          shadow-bias={-0.0004}
        />

        {/* ── Studio Rim Light (Metallic edge separation on brushed arms & brass) ── */}
        <directionalLight
          position={[-6, 4, -4]}
          intensity={isOn ? 0.48 : 0.28}
          color="#94A3B8"
        />

        {/* ── Ambient Studio Light (Maintains dark depth without pure black crush) ── */}
        <ambientLight intensity={isOn ? 0.24 : 0.16} color="#1E2432" />

        {/* ── Studio Environment Reflections ── */}
        <Environment
          preset="studio"
          environmentIntensity={isOn ? 0.22 : 0.12}
        />

        {/* ── Seamless Studio Desk Surface (Receives SpotLight & Shadows) ── */}
        <StudioDeskSurface />

        {/* ── Soft Ground Contact Shadow (Under weighted base) ── */}
        <ContactShadows
          position={[-0.7, -1.798, 0]}
          opacity={0.62}
          scale={7.5}
          blur={2.2}
          far={3.5}
          resolution={isMobile ? 256 : 512}
          color="#000000"
        />

        {/* ── Realistic 3D Desk Lamp with Coiled Springs & Custom Volumetric Shader ── */}
        <Suspense fallback={null}>
          <CinematicLampModel
            isOn={isOn}
            lampColor={lampColor}
            onToggle={onToggle}
            resetTrigger={resetTrigger}
            reducedMotion={reducedMotion}
            shadowMapSize={isMobile ? 512 : 1024}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
